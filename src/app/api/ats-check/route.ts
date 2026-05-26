import { streamText } from "ai";
import { groq } from "@/lib/groq";
import { buildATSPrompt } from "@/lib/prompts";
import { auth } from "@/lib/auth";
import { atsCheckSchema } from "@/lib/validators";

export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const parsed = atsCheckSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(parsed.error.message, { status: 400 });
  }

  const { resumeText, fileFormat } = parsed.data;

  const result = streamText({
    model: groq("llama-3.1-8b-instant"),
    prompt: buildATSPrompt(resumeText, fileFormat),
    maxOutputTokens: 4096,
  });

  return result.toTextStreamResponse();
}
