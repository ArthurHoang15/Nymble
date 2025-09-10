import { useState, useEffect, useMemo } from "react";
import { PlusCircle } from "lucide-react";
import type { FC } from "react";
import type { Article, FilterState } from "./types";
import { MOCK_ARTICLES } from "./constants";
import { ArticleFormModal, ArticleItem, FilterBar } from "./components";

const App: FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  
  const [filters, setFilters] = useState<FilterState>({});
  const [searchTerm, setSearchTerm] = useState("");

  // TODO: Replace with useEffect calling Supabase API
  useEffect(() => {
    setArticles(MOCK_ARTICLES);
  }, []);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    articles.forEach((article) =>
      article.tags.forEach((tag) => tagsSet.add(tag))
    );
    return Array.from(tagsSet).sort();
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let result: Article[] = [...articles];

    if (searchTerm) {
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status)
      result = result.filter((a) => a.status === filters.status);
    if (filters.rating)
      result = result.filter((a) => a.rating >= parseInt(filters.rating!, 10));
    if (filters.tags?.length)
      result = result.filter((a) =>
        filters.tags!.every((tag) => a.tags.includes(tag))
      );

    const [sortBy, sortOrder] = (filters.sort || "created_at_desc").split("_");
    result.sort((a, b) => {
      if (sortBy === "created_at") {
        return sortOrder === "asc"
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === "rating") {
        return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
      }
      return 0;
    });

    return result;
  }, [articles, searchTerm, filters]);

  const handleOpenModal = (article: Article | null = null) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const handleSaveArticle = (
    data: Omit<Article, "id" | "created_at"> & { id?: number }
  ) => {
    // TODO: Replace with Supabase API logic for insert/update
    if (data.id) {
      // Update
      setArticles(
        articles.map((a) =>
          a.id === data.id ? ({ ...a, ...data } as Article) : a
        )
      );
    } else {
      // Create new
      const newArticle: Article = {
        ...(data as Omit<Article, "id" | "created_at">),
        id: Date.now(),
        created_at: new Date().toISOString(),
      };
      setArticles([newArticle, ...articles]);
    }
    handleCloseModal();
  };

  const handleDeleteArticle = (id: number) => {
    // TODO: Replace with Supabase API logic for delete
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
      setArticles(articles.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Nymble</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Thêm bài viết</span>
          </button>
        </header>

        <main>
          <FilterBar
            filters={filters}
            setFilters={setFilters}
            allTags={allTags}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <div className="grid grid-cols-1 gap-4">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <ArticleItem
                  key={article.id}
                  article={article}
                  onEdit={handleOpenModal}
                  onDelete={handleDeleteArticle}
                />
              ))
            ) : (
              <div className="text-center py-10 bg-gray-800 rounded-lg">
                <p className="text-gray-400">
                  Không tìm thấy bài viết nào phù hợp.
                </p>
              </div>
            )}
          </div>
        </main>

        <ArticleFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveArticle}
          article={editingArticle}
          allTags={allTags}
        />
      </div>
    </div>
  );
};

export default App;