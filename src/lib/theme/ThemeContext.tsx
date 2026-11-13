"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { ThemeMode } from "@/types";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "leadsphere_theme_mode";

export function ThemeProvider({
  children,
  initialTheme = "executive",
}: {
  children: React.ReactNode;
  initialTheme?: ThemeMode;
}) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = (localStorage.getItem(THEME_STORAGE_KEY) ||
          localStorage.getItem("antigravity_theme_mode")) as ThemeMode | null;
        if (stored === "executive" || stored === "jungle") {
          return stored;
        }
      } catch {
        // Safe fallback
      }
    }
    return initialTheme;
  });

  const [, startTransition] = useTransition();

  // Synchronize document attribute on change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    startTransition(() => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      } catch {
        // Safe fallback
      }
      document.documentElement.setAttribute("data-theme", newTheme);
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "executive" ? "jungle" : "executive");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
