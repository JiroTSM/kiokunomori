import React, { useEffect, useState } from "react";

export default function TimelinePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("userProfile");
    if (data) {
      setProfile(JSON.parse(data));
    }
  }, []);

  if (!profile) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>登録データが見つかりません。</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
        {/* IDのみ表示 */}
        <h2 className="text-2xl font-bold mb-4">
          年表（ユーザーID: {profile.userId}）
        </h2>

        {/* 他の登録情報をカード形式で表示（例） */}
        <div className="space-y-2">
          <p>名前: {profile.name}</p>
          <p>誕生日: {profile.birthYear}年 {profile.birthMonth}月 {profile.birthDay}日</p>
          <p>出身地: {profile.prefecture} {profile.city}</p>
          <p>幼稚園・保育園: {profile.kindergarten}</p>
          <p>小学校: {profile.elementary}</p>
          <p>中学校: {profile.juniorHigh}</p>
          <p>高等学校: {profile.highSchool}</p>
          <p>短大・大学・専門学校: {profile.university}</p>
          <p>大学院: {profile.graduate}</p>
        </div>
      </div>
    </div>
  );
}