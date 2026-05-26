"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/user-menu";
import { cn } from "@/lib/utils";
import { Zap, Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/analyze", label: "Analyze" },
  { href: "/match", label: "Job Match" },
  { href: "/ats-check", label: "ATS Check" },
  { href: "/history", label: "History" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center px-4 mx-auto max-w-5xl">
        <Link href="/" className="flex items-center gap-2.5 mr-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary glow-blue">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-base hidden sm:inline tracking-tight">
            Resume<span className="text-primary">AI</span>
          </span>
        </Link>

        {session && (
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm px-3.5 py-2 rounded-lg transition-all duration-200",
                  pathname === link.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {session ? (
            <UserMenu />
          ) : (
            <Button
              size="sm"
              className="rounded-lg px-5 glow-blue"
              render={<Link href="/login" />}
            >
              Sign In
            </Button>
          )}

          {session && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      {mobileOpen && session && (
        <nav className="md:hidden border-t border-border/50 p-3 bg-background/95 backdrop-blur-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block text-sm px-4 py-2.5 rounded-lg transition-all duration-200",
                pathname === link.href
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
