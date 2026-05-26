import { streamText } from "ai";
import { groq } from "@/lib/groq";
import { buildATSPrompt } from "@/lib/prompts";
import { auth } from "@/lib/auth";
import { atsCheckSchema } from "@/lib/validators";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = atsCheckSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }

    const { resumeText, fileFormat } = parsed.data;

    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      prompt: buildATSPrompt(resumeText, fileFormat),
      maxOutputTokens: 4096,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("ATS check error:", error);
    const message = error instanceof Error ? error.message : "ATS check failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
