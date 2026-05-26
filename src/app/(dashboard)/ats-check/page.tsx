import { ResumeUpload } from "@/components/resume-upload";
import { ATSResults } from "@/components/ats-results";

export default function ATSCheckPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">ATS Compatibility Check</h1>
        <p className="text-muted-foreground mt-1">
          Check if your resume is optimized for Applicant Tracking Systems.
        </p>
      </div>
      <ResumeUpload />
      <ATSResults />
    </div>
  );
}
