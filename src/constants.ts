import { Topic } from './types';

export const TOPICS: Topic[] = [
  {
    id: 'sets',
    title: 'Mệnh đề và Tập hợp',
    description: 'Khám phá logic toán học, các phép toán trên tập hợp và các ký hiệu cơ bản.',
    icon: 'Layers',
    color: 'bg-blue-500',
  },
  {
    id: 'inequalities',
    title: 'Bất phương trình',
    description: 'Bất phương trình bậc nhất hai ẩn và hệ bất phương trình bậc nhất hai ẩn.',
    icon: 'Scale',
    color: 'bg-emerald-500',
  },
  {
    id: 'functions',
    title: 'Hàm số và Đồ thị',
    description: 'Hàm số bậc hai, đồ thị và các ứng dụng thực tế của parabol.',
    icon: 'TrendingUp',
    color: 'bg-indigo-500',
  },
  {
    id: 'statistics',
    title: 'Thống kê và Xác suất',
    description: 'Phân tích dữ liệu, các số đặc trưng và tính toán xác suất biến cố.',
    icon: 'BarChart3',
    color: 'bg-purple-500',
  },
  {
    id: 'vectors',
    title: 'Vectơ - Tọa độ vectơ',
    description: 'Các phép toán vectơ, tọa độ điểm và vectơ trong mặt phẳng.',
    icon: 'Navigation',
    color: 'bg-orange-500',
  },
  {
    id: 'geometry',
    title: 'Phương pháp tọa độ',
    description: 'Phương trình đường thẳng, đường tròn và các đường conic.',
    icon: 'Compass',
    color: 'bg-rose-500',
  },
];

export const THEORY_DATA: Record<string, any> = {
  sets: {
    title: 'Mệnh đề và Tập hợp',
    sections: [
      {
        subtitle: '1. Mệnh đề',
        content: 'Mệnh đề là một khẳng định đúng hoặc sai. Một khẳng định không thể vừa đúng vừa sai.',
      },
      {
        subtitle: '2. Tập hợp',
        content: 'Tập hợp là khái niệm cơ bản của toán học. Các phép toán: Giao (A ∩ B), Hợp (A ∪ B), Hiệu (A \\ B), Phần bù (C_A B).',
      },
    ],
  },
  inequalities: {
    title: 'Bất phương trình',
    sections: [
      {
        subtitle: '1. Bất phương trình bậc nhất hai ẩn',
        content: 'Có dạng ax + by < c (hoặc >, ≤, ≥). Miền nghiệm là một nửa mặt phẳng.',
      },
      {
        subtitle: '2. Hệ bất phương trình',
        content: 'Nghiệm của hệ là giao các miền nghiệm của từng bất phương trình trong hệ.',
      },
    ],
  },
  functions: {
    title: 'Hàm số và Đồ thị',
    sections: [
      {
        subtitle: '1. Hàm số bậc hai',
        content: 'y = ax² + bx + c (a ≠ 0). Đồ thị là một đường Parabol.',
      },
      {
        subtitle: '2. Đỉnh và Trục đối xứng',
        content: 'Đỉnh I(-b/2a; -Δ/4a). Trục đối xứng x = -b/2a.',
      },
    ],
  },
  statistics: {
    title: 'Thống kê và Xác suất',
    sections: [
      {
        subtitle: '1. Số đặc trưng đo xu thế trung tâm',
        content: 'Số trung bình, trung vị, tứ phân vị, mốt.',
      },
      {
        subtitle: '2. Xác suất',
        content: 'P(A) = n(A) / n(Ω). Xác suất của biến cố đối: P(A\') = 1 - P(A).',
      },
    ],
  },
  vectors: {
    title: 'Vectơ - Tọa độ vectơ',
    sections: [
      {
        subtitle: '1. Các phép toán vectơ',
        content: 'Quy tắc ba điểm, quy tắc hình bình hành. Tích của vectơ với một số.',
      },
      {
        subtitle: '2. Tọa độ vectơ',
        content: 'u = (x; y). Độ dài |u| = √(x² + y²). Tích vô hướng u.v = x1x2 + y1y2.',
      },
    ],
  },
  geometry: {
    title: 'Phương pháp tọa độ trong mặt phẳng',
    sections: [
      {
        subtitle: '1. Phương trình đường thẳng',
        content: 'Phương trình tham số, phương trình tổng quát ax + by + c = 0.',
      },
      {
        subtitle: '2. Phương trình đường tròn',
        content: '(x - a)² + (y - b)² = R².',
      },
    ],
  },
};
