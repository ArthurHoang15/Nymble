import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { FC, ChangeEvent, FormEvent } from 'react';
import type { ArticleFormModalProps, ArticleFormData, Article } from '../types';
import { STATUS_OPTIONS, RATING_LABELS } from '../constants';
import StarRating from './StarRating';

const ArticleFormModal: FC<ArticleFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  article,
}) => {
  const [formData, setFormData] = useState<ArticleFormData>({ tags: "" });

  useEffect(() => {
    if (isOpen) {
      if (article) {
        setFormData({ 
          title: article.title,
          source_url: article.source_url,
          author: article.author,
          github_url: article.github_url,
          content: article.content,
          rating: article.rating,
          status: article.status,
          notes: article.notes,
          tags: article.tags?.join(", ") || "" 
        });
      } else {
        setFormData({
          title: "",
          source_url: "",
          author: "",
          github_url: "",
          content: "",
          rating: 3,
          status: "unread",
          tags: "",
          notes: "",
        });
      }
    }
  }, [article, isOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating: number) => {
    setFormData((prev) => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    onSave(finalData as Omit<Article, "id" | "created_at">);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {article ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
            placeholder="Tiêu đề"
            required
          />
          <input
            type="url"
            name="source_url"
            value={formData.source_url}
            onChange={handleChange}
            className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
            placeholder="Link bài viết gốc"
            required
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
            placeholder="Tác giả / Nguồn"
          />
          <input
            type="url"
            name="github_url"
            value={formData.github_url}
            onChange={handleChange}
            className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
            placeholder="Link GitHub / Tool"
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={3}
            className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
            placeholder="Nội dung tóm tắt"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
            >
              {Object.entries(STATUS_OPTIONS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <div className="flex items-center">
              <StarRating
                rating={formData.rating || 0}
                onRatingChange={handleRatingChange}
              />
              <span className="ml-3 text-sm text-gray-400">
                {RATING_LABELS[formData.rating || 0]}
              </span>
            </div>
          </div>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
            placeholder="Nhãn (phân cách bằng dấu phẩy)"
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
            placeholder="Ghi chú cá nhân"
          />
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleFormModal;
