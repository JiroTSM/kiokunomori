import { useState } from "react";

// CSVを読み込む簡易関数
function parseCSV(text) {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i];
      return obj;
    }, {});
  });
}

export default function AdminImport() {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const parsed = parseCSV(text);
      setData(parsed);
    };
    reader.readAsText(file, "utf-8");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">社会的記憶インポート</h1>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {data.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">プレビュー</h2>
          <table className="border border-collapse">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="border px-2 py-1">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="border px-2 py-1">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}