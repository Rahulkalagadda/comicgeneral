"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/lib/theme/ThemeContext";
import { BookOpen, Compass, Feather } from "lucide-react";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  const { theme } = useTheme();

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group select-none text-left focus:outline-none ${className}`}
      aria-label="LeadSphere Digital Publishing - Return to Homepage"
    >
      <div
        className={`flex items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105 ${
          theme === "executive"
            ? "w-9 h-9 bg-[#203B53] text-[#F6F5F1] shadow-sm"
            : "w-9 h-9 bg-[#234735] text-[#FBFCF6] shadow-sm border border-[#7F9E68]/30"
        }`}
      >
        {theme === "executive" ? (
          <Feather className="w-5 h-5 text-[#B89555]" />
        ) : (
          <Compass className="w-5 h-5 text-[#BE9A56]" />
        )}
      </div>

      <div className="flex flex-col">
        <span className="font-heading font-bold tracking-tight text-primary-token leading-none text-base sm:text-lg">
          LEADSPHERE
        </span>
        <span className="text-[10px] tracking-wider uppercase text-muted-token font-medium leading-none mt-1">
          {theme === "executive" ? "Executive Folio • LeadSphere" : "Jungle Realm • LeadSphere"}
        </span>
      </div>
    </Link>
  );
}
