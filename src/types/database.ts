// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: number;
          created_at: string;
          updated_at: string;
          source_url: string;
          title: string;
          author: string;
          github_url: string | null;
          content: string;
          rating: number;
          status: 'unread' | 'read' | 'review';
          notes: string;
          tags: string[];
          user_id: string | null; // For future user authentication
        };
        Insert: {
          id?: number;
          created_at?: string;
          updated_at?: string;
          source_url: string;
          title: string;
          author: string;
          github_url?: string | null;
          content: string;
          rating: number;
          status?: 'unread' | 'read' | 'review';
          notes?: string;
          tags?: string[];
          user_id?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          updated_at?: string;
          source_url?: string;
          title?: string;
          author?: string;
          github_url?: string | null;
          content?: string;
          rating?: number;
          status?: 'unread' | 'read' | 'review';
          notes?: string;
          tags?: string[];
          user_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      article_status: 'unread' | 'read' | 'review';
    };
  };
}
