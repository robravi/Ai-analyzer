"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreGauge } from "@/components/score-gauge";
import type { SectionFeedback as SectionFeedbackType } from "@/types";
import { CheckCircle, XCircle } from "lucide-react";

interface SectionFeedbackProps {
  section: SectionFeedbackType;
}

export function SectionFeedback({ section }: SectionFeedbackProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          {section.found ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          {section.name}
        </CardTitle>
        <ScoreGauge score={section.score} label="" size="sm" />
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{section.feedback}</p>
        {section.suggestions.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-medium">Suggestions:</p>
            <ul className="space-y-1">
              {section.suggestions.map((s, i) => (
                <li key={i} className="text-xs text-muted-foreground flex gap-2">
                  <span className="text-primary">-</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
