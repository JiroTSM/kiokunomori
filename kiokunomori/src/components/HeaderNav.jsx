export default function HeaderNav() {
  return (
    <div className="fixed top-0 left-0 w-full bg-black text-white border-b border-gray-700 shadow-md z-50">
      <div className="flex justify-between items-center px-4 py-2">
        {/* 左側 */}
        <span className="text-sm font-semibold">SOCIAL</span>

        {/* 中央 */}
        <span className="text-base font-bold">TIMELINE</span>

        {/* 右側 */}
        <span className="text-sm font-semibold">PRIVATE</span>
      </div>
    </div>
  );
}