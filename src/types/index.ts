// --- TYPE DEFINITIONS ---
export type ArticleStatus = "unread" | "read" | "review";

export interface Article {
  id: number;
  created_at: string;
  source_url: string;
  title: string;
  author: string;
  github_url?: string;
  content: string;
  rating: number;
  status: ArticleStatus;
  notes: string;
  tags: string[];
}

// Form data type for handling tags as array
export type ArticleFormData = {
  title?: string;
  source_url?: string;
  author?: string;
  github_url?: string;
  content?: string;
  rating?: number;
  status?: ArticleStatus;
  notes?: string;
  tags: string[];
};

export interface FilterState {
  status?: ArticleStatus;
  rating?: string;
  sort?: string;
  tags?: string[];
}

export interface ArticleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    article: Omit<Article, "id" | "created_at"> & { id?: number }
  ) => void;
  article: Article | null;
  allTags: string[];
}

export interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  allTags: string[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export interface ArticleItemProps {
  article: Article;
  onEdit: (article: Article) => void;
  onDelete: (id: number) => void;
}
