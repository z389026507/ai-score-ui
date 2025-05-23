import OpenAI from 'openai';
import formidable from 'formidable';
import fs from 'fs';

export const config = { api: { bodyParser: false } };
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: '上传失败' });

    const description = "这是一张视觉设计作品，构图合理，配色统一，包含标题与插画。";
    const prompt = `
你是资深视觉设计专家，请基于以下描述从6个维度为该图打分（每项满分5分），并提供点评。
描述：${description}
维度：构图排版、色彩系统、字体风格、人物素材、字数控制、安全风控。
返回结构如下：
{
  "评分": { "构图排版": 4.5, ... },
  "点评": { "构图排版": "...", ... },
  "总分": 89
}
`;

    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }]
    });

    try {
      const json = JSON.parse(chat.choices[0].message.content);
      res.status(200).json(json);
    } catch {
      res.status(500).json({ error: "JSON解析失败", raw: chat.choices[0].message.content });
    }
  });
}
