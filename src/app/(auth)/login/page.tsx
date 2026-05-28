"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error);
          setLoading(false);
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(isSignUp ? "Account created but sign-in failed. Try signing in." : "Invalid email or password");
        setLoading(false);
        return;
      }

      window.location.href = "/analyze";
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden grid-pattern opacity-50 dark:opacity-100">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl shadow-black/10 dark:shadow-black/40 p-8">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 mb-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary glow-blue">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {isSignUp
                ? "Sign up to start using Resume"
                : "Sign in to continue to Resume"}
              <span className="text-primary">AI</span>
            </p>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-11 rounded-xl border-border/60 hover:border-border hover:bg-accent transition-all"
              onClick={() => signIn("github", { callbackUrl: "/analyze" })}
            >
              <svg
                className="mr-2.5 h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full h-11 rounded-xl border-border/60 hover:border-border hover:bg-accent transition-all"
              onClick={() => signIn("google", { callbackUrl: "/analyze" })}
            >
              <svg className="mr-2.5 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 rounded-xl border border-border/60 bg-background px-4 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-11 rounded-xl border border-border/60 bg-background px-4 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full h-11 rounded-xl border border-border/60 bg-background px-4 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <Button
              className="w-full h-11 rounded-xl glow-blue transition-all"
              disabled={loading}
            >
              {loading
                ? isSignUp
                  ? "Creating account..."
                  : "Signing in..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-border/50">
            <p className="text-center text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
                className="text-primary hover:underline font-medium"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
