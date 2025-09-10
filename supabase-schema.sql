-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  source_url TEXT NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  github_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'review')),
  notes TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_rating ON articles(rating);
CREATE INDEX IF NOT EXISTS idx_articles_tags ON articles USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_articles_user_id ON articles(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS (for future user authentication)
-- For now, allow all operations (you can restrict this later)
CREATE POLICY "Enable all operations for all users" ON articles
  FOR ALL
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

-- Insert sample data (optional)
INSERT INTO articles (
  source_url,
  title,
  author,
  github_url,
  content,
  rating,
  status,
  notes,
  tags
) VALUES
(
  'https://react.dev/learn',
  'React Official Docs - The Complete Guide',
  'React Team',
  'https://github.com/facebook/react',
  'The official React documentation.',
  5,
  'read',
  'Nguồn tài liệu chính thống và tốt nhất để học React. Cần xem lại phần Hooks.',
  ARRAY['React', 'JavaScript', 'Frontend']
),
(
  'https://supabase.io/docs',
  'Getting Started with Supabase',
  'Supabase',
  '',
  'Supabase is an open source Firebase alternative.',
  4,
  'unread',
  'Giải pháp thay thế Firebase, có vẻ rất tiềm năng cho các dự án cá nhân.',
  ARRAY['Supabase', 'Backend', 'Database', 'PostgreSQL']
),
(
  'https://www.docker.com/get-started',
  'Docker for Beginners',
  'Docker Official',
  '',
  'Docker simplifies the process of building, running, managing and distributing applications.',
  4,
  'review',
  'Cần thực hành thêm về Docker Compose để dựng môi trường dev.',
  ARRAY['Docker', 'DevOps']
);

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
