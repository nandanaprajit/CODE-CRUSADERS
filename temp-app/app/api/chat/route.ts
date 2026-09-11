import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages = [] } = body;

    const userMessageCount = messages.filter(
      (m: { role: string }) => m.role === "user"
    ).length;

    let systemInstruction = `You are Alex, a Senior Lead Data Analyst at ShopPulse Operations.
You are mentoring and supervising a junior candidate in a high-stakes workplace simulation.
Personality & Rules:
- Be professional, demanding, sharp, and concise (2-4 sentences max per reply).
- Never act like a friendly tutor or standard helpful assistant.
- Never directly give them the answer or write the SQL/code for them.
- Question their assumptions and demand data-backed justifications.
- If they make a claim, demand to know the exact metric, row count, or evidence.`;

    if (userMessageCount >= 3) {
      systemInstruction += `\n\n🚨 URGENT INCIDENT ACTIVE:
Marketing has abruptly deprecated and redefined the 'customer_type' column.
Demand that the candidate pivot immediately, explain how their churn findings are impacted, and submit revised figures. Press them on time pressure.`;
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: systemInstruction },
        ...messages,
      ],
      temperature: 0.6,
      max_completion_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content || "No response received.";

    return NextResponse.json({
      reply,
      isCrisis: userMessageCount >= 3,
    });
  } catch (error: any) {
    console.error("API Chat Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to contact AI model" },
      { status: 500 }
    );
  }
}