// src/pages/SearchPage.jsx
import { useState } from "react";

export default function SearchPage({ baseSocialMemories, publishedMemories }) {
  const [query, setQuery] = useState("");

  // 検索処理
  const results = [...baseSocialMemories, ...publishedMemories].filter((m) =>
    (m.title?.toLowerCase() || "").includes(query.toLowerCase()) ||
    (m.description?.toLowerCase() || "").includes(query.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* 検索ボックス */}
      <input
        type="text"
        placeholder="記憶を検索..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4"
      />

      {/* 結果一覧 */}
      {query && results.length === 0 && (
        <p className="text-gray-500">該当する記憶は見つかりませんでした。</p>
      )}

      <div className="space-y-4">
        {results.map((m, i) => (
          <div
            key={i}
            className="bg-white shadow rounded p-4 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{m.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">
              {m.description || m.summary || "（内容なし）"}
            </p>
            {m.publishedBy && (
              <span className="text-xs text-gray-400">by {m.publishedBy}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}