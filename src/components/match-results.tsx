"use client";

import { useJobMatch, parseAIResponse } from "@/hooks/use-analysis";
import { useSaveAnalysis } from "@/hooks/queries/use-history";
import { useResumeStore } from "@/stores/resume-store";
import { ScoreGauge } from "@/components/score-gauge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Save, CheckCircle } from "lucide-react";
import type { MatchResult } from "@/types";
import { useState } from "react";

export function MatchResults() {
  const { resumeText, fileName, jobDescription } = useResumeStore();
  const { result, isLoading, startMatch, error } = useJobMatch();
  const saveAnalysis = useSaveAnalysis();
  const [saved, setSaved] = useState(false);

  const parsed = parseAIResponse<MatchResult>(result);

  const handleMatch = () => {
    if (resumeText && fileName && jobDescription) {
      setSaved(false);
      startMatch(resumeText, fileName, jobDescription);
    }
  };

  const handleSave = () => {
    if (parsed && resumeText && fileName) {
      saveAnalysis.mutate(
        {
          type: "job_match",
          fileName,
          resumeText,
          jobDescription,
          overallScore: parsed.matchScore,
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
          onClick={handleMatch}
          disabled={!resumeText || !jobDescription || jobDescription.length < 50 || isLoading}
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Matching...
            </>
          ) : (
            "Match Against Job"
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
        </div>
      )}

      {parsed && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ScoreGauge score={parsed.matchScore} label="Match Score" size="lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Match Summary</h3>
                  <p className="text-muted-foreground">{parsed.summary}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-green-600">Matched Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {parsed.matchedKeywords.map((kw, i) => (
                    <Badge key={i} variant="default">{kw}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base text-red-600">Missing Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {parsed.missingKeywords.map((kw, i) => (
                    <Badge key={i} variant="destructive">{kw}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {parsed.gapAnalysis.length > 0 && (
            <>
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Gap Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {parsed.gapAnalysis.map((gap, i) => (
                      <div key={i} className="border rounded-lg p-4 space-y-2">
                        <h4 className="font-medium text-sm">{gap.area}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Required: </span>
                            {gap.required}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Your Resume: </span>
                            {gap.current}
                          </div>
                        </div>
                        <p className="text-xs text-primary">{gap.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {parsed.tailoringTips.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tailoring Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {parsed.tailoringTips.map((tip, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary shrink-0">-</span>
                      {tip}
                    </li>
                  ))}
                </ul>
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
