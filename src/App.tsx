import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Layers, 
  Scale, 
  TrendingUp, 
  BarChart3, 
  Navigation, 
  Compass,
  Search,
  BookOpenCheck
} from 'lucide-react';
import { TOPICS } from './constants';
import { Topic } from './types';
import TopicDetail from './components/TopicDetail';
import { cn } from './lib/utils';

const ICON_MAP: Record<string, any> = {
  Layers,
  Scale,
  TrendingUp,
  BarChart3,
  Navigation,
  Compass,
};

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = TOPICS.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedTopic) {
    return (
      <TopicDetail 
        topic={selectedTopic} 
        onBack={() => setSelectedTopic(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      {/* Hero Section */}
      <header className="bg-white border-b border-stone-200 pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <GraduationCap size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Toán 10 - Hệ Thống Ôn Tập</h1>
              <p className="text-stone-500 text-sm">Giáo viên đồng hành cùng bạn trên mọi nẻo đường tri thức</p>
            </div>
          </div>

          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm chủ đề ôn tập..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-stone-900/5 focus:border-stone-900 transition-all placeholder:text-stone-400"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BookOpenCheck className="text-stone-400" size={24} />
            Chủ đề trọng tâm
          </h2>
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
            {filteredTopics.length} Chủ đề
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTopics.map((topic, idx) => {
              const Icon = ICON_MAP[topic.icon];
              return (
                <motion.button
                  key={topic.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedTopic(topic)}
                  className="group relative bg-white p-8 rounded-[2rem] border border-stone-200 text-left hover:border-stone-900 hover:shadow-2xl hover:shadow-stone-900/5 transition-all duration-500 overflow-hidden"
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg",
                    topic.color
                  )}>
                    <Icon size={28} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-stone-900 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-6">
                    {topic.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 group-hover:text-stone-900 transition-colors">
                    <span>Khám phá ngay</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <Navigation size={14} className="rotate-90" />
                    </motion.div>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-stone-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-400 italic">Không tìm thấy chủ đề nào phù hợp với từ khóa của bạn.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto py-12 px-4 border-t border-stone-200 text-center">
        <p className="text-stone-400 text-sm">
          © 2026 Hệ thống Ôn tập Toán 10. Được xây dựng bởi Giáo viên AI.
        </p>
      </footer>
    </div>
  );
}
