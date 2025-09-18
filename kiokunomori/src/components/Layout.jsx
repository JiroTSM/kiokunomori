// src/components/Layout.jsx
import HeaderNav from "./HeaderNav";
import FooterNav from "./FooterNav";

export default function Layout({ children, user, showHeader = false }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ 条件付きでヘッダーを表示 */}
      {showHeader && <HeaderNav user={user} />}

      {/* ✅ メイン部分 */}
      <main className="flex-1 pb-16">{children}</main>

      {/* ✅ フッターは常に表示 */}
      <FooterNav user={user} />
    </div>
  );
}