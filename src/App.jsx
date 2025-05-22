
import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/score', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 font-sans">
      <h1 className="text-2xl font-bold">🎯 GPT视觉评分小工具</h1>

      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleUpload}>
        提交评分
      </button>

      {loading && <p className="text-gray-500">正在分析中，请稍候...</p>}

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
            <Radar name="得分" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
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

export default App;
