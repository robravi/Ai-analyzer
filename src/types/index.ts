export interface SectionFeedback {
  name: string;
  score: number;
  found: boolean;
  feedback: string;
  suggestions: string[];
}

export interface AnalysisResult {
  overallScore: number;
  summary: string;
  sections: SectionFeedback[];
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
  formattingNotes: string;
}

export interface GapItem {
  area: string;
  required: string;
  current: string;
  recommendation: string;
}

export interface MatchResult {
  matchScore: number;
  summary: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  gapAnalysis: GapItem[];
  strongMatches: string[];
  tailoringTips: string[];
}

export interface ATSResult {
  atsScore: number;
  summary: string;
  fileFormat: {
    format: string;
    score: number;
    notes: string;
  };
  sectionHeaders: {
    score: number;
    found: string[];
    missing: string[];
    nonStandard: string[];
  };
  keywordDensity: {
    score: number;
    notes: string;
    suggestions: string[];
  };
  formatting: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  contactInfo: {
    found: string[];
    missing: string[];
  };
  overallRecommendations: string[];
}

export interface AnalysisRecord {
  id: string;
  type: string;
  fileName: string;
  overallScore: number | null;
  createdAt: string;
  resultJson: string;
  resumeText: string;
  jobDescription: string | null;
}
