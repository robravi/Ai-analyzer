import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import {
  FileSearch,
  Target,
  ShieldCheck,
  History,
  ArrowRight,
  Sparkles,
  Upload,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Resume Analysis",
    description:
      "Get detailed feedback on your resume with section-by-section scores and actionable improvements.",
    color: "from-orange-500/10 to-amber-500/10 dark:from-orange-500/20 dark:to-amber-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    icon: Target,
    title: "Job Matching",
    description:
      "Compare your resume against a job description to identify gaps and optimize for the role.",
    color: "from-rose-500/10 to-pink-500/10 dark:from-rose-500/20 dark:to-pink-500/20",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    icon: ShieldCheck,
    title: "ATS Compatibility",
    description:
      "Check if your resume can pass Applicant Tracking Systems with formatting and keyword analysis.",
    color: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: History,
    title: "Save & Track",
    description:
      "Save your analyses and track improvements over time with your personal history.",
    color: "from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
];

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Resume",
    description: "Drop your PDF or DOCX file",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "AI Analyzes",
    description: "Our AI reviews every detail",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Get Results",
    description: "Actionable scores and feedback",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-24 sm:py-32 lg:py-40">
          {/* Animated background blobs */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-blob" />
            <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-rose-400/10 blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute bottom-1/4 left-1/3 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl animate-blob animation-delay-4000" />
          </div>

          <div className="container mx-auto max-w-5xl px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by Groq AI
            </div>

            <h1 className="font-heading text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95]">
              Make Your Resume{" "}
              <span className="text-gradient italic">Unforgettable</span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Upload your resume and receive instant AI-driven insights.
              Detailed analysis, job matching, and ATS compatibility
              — all in one place.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                render={<Link href="/analyze" />}
              >
                Start Analyzing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-12 text-base"
                render={<Link href="/login" />}
              >
                Sign In
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 sm:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
              Three simple steps to a better resume
            </p>

            <div className="grid gap-8 sm:grid-cols-3">
              {steps.map((s) => (
                <div key={s.step} className="text-center group">
                  <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <s.icon className="h-7 w-7 text-primary" />
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 sm:py-24 bg-muted/40">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
              Comprehensive tools to refine, match, and optimize your resume
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl border bg-card p-8 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 transition-opacity group-hover:opacity-100`}
                  />
                  <div className="relative">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background shadow-sm border">
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32">
          <div className="container mx-auto max-w-5xl px-4 text-center">
            <div className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-rose-500/5 to-amber-500/10 border p-12 sm:p-16 overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
              <div className="relative">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
                  Ready to Stand Out?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                  Join thousands who have improved their resumes with AI-powered
                  insights. Start your free analysis today.
                </p>
                <Button
                  size="lg"
                  className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25"
                  render={<Link href="/analyze" />}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
          AI Resume Analyzer. Powered by Groq AI.
        </div>
      </footer>
    </>
  );
}
