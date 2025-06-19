import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function askAi(req, res) {
  const { question } = req.body;
  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "Question is required." });
  }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content:
            "You are a top finance expert. Answer user questions with concise, actionable financial advice.",
        },
        {
          role: "user",
          content: question,
        },
      ],
      max_tokens: 200,
    });
    const answer =
      response.choices?.[0]?.message?.content?.trim() || "No answer returned.";
    res.json({ answer });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to get answer from AI." });
  }
}
