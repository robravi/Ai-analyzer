import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export async function parseResume(buffer: Buffer, fileName: string): Promise<string> {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (extension === "pdf") {
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    const result = await parser.getText();
    await parser.destroy();
    return result.text.trim();
  }

  if (extension === "docx") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  }

  throw new Error("Unsupported file format. Please upload PDF or DOCX.");
}
