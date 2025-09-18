import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MemoryAdd({ setMemories }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("personal"); // ✅ デフォルトは個人
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

      // ✅ content から summary を生成（50文字以内）
  const summary =
    content.length > 50 ? content.slice(0, 47) + "..." : content;

    const newMemory = {
      title,
      description: content,
      summary, // ← 要約を追加
      date,
      category, // "social" or "personal"
      prefecture,
      city,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    // ✅ 記憶を追加
    setMemories((prev) => [...prev, newMemory]);

    console.log("✅ 新しい記憶を追加:", newMemory);

    // マイページに戻る
    navigate("/mypage");
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">記憶を登録する</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 w-full rounded"
          required
        />

        <textarea
          placeholder="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border px-3 py-2 w-full rounded"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 w-full rounded"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        >
          <option value="personal">個人的記憶</option>
          <option value="social">社会的記憶</option>
        </select>

        <input
          type="text"
          placeholder="都道府県"
          value={prefecture}
          onChange={(e) => setPrefecture(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="市町村"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="ハッシュタグ（カンマ区切り）"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          登録
        </button>
      </form>
    </div>
  );
}