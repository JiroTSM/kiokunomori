import { useParams } from "react-router-dom";

export default function MemoryEdit() {
  const { id } = useParams();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Memory Edit</h1>
      <p>記憶ID {id} を編集する画面です。</p>
    </div>
  );
}