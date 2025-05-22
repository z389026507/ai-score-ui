
import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const mockScores = [
  { dimension: '构图排版', score: 4.5 },
  { dimension: '色彩系统', score: 4.0 },
  { dimension: '字体风格', score: 3.5 },
  { dimension: '人物素材', score: 4.2 },
  { dimension: '字数控制', score: 2.8 },
  { dimension: '安全风控', score: 5.0 },
];

const explanations = {
  '构图排版': '构图清晰，信息分布合理，有良好视觉引导。',
  '色彩系统': '色彩搭配和谐，主次分明。',
  '字体风格': '字体基本匹配，略有小瑕疵。',
  '人物素材': '人物清晰，风格统一。',
  '字数控制': '文字略多，建议适当精简。',
  '安全风控': '无水印，无敏感元素。'
};

function App() {
  return (
    <div className="p-6 space-y-6 font-sans max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">🎯 视觉评分系统 Demo</h1>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">📊 雷达评分图</h2>
        <RadarChart outerRadius={90} width={500} height={300} data={mockScores.map(s => ({ ...s, fullMark: 5 }))}>
          <PolarGrid />
          <PolarAngleAxis dataKey="dimension" />
          <PolarRadiusAxis angle={30} domain={[0, 5]} />
          <Radar name="得分" dataKey="score" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.6} />
        </RadarChart>
      </div>
      {mockScores.map((item, idx) => (
        <div key={idx} className="bg-white p-4 rounded shadow">
          <div className="flex justify-between">
            <h3 className="text-base font-semibold">{item.dimension}</h3>
            <span className="text-blue-500 font-medium">{item.score.toFixed(1)} 分</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{explanations[item.dimension]}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
