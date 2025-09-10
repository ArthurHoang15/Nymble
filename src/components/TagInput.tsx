import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import type { FC, KeyboardEvent, ChangeEvent } from 'react';

interface TagInputProps {
  selectedTags: string[];
  allTags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
}

const TagInput: FC<TagInputProps> = ({
  selectedTags,
  allTags,
  onTagsChange,
  placeholder = "Nhập nhãn mới hoặc chọn từ danh sách..."
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lọc các nhãn gợi ý (chưa được chọn và khớp với input)
  const filteredSuggestions = allTags.filter(tag => 
    !selectedTags.includes(tag) && 
    tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.length > 0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === 'Backspace' && !inputValue && selectedTags.length > 0) {
      // Xóa tag cuối cùng khi nhấn Backspace và input trống
      removeTag(selectedTags[selectedTags.length - 1]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const addTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleSuggestionClick = (tag: string) => {
    addTag(tag);
    inputRef.current?.focus();
  };

  // Đóng suggestions khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Container cho tags đã chọn và input */}
      <div className="min-h-[42px] w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 flex flex-wrap gap-2 items-center">
        {/* Hiển thị các tags đã chọn */}
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-indigo-500 text-white text-sm px-2 py-1 rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:bg-indigo-600 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        
        {/* Input field */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue && setShowSuggestions(true)}
          placeholder={selectedTags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent text-white outline-none placeholder-gray-400"
        />
      </div>

      {/* Danh sách gợi ý */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {filteredSuggestions.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleSuggestionClick(tag)}
              className="w-full text-left px-3 py-2 text-white hover:bg-gray-600 transition-colors first:rounded-t-md last:rounded-b-md"
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Hiển thị thông báo khi có thể tạo tag mới */}
      {showSuggestions && inputValue.trim() && !allTags.includes(inputValue.trim()) && (
        <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg">
          <div className="px-3 py-2 text-gray-300 text-sm border-b border-gray-600">
            Nhấn Enter để tạo nhãn mới:
          </div>
          <button
            type="button"
            onClick={() => addTag(inputValue.trim())}
            className="w-full text-left px-3 py-2 text-white hover:bg-gray-600 transition-colors rounded-b-md"
          >
            <span className="text-green-400">+ </span>
            "{inputValue.trim()}"
          </button>
        </div>
      )}
    </div>
  );
};

export default TagInput;
