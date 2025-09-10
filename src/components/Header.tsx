import { PlusCircle } from "lucide-react";
import type { FC } from "react";

interface HeaderProps {
  onAddArticle: () => void;
}

const Header: FC<HeaderProps> = ({ onAddArticle }) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-bold">Nymble</h1>
      <button
        onClick={onAddArticle}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
      >
        <PlusCircle className="w-5 h-5" />
        <span>Thêm bài viết</span>
      </button>
    </header>
  );
};

export default Header;
