export function buildAnalysisPrompt(resumeText: string): string {
  return `You are an expert resume reviewer and career coach. Analyze the following resume thoroughly.

Return your analysis in the following JSON structure (wrapped in a markdown code block):

\`\`\`json
{
  "overallScore": <number 0-100>,
  "summary": "<2-3 sentence executive summary>",
  "sections": [
    {
      "name": "<section name>",
      "score": <number 0-100>,
      "found": <boolean>,
      "feedback": "<specific actionable feedback>",
      "suggestions": ["<improvement 1>", "<improvement 2>"]
    }
  ],
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<critical improvement 1>", "<improvement 2>", "<improvement 3>"],
  "missingKeywords": ["<industry keyword 1>", "<keyword 2>"],
  "formattingNotes": "<notes on formatting, length, structure>"
}
\`\`\`

Evaluate these sections: Contact Information, Professional Summary/Objective, Work Experience, Education, Skills, Certifications, Projects, and overall formatting.

RESUME TEXT:
---
${resumeText}
---`;
}

export function buildMatchPrompt(resumeText: string, jobDescription: string): string {
  return `You are an expert recruiter and ATS specialist. Compare the following resume against the job description and provide a detailed match analysis.

Return your analysis in the following JSON structure (wrapped in a markdown code block):

\`\`\`json
{
  "matchScore": <number 0-100>,
  "summary": "<2-3 sentence match summary>",
  "matchedKeywords": ["<keyword found in both>"],
  "missingKeywords": ["<keyword in JD but not in resume>"],
  "gapAnalysis": [
    {
      "area": "<skill/requirement area>",
      "required": "<what the JD asks for>",
      "current": "<what the resume shows>",
      "recommendation": "<how to bridge the gap>"
    }
  ],
  "strongMatches": ["<areas where candidate excels>"],
  "tailoringTips": ["<specific suggestion to tailor resume for this role>"]
}
\`\`\`

RESUME TEXT:
---
${resumeText}
---

JOB DESCRIPTION:
---
${jobDescription}
---`;
}

export function buildATSPrompt(resumeText: string, fileFormat: string): string {
  return `You are an ATS (Applicant Tracking System) expert. Evaluate this resume for ATS compatibility.

Return your analysis in the following JSON structure (wrapped in a markdown code block):

\`\`\`json
{
  "atsScore": <number 0-100>,
  "summary": "<2-3 sentence ATS compatibility summary>",
  "fileFormat": {
    "format": "${fileFormat}",
    "score": <number 0-100>,
    "notes": "<file format compatibility notes>"
  },
  "sectionHeaders": {
    "score": <number 0-100>,
    "found": ["<standard header found>"],
    "missing": ["<standard header missing>"],
    "nonStandard": ["<non-standard header that may confuse ATS>"]
  },
  "keywordDensity": {
    "score": <number 0-100>,
    "notes": "<assessment of keyword usage>",
    "suggestions": ["<keyword suggestion>"]
  },
  "formatting": {
    "score": <number 0-100>,
    "issues": ["<formatting issue that may confuse ATS>"],
    "suggestions": ["<formatting fix>"]
  },
  "contactInfo": {
    "found": ["<contact detail found>"],
    "missing": ["<contact detail missing>"]
  },
  "overallRecommendations": ["<top recommendation>"]
}
\`\`\`

RESUME TEXT:
---
${resumeText}
---`;
}
