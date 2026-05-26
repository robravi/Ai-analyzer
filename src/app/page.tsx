import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { FileSearch, Target, ShieldCheck, History } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Resume Analysis",
    description: "Get detailed feedback on your resume with section-by-section scores and actionable improvements.",
  },
  {
    icon: Target,
    title: "Job Matching",
    description: "Compare your resume against a job description to identify gaps and optimize for the role.",
  },
  {
    icon: ShieldCheck,
    title: "ATS Compatibility",
    description: "Check if your resume can pass Applicant Tracking Systems with formatting and keyword analysis.",
  },
  {
    icon: History,
    title: "Save & Track",
    description: "Save your analyses and track improvements over time with your personal history.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            AI-Powered
            <span className="block text-primary">Resume Analyzer</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and get instant AI-driven feedback. Improve your chances
            with detailed analysis, job matching, and ATS compatibility checks.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" render={<Link href="/analyze" />}>
              Get Started
            </Button>
            <Button variant="outline" size="lg" render={<Link href="/login" />}>
              Sign In
            </Button>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 pb-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-10 w-10 mx-auto text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          AI Resume Analyzer. Powered by Groq AI.
        </div>
      </footer>
    </>
  );
}
