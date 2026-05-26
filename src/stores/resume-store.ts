"use client";

import { create } from "zustand";

interface ResumeState {
  resumeText: string | null;
  fileName: string | null;
  jobDescription: string;
  setResumeData: (text: string, name: string) => void;
  setJobDescription: (jd: string) => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resumeText: null,
  fileName: null,
  jobDescription: "",
  setResumeData: (text, name) => set({ resumeText: text, fileName: name }),
  setJobDescription: (jd) => set({ jobDescription: jd }),
  reset: () => set({ resumeText: null, fileName: null, jobDescription: "" }),
}));
