import { IncomingForm } from 'formidable';
import OpenAI from 'openai';

export const config = {
  api: {
    bodyParser: false
  }
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  try {
    const form = new IncomingForm();
    form.parse(req, async (err) => {
      if (err) {
        console.error("❌ 解析失败", err);
        return res.status(500).json({ error: '上传失败', detail: err });
      }

      const prompt = `
你是资深视觉设计专家，请根据图片描述，从以下6个维度为该图打分（每项满分5分），并给出点评：
维度：构图排版、色彩系统、字体风格、人物素材、字数控制、安全风控。
图像描述：封面主图，红蓝撞色背景，字体大标题突出，图中有插画人物和打分雷达图。

请以如下 JSON 格式返回：
{
  "评分": { "构图排版": 4.5, ... },
  "点评": { "构图排版": "...", ... },
  "总分": 89
}`;

      const chat = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }]
      });

      const reply = chat.choices[0].message.content;
      console.log("✅ GPT 返回：", reply);

      try {
        const json = JSON.parse(reply);
        res.status(200).json(json);
      } catch (e) {
        console.error("❌ JSON解析失败", e);
        res.status(500).json({ error: "GPT JSON格式错误", raw: reply });
      }
    });
  } catch (e) {
    console.error("❌ 总异常", e);
    res.status(500).json({ error: "函数执行失败", detail: String(e) });
  }
}
