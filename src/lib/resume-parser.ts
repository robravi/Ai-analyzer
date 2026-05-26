import mammoth from "mammoth";

export async function parseResume(buffer: Buffer, fileName: string): Promise<string> {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (extension === "pdf") {
    // Dynamic import to avoid pdf-parse trying to load test file at build time
    // @ts-expect-error -- pdf-parse v1 has no type declarations
    const pdf = (await import("pdf-parse")).default;
    const result = await pdf(buffer);
    return result.text.trim();
  }

  if (extension === "docx") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  }

  throw new Error("Unsupported file format. Please upload PDF or DOCX.");
}
