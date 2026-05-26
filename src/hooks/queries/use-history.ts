"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AnalysisRecord } from "@/types";

async function fetchHistory() {
  const res = await fetch("/api/history");
  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}

async function fetchHistoryDetail(id: string): Promise<AnalysisRecord> {
  const res = await fetch(`/api/history/${id}`);
  if (!res.ok) throw new Error("Failed to fetch analysis");
  return res.json();
}

async function saveAnalysis(data: {
  type: string;
  fileName: string;
  resumeText: string;
  jobDescription?: string;
  overallScore?: number;
  resultJson: string;
}) {
  const res = await fetch("/api/history", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save analysis");
  return res.json();
}

async function deleteAnalysis(id: string) {
  const res = await fetch(`/api/history/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete analysis");
  return res.json();
}

export function useHistoryList() {
  return useQuery({
    queryKey: ["history"],
    queryFn: fetchHistory,
  });
}

export function useHistoryDetail(id: string) {
  return useQuery({
    queryKey: ["history", id],
    queryFn: () => fetchHistoryDetail(id),
    enabled: !!id,
  });
}

export function useSaveAnalysis() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveAnalysis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}

export function useDeleteAnalysis() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAnalysis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
}
