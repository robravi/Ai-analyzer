import { ResumeUpload } from "@/components/resume-upload";
import { JobDescriptionInput } from "@/components/job-description-input";
import { MatchResults } from "@/components/match-results";

export default function MatchPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Job Description Match</h1>
        <p className="text-muted-foreground mt-1">
          Upload your resume and paste a job description to see how well they match.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <ResumeUpload />
        <JobDescriptionInput />
      </div>
      <MatchResults />
    </div>
  );
}
