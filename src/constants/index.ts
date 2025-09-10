import type { Article, ArticleStatus } from '../types';

// --- MOCK DATA & CONFIG ---
export const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    created_at: "2025-09-08T10:00:00Z",
    source_url: "https://react.dev/learn",
    title: "React Official Docs - The Complete Guide",
    author: "React Team",
    github_url: "https://github.com/facebook/react",
    rating: 5,
    status: "read",
    notes:
      "Nguồn tài liệu chính thống và tốt nhất để học React. Cần xem lại phần Hooks.",
    tags: ["React", "JavaScript", "Frontend"],
    content: "The official React documentation.",
  },
  {
    id: 2,
    created_at: "2025-09-07T14:30:00Z",
    source_url: "https://supabase.io/docs",
    title: "Getting Started with Supabase",
    author: "Supabase",
    github_url: "",
    rating: 4,
    status: "unread",
    notes:
      "Giải pháp thay thế Firebase, có vẻ rất tiềm năng cho các dự án cá nhân.",
    tags: ["Supabase", "Backend", "Database", "PostgreSQL"],
    content: "Supabase is an open source Firebase alternative.",
  },
  {
    id: 3,
    created_at: "2025-09-06T09:00:00Z",
    source_url: "https://www.docker.com/get-started",
    title: "Docker for Beginners",
    author: "Docker Official",
    github_url: "",
    rating: 4,
    status: "review",
    notes: "Cần thực hành thêm về Docker Compose để dựng môi trường dev.",
    tags: ["Docker", "DevOps"],
    content:
      "Docker simplifies the process of building, running, managing and distributing applications.",
  },
];

export const STATUS_OPTIONS: Record<ArticleStatus, { label: string; color: string }> = {
  unread: { label: "Chưa đọc", color: "bg-blue-500" },
  read: { label: "Đã đọc", color: "bg-green-500" },
  review: { label: "Cần xem lại", color: "bg-yellow-500" },
};

export const RATING_LABELS: Record<number, string> = {
  1: "Tham khảo",
  2: "Khá hữu ích",
  3: "Quan trọng",
  4: "Rất quan trọng",
  5: "Cực kỳ quan trọng",
};
