import { useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import TopPage from "./pages/TopPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import MemoryAdd from "./pages/MemoryAdd";
import MemoryEdit from "./pages/MemoryEdit";
import MemoryView from "./pages/MemoryView";
import ProfilePage from "./pages/ProfilePage";
import AdminImport from "./pages/admin/AdminImport";
import TimelinePage from "./pages/TimelinePage";
import SearchPage from "./pages/SearchPage";
import FooterNav from "./components/FooterNav";
import HeaderNav from "./components/HeaderNav";
import Layout from "./components/Layout"; // ★追加
import { useUser } from "./contexts/UserContext"; // ★ 追加
import usePersistedState from "./hooks/usePersistedState"; // ★追加
import { publishMemory, unpublishMemory, deleteMemory } from "./services/MemoryService";

function App() {
  const navigate = useNavigate();

  // ✅ ユーザー
  const { user, setUser } = useUser();

  // ✅ 個人記憶（MyPage 用）
  const [memories, setMemories] = usePersistedState("memories", []);

  // ✅ ホストが用意した社会的記憶（CSV 読み込み）
  const [baseSocialMemories, setBaseSocialMemories] = usePersistedState("baseSocialMemories", []);

  // ✅ ユーザーが公開した記憶
  const [publishedMemories, setPublishedMemories] = usePersistedState("publishedMemories", []);

  // === localStorage 保存処理 ===
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("memories", JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem("baseSocialMemories", JSON.stringify(baseSocialMemories));
  }, [baseSocialMemories]);

  useEffect(() => {
    localStorage.setItem("publishedMemories", JSON.stringify(publishedMemories));
  }, [publishedMemories]);

// === 初回ロード時に CSV を読み込み（ホスト社会的記憶） ===
const didFetch = useRef(false);

useEffect(() => {
  if (!didFetch.current && baseSocialMemories.length === 0) {
    didFetch.current = true;

    const url =
      "https://raw.githubusercontent.com/JiroTSM/kiokunomori_data/main/social_memory_sample.csv";
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
        const headers = lines[0].split(",");
        const parsed = lines.slice(1).map((line) => {
          const values = line.split(",");
          const obj = headers.reduce((acc, header, i) => {
            acc[header] = values[i];
            return acc;
          }, {});
          return { ...obj, role: "host" };
        });
        setBaseSocialMemories(parsed);
      });
  }
}, [baseSocialMemories, setBaseSocialMemories]);

// === 公開処理 ===
const handlePublish = (memory, user) => {
  publishMemory(memory, user, setPublishedMemories, setMemories);
  navigate("/timeline");
};

// === 非公開処理（マイページからのみ） ===
const handleUnpublish = (memory) => {
  unpublishMemory(memory, setPublishedMemories, setMemories);
};

// === ログアウト処理 ===
const handleLogout = () => {
  setUser(null);
  localStorage.removeItem("user");
  navigate("/login"); // ログアウト後はログインページへ
};

// === 記憶そのものを削除 ===
const handleDeleteMemory = (memory) => {
  deleteMemory(memory, setMemories, setPublishedMemories);
};

return (
  <div className="min-h-screen pb-16">
    <Routes>
      <Route
        path="/"
        element={
          <Layout user={user}>
            <TopPage />
          </Layout>
        }
      />
      <Route path="/login" element={<LoginPage setUser={setUser} />} />
      <Route
        path="/mypage"
        element={
          <Layout user={user}>
            <MyPage
              user={user}
              memories={memories}
              setMemories={setMemories}
              onPublish={handlePublish}
              onUnpublish={handleUnpublish}
              publishedMemories={publishedMemories}
              onDeleteMemory={handleDeleteMemory}
              onLogout={handleLogout}
            />
          </Layout>
        }
      />
      <Route path="/memory/add" element={<MemoryAdd setMemories={setMemories} />} />
      <Route path="/memory/edit/:id" element={<MemoryEdit />} />
      <Route path="/memory/view" element={<MemoryView />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin/memories/import" element={<AdminImport />} />
      <Route
        path="/timeline"
        element={
          <Layout user={user} showHeader>
            <TimelinePage
              memories={memories}
              baseSocialMemories={baseSocialMemories}
              publishedMemories={publishedMemories}
              user={user}
              onPublish={handlePublish}
            />
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout user={user}>
            <SearchPage
              baseSocialMemories={baseSocialMemories}
              publishedMemories={publishedMemories}
            />
          </Layout>
        }
      />
    </Routes>

    <FooterNav user={user} />
  </div>
);
}
export default App;