import type { FC } from "react";
import { Edit, Trash2 } from "lucide-react";
import type { ArticleItemProps } from "../types";
import { STATUS_OPTIONS, RATING_LABELS } from "../constants";
import StarRating from "./StarRating";

const ArticleItem: FC<ArticleItemProps> = ({ article, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors">
      <div className="flex justify-between items-start">
        <a
          href={article.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-bold text-indigo-400 hover:underline"
        >
          {article.title}
        </a>
        <div
          className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${
            STATUS_OPTIONS[article.status]?.color || "bg-gray-500"
          }`}
        >
          {STATUS_OPTIONS[article.status]?.label || "N/A"}
        </div>
      </div>
      <p className="text-sm text-gray-400 mt-1">
        bởi {article.author} - Lưu ngày:{" "}
        {new Date(article.created_at).toLocaleDateString()}
      </p>
      <div className="flex items-center my-2">
        <StarRating rating={article.rating} readonly />
        <span className="ml-2 text-sm text-gray-400">
          {RATING_LABELS[article.rating]}
        </span>
      </div>
      <p className="text-gray-300 text-sm my-2">{article.notes}</p>
      {article.github_url && (
        <a
          href={article.github_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-400 hover:underline"
        >
          Link Github/Tool
        </a>
      )}
      <div className="flex justify-between items-center mt-3">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-700 text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-3 ml-4">
          <button
            onClick={() => onEdit(article)}
            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-3 py-1.5 rounded-md transition-colors duration-200"
          >
            <Edit className="w-4 h-4" />
            <span>Sửa</span>
          </button>
          <button
            onClick={() => onDelete(article.id)}
            className="flex items-center space-x-1 bg-red-600 hover:bg-red-500 text-white text-sm font-medium px-3 py-1.5 rounded-md transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            <span>Xóa</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
