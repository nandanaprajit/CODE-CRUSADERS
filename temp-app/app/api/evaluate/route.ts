import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages = [], finalReport = "" } = await req.json();

    const evaluationPrompt = `Candidate Simulation Performance:
Chat Transcript:
${messages.map((m: { role: string; content: string }) => `${m.role.toUpperCase()}: ${m.content}`).join("\n")}

Final Report Submitted:
"${finalReport}"

Evaluate the candidate across these areas:
- dataRigor (0-100): backed claims with exact numbers or metrics
- crisisResilience (0-100): adapted to changing requirements
- businessCommunication (0-100): clear executive-level recommendations

You MUST respond strictly with this JSON structure and nothing else:
{
  "scores": {
    "dataRigor": 70,
    "crisisResilience": 65,
    "businessCommunication": 80,
    "overall": 72
  },
  "feedback": "Two direct sentences reviewing their analysis.",
  "verdict": "Hire"
}`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: "You are an AI assessment engine. Output only a valid, raw JSON object. Do not include markdown codeblocks, explanations, or commentary.",
        },
        { role: "user", content: evaluationPrompt },
      ],
      temperature: 0.1,
      max_completion_tokens: 500,
    });

    let raw = completion.choices[0]?.message?.content || "{}";
    raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

    const firstBrace = raw.indexOf("{");
    const lastBrace = raw.lastIndexOf("}");

    if (firstBrace !== -1 && lastBrace !== -1) {
      raw = raw.substring(firstBrace, lastBrace + 1);
    }

    const result = JSON.parse(raw);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Evaluation API Error:", error);
    return NextResponse.json({ error: error.message || "Scoring failed" }, { status: 500 });
  }
}