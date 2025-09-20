// src/pages/TopPage.jsx
export default function TopPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="p-6 bg-gradient-to-r from-green-200 to-green-100 text-center shadow">
        <h1 className="text-3xl font-extrabold text-green-800">記憶の森</h1>
        <p className="text-gray-700 mt-2 text-sm">
          あなたの記憶と社会の記憶が重なり合う場所
        </p>
        <button className="mt-3 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700">
          kiokunomoriとは？
        </button>
      </header>

      {/* ボディー：おすすめ */}
      <main className="flex-1 p-6 space-y-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">あなたへのおすすめ</h2>

        {/* ダミーカード */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
            <h3 className="font-semibold text-green-700">中学1年のとき（2005年）</h3>
            <p className="text-sm text-gray-600 mt-1">「愛・地球博」が開催されました。</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
            <h3 className="font-semibold text-green-700">興味のあるカテゴリ：音楽</h3>
            <p className="text-sm text-gray-600 mt-1">あの時流行った曲をもう一度。</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
            <h3 className="font-semibold text-green-700">おすすめの記憶</h3>
            <p className="text-sm text-gray-600 mt-1">「友達と初めて行った旅行」</p>
          </div>
        </div>
      </main>

      {/* フッター（Layoutが付けてるので不要なら削除OK） */}
    </div>
  );
}