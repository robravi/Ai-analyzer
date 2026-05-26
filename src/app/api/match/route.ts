import { streamText } from "ai";
import { groq } from "@/lib/groq";
import { buildMatchPrompt } from "@/lib/prompts";
import { auth } from "@/lib/auth";
import { matchSchema } from "@/lib/validators";

export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const parsed = matchSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(parsed.error.message, { status: 400 });
  }

  const { resumeText, jobDescription } = parsed.data;

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    prompt: buildMatchPrompt(resumeText, jobDescription),
    maxOutputTokens: 4096,
  });

  return result.toTextStreamResponse();
}
