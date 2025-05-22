
import OpenAI from 'openai';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: '上传失败' });

    const prompt = `
你是一个资深的视觉设计评审专家，现在请你从设计专业角度，对以下图像进行评分分析。

评分维度：
1. 构图排版
2. 色彩系统
3. 字体风格
4. 字数控制
5. 人物素材
6. 安全风控

请以如下JSON格式输出：
{
  "评分": {
    "构图排版": 4.5,
    "色彩系统": 4.2,
    "字体风格": 3.8,
    "字数控制": 2.5,
    "人物素材": 4.7,
    "安全风控": 5.0
  },
  "点评": {
    "构图排版": "排版整体清晰，主视觉聚焦合理。",
    "色彩系统": "色彩和谐，背景与人物对比良好。",
    "字体风格": "字体略显普通，建议增强层次。",
    "字数控制": "文字较多，建议精简。",
    "人物素材": "人物抠图干净，清晰度高。",
    "安全风控": "无水印，图像合规。"
  },
  "总分": 85
}`;

    const chat = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
    });

    const answer = chat.choices[0].message.content;
    try {
      const json = JSON.parse(answer);
      res.status(200).json(json);
    } catch {
      res.status(500).json({ error: '评分解析失败', raw: answer });
    }
  });
}
