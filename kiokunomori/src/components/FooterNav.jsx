import { Home, User, PlusSquare, Search, List } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function FooterNav({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md">
      <div className="flex justify-around items-center py-2 text-gray-600">
        {/* ホーム */}
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center text-sm ${
            location.pathname === "/" ? "text-black" : "text-gray-400"
          }`}
        >
          <Home size={24} />
          <span className="text-[10px]">ホーム</span>
        </button>

        {/* タイムライン */}
        <button
          onClick={() => navigate("/timeline")}
          className={`flex flex-col items-center text-sm ${
            isActive("/timeline") ? "text-black" : "text-gray-400"
          }`}
        >
          <List size={24} />
          <span className="text-[10px]">タイムライン</span>
        </button>

        {/* 検索 */}
        <button
          onClick={() => navigate("/search")}
          className={`flex flex-col items-center text-sm ${
            isActive("/search") ? "text-black" : "text-gray-400"
          }`}
        >
          <Search size={24} />
          <span className="text-[10px]">検索</span>
        </button>

        {/* 投稿 */}
        <button
          onClick={() => (user ? navigate("/memory/add") : navigate("/login"))}
          className={`flex flex-col items-center text-sm ${
            isActive("/memory/add") ? "text-black" : "text-gray-400"
          }`}
        >
          <PlusSquare size={24} />
          <span className="text-[10px]">投稿</span>
        </button>

        {/* マイページ */}
        <button
          onClick={() => navigate("/mypage")}
          className={`flex flex-col items-center text-sm ${
            isActive("/mypage") ? "text-black" : "text-gray-400"
          }`}
        >
          <User size={24} />
          <span className="text-[10px]">マイページ</span>
        </button>
      </div>
    </div>
  );
}