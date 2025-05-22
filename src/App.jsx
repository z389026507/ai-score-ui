export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>✅ AI视觉评分系统</h1>
      <p style={{ marginTop: '12px' }}>
        页面已成功部署！你现在可以开始上传设计图、对图像进行打分。
      </p>
      <ul style={{ marginTop: '20px', lineHeight: '1.6' }}>
        <li>📌 构图排版评分</li>
        <li>🎨 色彩系统评分</li>
        <li>🔤 字体风格评分</li>
        <li>👤 人物素材评分</li>
        <li>🧾 字数控制评分</li>
      </ul>
    </div>
  );
}
