export type TopicId = 'sets' | 'inequalities' | 'functions' | 'statistics' | 'vectors' | 'geometry';

export interface Topic {
  id: TopicId;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface TheoryContent {
  title: string;
  sections: {
    subtitle: string;
    content: string;
  }[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
