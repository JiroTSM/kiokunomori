// src/services/MemoryService.js

/**
 * 公開処理
 */
export function publishMemory(memory, user, setPublishedMemories, setMemories) {
  const alreadyPublished = (prevMemories) =>
    prevMemories.some((m) => m.title === memory.title && m.date === memory.date);

  setPublishedMemories((prev) => {
    if (alreadyPublished(prev)) {
      alert("この記憶はすでに公開されています。");
      return prev;
    }

    const lane = memory.category === "social" ? "left" : "right";
    const publishedMemory = {
      ...memory,
      lane,
      publishedBy: user.username,
      role: "user",
      __private: false,
    };

    return [...prev, publishedMemory];
  });

  // 非公開版を更新
  setMemories((prev) =>
    prev.map((m) =>
      m.title === memory.title && m.date === memory.date
        ? { ...m, __private: false }
        : m
    )
  );
}

/**
 * 非公開処理
 */
export function unpublishMemory(memory, setPublishedMemories, setMemories) {
  if (window.confirm("この記憶を非公開にしますか？")) {
    // 公開済みリストから削除
    setPublishedMemories((prev) =>
      prev.filter((m) => !(m.title === memory.title && m.date === memory.date))
    );

    // 非公開状態に戻す
    setMemories((prev) =>
      prev.map((m) =>
        m.title === memory.title && m.date === memory.date
          ? { ...m, __private: true }
          : m
      )
    );
  }
}

/**
 * 記憶削除処理
 */
export function deleteMemory(memory, setMemories, setPublishedMemories) {
  if (window.confirm("この記憶を完全に削除しますか？")) {
    // ① マイページから削除
    setMemories((prev) =>
      prev.filter((m) => !(m.title === memory.title && m.date === memory.date))
    );

    // ② 公開済みリストから削除
    setPublishedMemories((prev) =>
      prev.filter((m) => !(m.title === memory.title && m.date === memory.date))
    );
  }
}