import { z } from "zod";

export const uploadSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "File must be less than 5MB"
  ).refine(
    (file) => ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type),
    "Only PDF and DOCX files are supported"
  ),
});

export const analyzeSchema = z.object({
  resumeText: z.string().min(50, "Resume text is too short"),
  fileName: z.string().min(1),
});

export const matchSchema = z.object({
  resumeText: z.string().min(50, "Resume text is too short"),
  fileName: z.string().min(1),
  jobDescription: z.string().min(50, "Job description is too short"),
});

export const atsCheckSchema = z.object({
  resumeText: z.string().min(50, "Resume text is too short"),
  fileName: z.string().min(1),
  fileFormat: z.string().min(1),
});

export const saveAnalysisSchema = z.object({
  type: z.enum(["resume_analysis", "job_match", "ats_check"]),
  fileName: z.string().min(1),
  resumeText: z.string().min(1),
  jobDescription: z.string().optional(),
  overallScore: z.number().min(0).max(100).optional(),
  resultJson: z.string().min(1),
});
