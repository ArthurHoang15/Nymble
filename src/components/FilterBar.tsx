import type { FC } from 'react';
import type { FilterBarProps, FilterState, ArticleStatus } from '../types';
import { STATUS_OPTIONS, RATING_LABELS } from '../constants';

const FilterBar: FC<FilterBarProps> = ({
  filters,
  setFilters,
  allTags,
  searchTerm,
  setSearchTerm,
}) => {
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (value === "all") {
        delete newFilters[key];
      } else {
        if (key === 'status') {
          newFilters[key] = value as ArticleStatus;
        } else if (key === 'rating' || key === 'sort') {
          newFilters[key] = value;
        } else if (key === 'tags') {
          // This shouldn't happen in handleFilterChange, but adding for completeness
          newFilters[key] = [value];
        }
      }
      return newFilters;
    });
  };

  const handleTagChange = (tag: string) => {
    setFilters((prev) => {
      const currentTags = prev.tags || [];
      if (currentTags.includes(tag)) {
        return { ...prev, tags: currentTags.filter((t) => t !== tag) };
      } else {
        return { ...prev, tags: [...currentTags, tag] };
      }
    });
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tiêu đề, nội dung..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
        />
        <select
          value={filters.status || "all"}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
        >
          <option value="all">Tất cả trạng thái</option>
          {Object.entries(STATUS_OPTIONS).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={filters.rating || "all"}
          onChange={(e) => handleFilterChange("rating", e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
        >
          <option value="all">Tất cả mức độ quan trọng</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} sao - {RATING_LABELS[r]}
            </option>
          ))}
        </select>
        <select
          value={filters.sort || "created_at_desc"}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
        >
          <option value="created_at_desc">Ngày lưu (Mới nhất)</option>
          <option value="created_at_asc">Ngày lưu (Cũ nhất)</option>
          <option value="rating_desc">Quan trọng (Cao đến thấp)</option>
          <option value="rating_asc">Quan trọng (Thấp đến cao)</option>
        </select>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-2">
          Lọc theo nhãn
        </h4>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filters.tags?.includes(tag)
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tag}
            </button>
          ))}
          {filters.tags && filters.tags.length > 0 && (
            <button
              onClick={() => handleFilterChange("tags", "all")}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Xóa lọc nhãn
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
