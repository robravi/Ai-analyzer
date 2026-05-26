"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useResumeStore } from "@/stores/resume-store";

export function JobDescriptionInput() {
  const { jobDescription, setJobDescription } = useResumeStore();

  return (
    <Card>
      <CardContent className="p-6 space-y-3">
        <Label htmlFor="job-description" className="font-semibold">
          Job Description
        </Label>
        <Textarea
          id="job-description"
          placeholder="Paste the job description here to compare against your resume..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={8}
          className="resize-y"
        />
        <p className="text-xs text-muted-foreground">
          Paste the full job posting for the best match analysis.
        </p>
      </CardContent>
    </Card>
  );
}
