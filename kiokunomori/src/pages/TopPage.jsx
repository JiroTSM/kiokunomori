import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/toppage_image1.jpg";

export default function TopPage() {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* タイトル */}
       <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-12">
        記憶の森 / KiokuNoMori
      </h1>

      {/* ボタン群 */}
      <div className="flex flex-col space-y-6 text-lg">
        <Link to="/register" className="text-white hover:underline">
          初期登録（はじめての方）
        </Link>
        <Link to="/memory" className="text-white hover:underline">
          記憶の登録
        </Link>
        <Link to="/timeline" className="text-white hover:underline">
          年表
        </Link>
        <Link to="/search" className="text-white hover:underline">
          検索
        </Link>
      </div>
    </div>
  );
}