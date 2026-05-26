"use client";

import { useCompletion } from "@ai-sdk/react";

export function useResumeAnalysis() {
  const { completion, isLoading, complete, error } = useCompletion({
    api: "/api/analyze",
    streamProtocol: "text",
  });

  const startAnalysis = async (resumeText: string, fileName: string) => {
    await complete("", { body: { resumeText, fileName } });
  };

  return { result: completion, isLoading, startAnalysis, error };
}

export function useJobMatch() {
  const { completion, isLoading, complete, error } = useCompletion({
    api: "/api/match",
    streamProtocol: "text",
  });

  const startMatch = async (resumeText: string, fileName: string, jobDescription: string) => {
    await complete("", { body: { resumeText, fileName, jobDescription } });
  };

  return { result: completion, isLoading, startMatch, error };
}

export function useATSCheck() {
  const { completion, isLoading, complete, error } = useCompletion({
    api: "/api/ats-check",
    streamProtocol: "text",
  });

  const startCheck = async (resumeText: string, fileName: string, fileFormat: string) => {
    await complete("", { body: { resumeText, fileName, fileFormat } });
  };

  return { result: completion, isLoading, startCheck, error };
}

export function parseAIResponse<T>(completion: string): T | null {
  if (!completion) return null;
  const match = completion.match(/```json\n([\s\S]*?)\n```/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]) as T;
  } catch {
    return null;
  }
}
