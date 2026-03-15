import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateQuizQuestions(topic: string): Promise<QuizQuestion[]> {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Hãy tạo 5 câu hỏi trắc nghiệm ôn tập toán lớp 10 về chủ đề: ${topic}. 
    Câu hỏi phải có độ khó từ cơ bản đến nâng cao. 
    Phản hồi bằng tiếng Việt.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Mảng gồm 4 lựa chọn A, B, C, D"
            },
            correctAnswer: { 
              type: Type.INTEGER,
              description: "Chỉ số của câu trả lời đúng (0-3)"
            },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse quiz questions", e);
    return [];
  }
}

export async function askTeacher(question: string, topic: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Bạn là một giáo viên dạy toán với hơn 15 năm kinh nghiệm. 
    Hãy giải đáp thắc mắc sau đây của học sinh về chủ đề ${topic}:
    
    Câu hỏi: ${question}
    
    Hãy giải thích một cách sư phạm, dễ hiểu, có ví dụ minh họa nếu cần. Sử dụng định dạng Markdown.`,
  });

  return response.text || "Xin lỗi, tôi không thể trả lời câu hỏi này lúc này.";
}
