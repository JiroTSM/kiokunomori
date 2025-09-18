// src/contexts/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// Context を作成
const UserContext = createContext(null);

// プロバイダー
export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // localStorage 同期
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// カスタムフック
export function useUser() {
  return useContext(UserContext);
}

export default UserContext;