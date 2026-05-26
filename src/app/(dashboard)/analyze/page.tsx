import { ResumeUpload } from "@/components/resume-upload";
import { AnalysisResults } from "@/components/analysis-results";

export default function AnalyzePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">Resume Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Upload your resume to get a comprehensive AI-powered analysis.
        </p>
      </div>
      <ResumeUpload />
      <AnalysisResults />
    </div>
  );
}
