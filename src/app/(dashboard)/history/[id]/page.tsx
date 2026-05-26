"use client";

import { use } from "react";
import { useHistoryDetail } from "@/hooks/queries/use-history";
import { ScoreGauge } from "@/components/score-gauge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { AnalysisResult, MatchResult, ATSResult } from "@/types";

const typeLabels: Record<string, string> = {
  resume_analysis: "Resume Analysis",
  job_match: "Job Match",
  ats_check: "ATS Check",
};

export default function HistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: analysis, isLoading, error } = useHistoryDetail(id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" render={<Link href="/history" />}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to History
        </Button>
        <p className="text-destructive">Analysis not found.</p>
      </div>
    );
  }

  let parsedResult: AnalysisResult | MatchResult | ATSResult | null = null;
  try {
    parsedResult = JSON.parse(analysis.resultJson);
  } catch {
    // ignore parse errors
  }

  const score =
    analysis.overallScore ??
    (parsedResult && "overallScore" in parsedResult ? parsedResult.overallScore :
     parsedResult && "matchScore" in parsedResult ? parsedResult.matchScore :
     parsedResult && "atsScore" in parsedResult ? parsedResult.atsScore : 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" render={<Link href="/history" />}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">{analysis.fileName}</h1>
        <Badge variant="secondary">
          {typeLabels[analysis.type] || analysis.type}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground">
        Analyzed on {new Date(analysis.createdAt).toLocaleDateString()} at{" "}
        {new Date(analysis.createdAt).toLocaleTimeString()}
      </p>

      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <ScoreGauge score={score} label="Score" size="lg" />
          <div className="flex-1">
            {parsedResult && "summary" in parsedResult && (
              <>
                <h3 className="font-semibold text-lg mb-2">Summary</h3>
                <p className="text-muted-foreground">{parsedResult.summary}</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Full Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs whitespace-pre-wrap bg-muted p-4 rounded-lg overflow-auto max-h-96">
            {JSON.stringify(parsedResult, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
