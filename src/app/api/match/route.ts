import { streamText } from "ai";
import { groq } from "@/lib/groq";
import { buildMatchPrompt } from "@/lib/prompts";
import { auth } from "@/lib/auth";
import { matchSchema } from "@/lib/validators";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = matchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }

    const { resumeText, jobDescription } = parsed.data;

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: buildMatchPrompt(resumeText, jobDescription),
      maxOutputTokens: 4096,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Match error:", error);
    const message = error instanceof Error ? error.message : "Match analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
