"use client";

import { useResumeAnalysis, parseAIResponse } from "@/hooks/use-analysis";
import { useSaveAnalysis } from "@/hooks/queries/use-history";
import { useResumeStore } from "@/stores/resume-store";
import { ScoreGauge } from "@/components/score-gauge";
import { SectionFeedback } from "@/components/section-feedback";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Save, CheckCircle } from "lucide-react";
import type { AnalysisResult } from "@/types";
import { useState } from "react";

export function AnalysisResults() {
  const { resumeText, fileName } = useResumeStore();
  const { result, isLoading, startAnalysis, error } = useResumeAnalysis();
  const saveAnalysis = useSaveAnalysis();
  const [saved, setSaved] = useState(false);

  const parsed = parseAIResponse<AnalysisResult>(result);

  const handleAnalyze = () => {
    if (resumeText && fileName) {
      setSaved(false);
      startAnalysis(resumeText, fileName);
    }
  };

  const handleSave = () => {
    if (parsed && resumeText && fileName) {
      saveAnalysis.mutate(
        {
          type: "resume_analysis",
          fileName,
          resumeText,
          overallScore: parsed.overallScore,
          resultJson: JSON.stringify(parsed),
        },
        { onSuccess: () => setSaved(true) }
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          onClick={handleAnalyze}
          disabled={!resumeText || isLoading}
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Resume"
          )}
        </Button>

        {parsed && (
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={saveAnalysis.isPending || saved}
          >
            {saved ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Results
              </>
            )}
          </Button>
        )}
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="p-4">
            <p className="text-sm text-destructive">{error.message}</p>
          </CardContent>
        </Card>
      )}

      {isLoading && !parsed && (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      {parsed && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ScoreGauge score={parsed.overallScore} label="Overall Score" size="lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Summary</h3>
                  <p className="text-muted-foreground">{parsed.summary}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {parsed.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {parsed.improvements.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-yellow-500 mt-0.5 shrink-0">!</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-4">Section-by-Section Feedback</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {parsed.sections.map((section, i) => (
                <SectionFeedback key={i} section={section} />
              ))}
            </div>
          </div>

          {parsed.missingKeywords.length > 0 && (
            <>
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Missing Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {parsed.missingKeywords.map((kw, i) => (
                      <Badge key={i} variant="secondary">{kw}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {parsed.formattingNotes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Formatting Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{parsed.formattingNotes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {isLoading && result && !parsed && (
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
