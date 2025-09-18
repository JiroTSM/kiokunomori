import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setUser }) {
  const [realname, setRealname] = useState("");   // 本名（非公開）
  const [username, setUsername] = useState("");   // 公開用ユーザーネーム
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      realname,   // ← 本名（非公開）
      username,   // ← 公開用ユーザーネーム
      email,
      password,
      memories: [],
    };

    console.log("✅ ログイン:", newUser);

    if (setUser) {
      setUser(newUser); // 親(App)の state に保存
    }

    navigate("/mypage"); // マイページへ移動
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-6">ログイン</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 本名（非公開） */}
          <input
            type="text"
            placeholder="本名（非公開）"
            value={realname}
            onChange={(e) => setRealname(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            required
          />

          {/* 公開用ユーザーネーム */}
          <input
            type="text"
            placeholder="ユーザーネーム（公開用）"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            required
          />

          {/* メールアドレス */}
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            required
          />

          {/* パスワード */}
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            required
          />

          {/* ログインボタン */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}