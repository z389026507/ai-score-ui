import React from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const mockScores = [
  { dimension: "构图排版", score: 4.5 },
  { dimension: "色彩系统", score: 4.0 },
  { dimension: "字体风格", score: 3.5 },
  { dimension: "人物素材", score: 4.2 },
  { dimension: "字数控制", score: 2.8 },
  { dimension: "安全风控", score: 5.0 },
];

const explanations = {
  构图排版: "排版清晰，视觉动线自然，有良好聚焦。",
  色彩系统: "主色统一，配色和谐，未见明显冲突。",
  字体风格: "整体风格契合，字体层次略显不足。",
  人物素材: "清晰度高，风格一致，边缘处理干净。",
  字数控制: "文字偏多，影响信息聚焦。",
  安全风控: "图像合规，无水印或违规信息。"
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">🎯 AI视觉评分系统</h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-3">📊 雷达评分图</h2>
        <RadarChart
          outerRadius={90}
          width={500}
          height={300}
          data={mockScores.map((s) => ({ ...s, fullMark: 5 }))}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="dimension" />
          <PolarRadiusAxis angle={30} domain={[0, 5]} />
          <Radar name="得分" dataKey="score" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.6} />
        </RadarChart>
      </div>

      {mockScores.map((item, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{item.dimension}</h3>
            <p className="text-gray-600 text-sm mt-1">{explanations[item.dimension]}</p>
          </div>
          <span className="text-blue-500 text-xl font-bold">{item.score.toFixed(1)} 分</span>
        </div>
      ))}
    </div>
  );
}
