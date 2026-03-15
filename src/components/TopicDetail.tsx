import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronLeft, 
  MessageSquare, 
  BrainCircuit, 
  CheckCircle2, 
  XCircle,
  Loader2,
  Send,
  ArrowRight
} from 'lucide-react';
import Markdown from 'react-markdown';
import { Topic, TheoryContent, QuizQuestion } from '../types';
import { THEORY_DATA } from '../constants';
import { generateQuizQuestions, askTeacher } from '../services/geminiService';
import { cn } from '../lib/utils';

interface TopicDetailProps {
  topic: Topic;
  onBack: () => void;
}

export default function TopicDetail({ topic, onBack }: TopicDetailProps) {
  const [activeTab, setActiveTab] = useState<'theory' | 'quiz' | 'ask'>('theory');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [loadingChat, setLoadingChat] = useState(false);

  const theory: TheoryContent = THEORY_DATA[topic.id];

  const startQuiz = async () => {
    setLoadingQuiz(true);
    setQuizFinished(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    const questions = await generateQuizQuestions(topic.title);
    setQuizQuestions(questions);
    setLoadingQuiz(false);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoadingChat(true);
    
    const response = await askTeacher(userMsg, topic.title);
    setChatHistory(prev => [...prev, { role: 'ai', content: response }]);
    setLoadingChat(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <div className={cn("sticky top-0 z-10 text-white p-4 shadow-lg", topic.color)}>
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold">{topic.title}</h1>
            <p className="text-white/80 text-sm">Chương trình Toán 10</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mt-6 px-4">
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-stone-200">
          <button
            onClick={() => setActiveTab('theory')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all",
              activeTab === 'theory' ? "bg-stone-900 text-white shadow-md" : "text-stone-500 hover:bg-stone-50"
            )}
          >
            <BookOpen size={18} />
            <span>Lý thuyết</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('quiz');
              if (quizQuestions.length === 0) startQuiz();
            }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all",
              activeTab === 'quiz' ? "bg-stone-900 text-white shadow-md" : "text-stone-500 hover:bg-stone-50"
            )}
          >
            <BrainCircuit size={18} />
            <span>Luyện tập</span>
          </button>
          <button
            onClick={() => setActiveTab('ask')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all",
              activeTab === 'ask' ? "bg-stone-900 text-white shadow-md" : "text-stone-500 hover:bg-stone-50"
            )}
          >
            <MessageSquare size={18} />
            <span>Hỏi thầy cô</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {activeTab === 'theory' && (
              <motion.div
                key="theory"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {theory.sections.map((section, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                    <h3 className="text-lg font-bold text-stone-900 mb-3">{section.subtitle}</h3>
                    <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                  </div>
                ))}
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <h4 className="text-blue-900 font-bold mb-2 flex items-center gap-2">
                    <BrainCircuit size={20} className="text-blue-500" />
                    Lời khuyên từ giáo viên
                  </h4>
                  <p className="text-blue-800 text-sm italic">
                    "Hãy nắm vững các định nghĩa cơ bản trước khi làm bài tập. Toán 10 là nền tảng quan trọng cho các lớp trên, đặc biệt là phần Vectơ và Hàm số."
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 min-h-[400px] flex flex-col"
              >
                {loadingQuiz ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="animate-spin text-stone-400" size={40} />
                    <p className="text-stone-500 animate-pulse">Đang soạn câu hỏi cho bạn...</p>
                  </div>
                ) : quizFinished ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-2">Hoàn thành!</h2>
                    <p className="text-stone-500 mb-6">Bạn đã trả lời đúng {score}/{quizQuestions.length} câu hỏi.</p>
                    <button
                      onClick={startQuiz}
                      className="bg-stone-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-stone-800 transition-colors"
                    >
                      Làm lại bài tập
                    </button>
                  </div>
                ) : quizQuestions.length > 0 ? (
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                        Câu hỏi {currentQuestionIndex + 1} / {quizQuestions.length}
                      </span>
                      <div className="h-2 w-32 bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-stone-900 transition-all duration-300" 
                          style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <h3 className="text-xl font-medium text-stone-900 mb-8">
                      {quizQuestions[currentQuestionIndex].question}
                    </h3>

                    <div className="space-y-3 mb-8">
                      {quizQuestions[currentQuestionIndex].options.map((option, idx) => {
                        const isCorrect = idx === quizQuestions[currentQuestionIndex].correctAnswer;
                        const isSelected = idx === selectedAnswer;
                        
                        return (
                          <button
                            key={idx}
                            disabled={selectedAnswer !== null}
                            onClick={() => handleAnswer(idx)}
                            className={cn(
                              "w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group",
                              selectedAnswer === null 
                                ? "border-stone-200 hover:border-stone-900 hover:bg-stone-50"
                                : isCorrect 
                                  ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                                  : isSelected
                                    ? "bg-rose-50 border-rose-500 text-rose-900"
                                    : "border-stone-100 text-stone-400"
                            )}
                          >
                            <span>{option}</span>
                            {selectedAnswer !== null && isCorrect && (
                              <CheckCircle2 size={18} className="text-emerald-500" />
                            )}
                            {selectedAnswer !== null && isSelected && !isCorrect && (
                              <XCircle size={18} className="text-rose-500" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {showExplanation && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-stone-50 p-4 rounded-xl mb-6 border border-stone-200"
                      >
                        <p className="text-sm font-bold text-stone-900 mb-1">Giải thích:</p>
                        <p className="text-sm text-stone-600">{quizQuestions[currentQuestionIndex].explanation}</p>
                      </motion.div>
                    )}

                    <div className="mt-auto flex justify-end">
                      <button
                        disabled={selectedAnswer === null}
                        onClick={nextQuestion}
                        className={cn(
                          "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                          selectedAnswer === null 
                            ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                            : "bg-stone-900 text-white hover:bg-stone-800"
                        )}
                      >
                        <span>{currentQuestionIndex === quizQuestions.length - 1 ? 'Kết thúc' : 'Câu tiếp theo'}</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <p className="text-stone-500 mb-4">Chưa có câu hỏi nào.</p>
                    <button
                      onClick={startQuiz}
                      className="bg-stone-900 text-white px-6 py-2 rounded-xl"
                    >
                      Bắt đầu luyện tập
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'ask' && (
              <motion.div
                key="ask"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col h-[600px] bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden"
              >
                {/* Chat Header */}
                <div className="p-4 border-bottom border-stone-100 bg-stone-50 flex items-center gap-3">
                  <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center text-white">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">Thầy cô AI</p>
                    <p className="text-xs text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      Đang trực tuyến
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center px-8">
                      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-400">
                        <MessageSquare size={32} />
                      </div>
                      <p className="text-stone-900 font-medium mb-1">Bạn có thắc mắc gì không?</p>
                      <p className="text-stone-500 text-sm">Hãy đặt câu hỏi về chủ đề {topic.title}, tôi sẽ giải đáp chi tiết cho bạn.</p>
                    </div>
                  )}
                  {chatHistory.map((msg, idx) => (
                    <div 
                      key={idx}
                      className={cn(
                        "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed",
                        msg.role === 'user' 
                          ? "ml-auto bg-stone-900 text-white rounded-tr-none" 
                          : "mr-auto bg-stone-100 text-stone-800 rounded-tl-none markdown-body"
                      )}
                    >
                      {msg.role === 'ai' ? (
                        <Markdown>{msg.content}</Markdown>
                      ) : (
                        msg.content
                      )}
                    </div>
                  ))}
                  {loadingChat && (
                    <div className="mr-auto bg-stone-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-stone-100">
                  <div className="relative">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Nhập câu hỏi của bạn..."
                      className="w-full pl-4 pr-12 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={loadingChat || !chatInput.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-stone-900 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
