"use client";

import React from "react";
import { useTheme } from "@/lib/theme/ThemeContext";
import { BookOpen, Sparkles, Trees } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  className?: string;
  variant?: "pill" | "dropdown" | "compact";
}

export function ThemeSwitcher({ className = "", variant = "pill" }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={() => setTheme(theme === "executive" ? "jungle" : "executive")}
        className={cn(
          "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold nm-button transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-token",
          theme === "executive"
            ? "bg-surface-primary text-primary-token"
            : "bg-surface-primary text-[#234735]",
          className
        )}
        aria-label={`Current theme is ${theme}. Click to switch theme.`}
        title={`Switch to ${theme === "executive" ? "Jungle" : "Executive"} Theme`}
      >
        {theme === "executive" ? (
          <>
            <BookOpen className="w-3.5 h-3.5 text-[#203B53]" />
            <span className="tracking-wide">Executive</span>
          </>
        ) : (
          <>
            <Trees className="w-3.5 h-3.5 text-[#234735]" />
            <span className="tracking-wide">Jungle</span>
          </>
        )}
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Theme selector"
      className={cn(
        "inline-flex items-center p-1 rounded-full nm-inset-control bg-surface-secondary/80 select-none",
        className
      )}
    >
      <button
        type="button"
        id="theme-btn-executive"
        onClick={() => setTheme("executive")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-token",
          theme === "executive"
            ? "nm-button bg-surface-primary text-primary-token font-semibold shadow-sm"
            : "text-muted-token hover:text-primary-token font-medium opacity-80 hover:opacity-100"
        )}
        aria-pressed={theme === "executive"}
      >
        <BookOpen className="w-3.5 h-3.5 text-[#203B53]" />
        <span className="tracking-wide">Executive</span>
      </button>

      <button
        type="button"
        id="theme-btn-jungle"
        onClick={() => setTheme("jungle")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-token",
          theme === "jungle"
            ? "nm-button bg-[#234735] text-[#FBFCF6] font-semibold shadow-sm"
            : "text-muted-token hover:text-primary-token font-medium opacity-80 hover:opacity-100"
        )}
        aria-pressed={theme === "jungle"}
      >
        <Trees className="w-3.5 h-3.5 text-[#7F9E68]" />
        <span className="flex items-center gap-1 tracking-wide">
          Jungle
          <Sparkles className="w-2.5 h-2.5 text-[#BE9A56]" />
        </span>
      </button>
    </div>
  );
}
