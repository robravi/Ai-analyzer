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
  Zap,
  Brain,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Resume Analysis",
    description:
      "Get detailed feedback on your resume with section-by-section scores and actionable improvements.",
  },
  {
    icon: Target,
    title: "Job Matching",
    description:
      "Compare your resume against a job description to identify gaps and optimize for the role.",
  },
  {
    icon: ShieldCheck,
    title: "ATS Compatibility",
    description:
      "Check if your resume can pass Applicant Tracking Systems with formatting and keyword analysis.",
  },
  {
    icon: History,
    title: "Save & Track",
    description:
      "Save your analyses and track improvements over time with your personal history.",
  },
];

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload",
    description: "Drop your PDF or DOCX resume file",
  },
  {
    icon: Brain,
    step: "02",
    title: "Analyze",
    description: "AI reviews every detail instantly",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Improve",
    description: "Get scores and actionable feedback",
  },
];

const stats = [
  { value: "70B", label: "Parameter AI Model" },
  { value: "<3s", label: "Analysis Time" },
  { value: "98%", label: "ATS Accuracy" },
  { value: "Free", label: "To Get Started" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-28 sm:py-36 lg:py-44">
          {/* Grid background */}
          <div className="absolute inset-0 -z-10 grid-pattern opacity-50 dark:opacity-100" />

          {/* Gradient orbs */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px]" />
            <div className="absolute bottom-0 left-1/4 h-[300px] w-[400px] rounded-full bg-blue-400/5 dark:bg-blue-400/8 blur-[100px]" />
          </div>

          <div className="container mx-auto max-w-5xl px-4 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 dark:bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-10">
              <Zap className="h-3.5 w-3.5" />
              Powered by Llama 3.3 70B on Groq
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
              Your Resume,{" "}
              <span className="text-gradient-blue">Perfected</span>
              <span className="text-primary">.</span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AI-powered analysis that dissects your resume in seconds.
              Get precise scores, identify weaknesses, and land more interviews.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-lg px-8 h-13 text-base glow-blue transition-all hover:scale-[1.02]"
                render={<Link href="/analyze" />}
              >
                Start Free Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-lg px-8 h-13 text-base border-border/60 hover:bg-accent"
                render={<Link href="/login" />}
              >
                Sign In
              </Button>
            </div>

            {/* Stats bar */}
            <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gradient-blue">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 sm:py-28 border-t border-border/50">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
                Process
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                How It Works
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              {steps.map((s, i) => (
                <div
                  key={s.step}
                  className="relative group text-center p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
                >
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden sm:block absolute top-1/2 -right-4 w-8 h-px bg-border/50" />
                  )}

                  <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <s.icon className="h-7 w-7 text-primary" />
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 sm:py-28 border-t border-border/50">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
                Features
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Everything You Need
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
                Comprehensive tools to analyze, match, and optimize your resume for any role
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(0,87,255,0.06)]"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-28 border-t border-border/50">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-12 sm:p-16 text-center overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[500px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[100px]" />
              </div>

              <div className="relative">
                <Sparkles className="h-8 w-8 text-primary mx-auto mb-6" />
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
                  Ready to Land Your Dream Job?
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto mb-10">
                  Upload your resume and get AI-powered insights in seconds.
                  No credit card required.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="rounded-lg px-8 h-13 text-base glow-blue transition-all hover:scale-[1.02]"
                    render={<Link href="/analyze" />}
                  >
                    Analyze My Resume
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Free to use
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    No signup required
                  </span>
                  <span className="flex items-center gap-1.5 hidden sm:flex">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Instant results
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>AI Resume Analyzer</span>
          <span>Powered by Groq AI</span>
        </div>
      </footer>
    </>
  );
}
