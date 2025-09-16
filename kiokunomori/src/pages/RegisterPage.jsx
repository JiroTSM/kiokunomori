import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const prefectures = [
    "北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
    "茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
    "新潟県","富山県","石川県","福井県","山梨県","長野県",
    "岐阜県","静岡県","愛知県","三重県",
    "滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県",
    "鳥取県","島根県","岡山県","広島県","山口県",
    "徳島県","香川県","愛媛県","高知県",
    "福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"
  ];

  const [form, setForm] = useState({
    email: "",
    userID: "",
    name: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    prefecture: "",
    city: "",
    kindergarten: "",
    elementary: "",
    juniorHigh: "",
    highSchool: "",
    university: "",
    graduate: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(form));
    navigate("/timeline");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">初期登録</h2>

        {/* ユーザーID */}
        <input
            type="text"
            name="userId"
            placeholder="ユーザーID（英数字のみ）"
            value={form.userId}
            onChange={handleChange}
            pattern="^[A-Za-z0-9]+$"
            required
            className="w-full p-2 border rounded"
        />

        {/* メールアドレス */}
        <input
            type="email"
            name="email"
            placeholder="メールアドレス"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
        />

        {/* 名前 */}
        <input
          type="text"
          name="name"
          placeholder="名前"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* 誕生日 */}
        <div className="flex space-x-2">
          <select name="birthYear" value={form.birthYear} onChange={handleChange} className="flex-1 p-2 border rounded">
            <option value="">年</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select name="birthMonth" value={form.birthMonth} onChange={handleChange} className="flex-1 p-2 border rounded">
            <option value="">月</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select name="birthDay" value={form.birthDay} onChange={handleChange} className="flex-1 p-2 border rounded">
            <option value="">日</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* 出身地 */}
        <select
          name="prefecture"
          value={form.prefecture}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">都道府県</option>
          {prefectures.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <input
          type="text"
          name="city"
          placeholder="市町村"
          value={form.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* 学歴 */}
        <input type="text" name="kindergarten" placeholder="幼稚園・保育園" value={form.kindergarten} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="elementary" placeholder="小学校" value={form.elementary} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="juniorHigh" placeholder="中学校" value={form.juniorHigh} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="highSchool" placeholder="高等学校" value={form.highSchool} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="university" placeholder="短大・大学・専門学校" value={form.university} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="graduate" placeholder="大学院" value={form.graduate} onChange={handleChange} className="w-full p-2 border rounded" />

        {/* 送信 */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          登録する
        </button>
      </form>
    </div>
  );
}