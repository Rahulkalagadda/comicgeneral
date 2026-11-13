"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ContinueReadingBannerProps {
  className?: string;
}

export function ContinueReadingBanner({ className = "" }: ContinueReadingBannerProps) {
  const [activeItem, setActiveItem] = useState<{
    id: string;
    title: string;
    currentPage: number;
    totalPages: number;
    type: "book" | "comic" | "podcast";
  } | null>(null);

  useEffect(() => {
    try {
      const book1Progress =
        localStorage.getItem("leadsphere_reading_progress_book-1") ||
        localStorage.getItem("antigravity_reading_progress_book-1");
      if (book1Progress) {
        const parsed = JSON.parse(book1Progress);
        setActiveItem({
          id: "book-1",
          title: "The Sovereign Strategist",
          currentPage: parsed.currentPage || 1,
          totalPages: parsed.totalPages || 384,
          type: "book",
        });
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-primary-token">
          Continue Reading or Watching
        </h2>

        {activeItem ? (
          /* Active in-progress card */
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-secondary/80 border border-theme/80 soft-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-secondary border border-theme shrink-0 p-1">
                <img
                  src="/images/mascot-elephant.jpg"
                  alt="Elephant reading companion"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B89555]">
                  In Progress • {activeItem.type.toUpperCase()}
                </span>
                <h3 className="font-heading font-bold text-base text-primary-token">
                  {activeItem.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-secondary-token">
                  <span>Page {activeItem.currentPage} of {activeItem.totalPages}</span>
                  <span>•</span>
                  <span>{Math.round((activeItem.currentPage / activeItem.totalPages) * 100)}% Complete</span>
                </div>
              </div>
            </div>

            <Link href={`/read/${activeItem.id}`}>
              <Button variant="primary" size="sm">
                <BookOpen className="w-4 h-4 mr-1.5" />
                Resume Reading
              </Button>
            </Link>
          </div>
        ) : (
          /* Empty state matching the user attached screenshot (input_file_0.png) */
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-secondary/80 border border-theme/80 soft-surface flex items-center gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 relative flex items-center justify-center">
              <img
                src="/images/mascot-elephant-avatar.png"
                alt="Elephant Mascot reading companion"
                className="w-full h-full object-contain filter drop-shadow-sm transition-transform hover:scale-105 duration-300"
              />
            </div>
            <p className="text-xs sm:text-sm text-secondary-token font-medium leading-relaxed">
              Nothing in progress yet. Open any free preview and your place will be kept here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
