import { Link } from "react-router-dom";

export default function MyPage({
  user,
  memories,
  onPublish,
  onUnpublish,
  publishedMemories,
  onDeleteMemory,
  onLogout, // ✅ ログアウト用
}) {
  if (!user) {
    return <p>ユーザー情報がありません。ログインしてください。</p>;
  }

  return (
    <div className="p-8">
      {/* ユーザー情報 */}
      <h1 className="text-2xl font-bold mb-4">
        {user.username} さんのマイページ
      </h1>
      <p className="mb-2">📧 {user.email}</p>

      {/* ✅ ログアウト & 記憶登録ボタン（横並びに変更） */}

<div className="flex gap-2 mb-6 pl-5">
  <Link
    to="/memory/add"
    className="w-28 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-center text-sm"
  >
    記憶を登録
  </Link>
  <button
    onClick={onLogout}
    className="w-28 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-center text-sm"
  >
    ログアウト
  </button>
</div>
      {/* 記憶一覧 */}
      <h2 className="text-xl font-semibold mt-6 mb-2">あなたの記憶</h2>

      {memories.length === 0 ? (
        <p>まだ記憶は登録されていません。</p>
      ) : (
        <ul className="list-disc pl-5 space-y-3">
          {memories
  .slice()
  .reverse()
  .map((memory, i) => {
    const index = memories.length - 1 - i; // 逆順表示用
    return (
      <li key={index} className="border-b pb-2 p-4 rounded">
        <div className="font-semibold">【{memory.title}】</div>
        <div>{memory.description}</div>
        <div className="text-sm text-gray-500 mt-1">
          {memory.date} / {memory.prefecture} {memory.city} / #
          {memory.tags && memory.tags.join(" #")}
        </div>
        <div className="text-xs text-blue-600 mt-1">
          ({memory.category === "social" ? "社会的記憶" : "個人的記憶"})
        </div>

        {/* ✅ 公開/非公開ボタン + 削除ボタン */}
        <div className="flex gap-2 mt-2">
          {publishedMemories.some(
            (m) => m.title === memory.title && m.date === memory.date
          ) ? (
            <button
              onClick={() => onUnpublish(memory)}
              className="w-28 bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 text-center text-sm"
            >
              非公開
            </button>
          ) : (
            <button
              onClick={() => onPublish(memory, user)}
              className="w-28 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-center text-sm"
            >
              公開
            </button>
          )}

          <button
            onClick={() => onDeleteMemory(memory)}
            className="w-28 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-center text-sm"
          >
            削除
          </button>
        </div>
      </li>
    );
  })}      
      </ul>
    )}
  </div>
);
}