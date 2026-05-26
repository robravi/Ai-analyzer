"use client";

import { useATSCheck, parseAIResponse } from "@/hooks/use-analysis";
import { useSaveAnalysis } from "@/hooks/queries/use-history";
import { useResumeStore } from "@/stores/resume-store";
import { ScoreGauge } from "@/components/score-gauge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Save, CheckCircle, AlertTriangle } from "lucide-react";
import type { ATSResult } from "@/types";
import { useState } from "react";

export function ATSResults() {
  const { resumeText, fileName } = useResumeStore();
  const { result, isLoading, startCheck, error } = useATSCheck();
  const saveAnalysis = useSaveAnalysis();
  const [saved, setSaved] = useState(false);

  const parsed = parseAIResponse<ATSResult>(result);

  const handleCheck = () => {
    if (resumeText && fileName) {
      setSaved(false);
      const ext = fileName.split(".").pop()?.toUpperCase() || "UNKNOWN";
      startCheck(resumeText, fileName, ext);
    }
  };

  const handleSave = () => {
    if (parsed && resumeText && fileName) {
      saveAnalysis.mutate(
        {
          type: "ats_check",
          fileName,
          resumeText,
          overallScore: parsed.atsScore,
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
          onClick={handleCheck}
          disabled={!resumeText || isLoading}
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking ATS...
            </>
          ) : (
            "Check ATS Compatibility"
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
                <ScoreGauge score={parsed.atsScore} label="ATS Score" size="lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">ATS Compatibility</h3>
                  <p className="text-muted-foreground">{parsed.summary}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4 text-center">
                <ScoreGauge score={parsed.fileFormat.score} label="File Format" size="sm" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <ScoreGauge score={parsed.sectionHeaders.score} label="Headers" size="sm" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <ScoreGauge score={parsed.keywordDensity.score} label="Keywords" size="sm" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <ScoreGauge score={parsed.formatting.score} label="Formatting" size="sm" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Section Headers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {parsed.sectionHeaders.found.length > 0 && (
                  <div>
                    <p className="text-xs font-medium mb-1 text-green-600">Found:</p>
                    <div className="flex flex-wrap gap-1">
                      {parsed.sectionHeaders.found.map((h, i) => (
                        <Badge key={i} variant="secondary">{h}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {parsed.sectionHeaders.missing.length > 0 && (
                  <div>
                    <p className="text-xs font-medium mb-1 text-red-600">Missing:</p>
                    <div className="flex flex-wrap gap-1">
                      {parsed.sectionHeaders.missing.map((h, i) => (
                        <Badge key={i} variant="destructive">{h}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {parsed.sectionHeaders.nonStandard.length > 0 && (
                  <div>
                    <p className="text-xs font-medium mb-1 text-yellow-600">Non-Standard:</p>
                    <div className="flex flex-wrap gap-1">
                      {parsed.sectionHeaders.nonStandard.map((h, i) => (
                        <Badge key={i} variant="outline">{h}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {parsed.contactInfo.found.length > 0 && (
                  <div>
                    <p className="text-xs font-medium mb-1 text-green-600">Found:</p>
                    <ul className="space-y-1">
                      {parsed.contactInfo.found.map((c, i) => (
                        <li key={i} className="text-sm flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {parsed.contactInfo.missing.length > 0 && (
                  <div>
                    <p className="text-xs font-medium mb-1 text-red-600">Missing:</p>
                    <ul className="space-y-1">
                      {parsed.contactInfo.missing.map((c, i) => (
                        <li key={i} className="text-sm flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 text-red-500" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {parsed.formatting.issues.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Formatting Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {parsed.formatting.issues.map((issue, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {parsed.overallRecommendations.length > 0 && (
            <>
              <Separator />
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {parsed.overallRecommendations.map((rec, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="text-primary shrink-0">{i + 1}.</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
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
