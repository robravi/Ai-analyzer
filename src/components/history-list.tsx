"use client";

import Link from "next/link";
import { useHistoryList, useDeleteAnalysis } from "@/hooks/queries/use-history";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Eye } from "lucide-react";

const typeLabels: Record<string, string> = {
  resume_analysis: "Analysis",
  job_match: "Job Match",
  ats_check: "ATS Check",
};

export function HistoryList() {
  const { data: analyses, isLoading, error } = useHistoryList();
  const deleteAnalysis = useDeleteAnalysis();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive">Failed to load history.</p>;
  }

  if (!analyses || analyses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No analyses yet. Upload a resume to get started.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>File</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Score</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {analyses.map((analysis: { id: string; createdAt: string; fileName: string; type: string; overallScore: number | null }) => (
            <TableRow key={analysis.id}>
              <TableCell className="text-sm">
                {new Date(analysis.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-sm font-medium max-w-[200px] truncate">
                {analysis.fileName}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {typeLabels[analysis.type] || analysis.type}
                </Badge>
              </TableCell>
              <TableCell>
                {analysis.overallScore !== null ? (
                  <span className="font-medium">{analysis.overallScore}/100</span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" render={<Link href={`/history/${analysis.id}`} />}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteAnalysis.mutate(analysis.id)}
                    disabled={deleteAnalysis.isPending}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
