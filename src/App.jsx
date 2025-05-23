import React, { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/score", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">📤 AI视觉评分系统</h1>

      <div className="bg-white p-6 rounded-xl shadow text-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files[0];
            setFile(f);
            setPreview(URL.createObjectURL(f));
          }}
        />
        {preview && (
          <img src={preview} alt="预览图" className="w-64 h-auto mx-auto mt-4 rounded-lg border" />
        )}
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? "正在评分..." : "提交评分"}
        </button>
      </div>

      {result && (
        <>
          <RadarChart outerRadius={90} width={500} height={300} data={
            Object.entries(result.评分).map(([dimension, score]) => ({
              dimension,
              score,
              fullMark: 5
            }))
          }>
            <PolarGrid />
            <PolarAngleAxis dataKey="dimension" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} />
            <Radar name="得分" dataKey="score" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.6} />
          </RadarChart>

          <div className="space-y-4">
            {Object.entries(result.点评).map(([key, value]) => (
              <div key={key} className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">{key}</h3>
                <p className="text-sm text-gray-700">{value}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
