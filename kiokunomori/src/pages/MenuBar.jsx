export default function MenuBar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-xl font-bold">記憶の森 Timeline</h1>
        <ul className="flex gap-4">
          <li><a href="/mypage">MyPage</a></li>
          <li><a href="/timeline">Timeline</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </div>
    </nav>
  );
}