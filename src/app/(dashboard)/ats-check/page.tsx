import { ResumeUpload } from "@/components/resume-upload";
import { ATSResults } from "@/components/ats-results";

export default function ATSCheckPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ATS Compatibility Check</h1>
        <p className="text-muted-foreground mt-2">
          Check if your resume is optimized for Applicant Tracking Systems.
        </p>
      </div>
      <ResumeUpload />
      <ATSResults />
    </div>
  );
}
