"use client";

import React, { useState, useMemo } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SEED_BOOKS, SEED_COMICS, SEED_PODCASTS } from "@/lib/api/seedData";
import { BookCard } from "@/components/cards/BookCard";
import { ComicCard } from "@/components/cards/ComicCard";
import { PodcastCard } from "@/components/cards/PodcastCard";
import { Search, X, Sparkles, BookOpen, Layers, Film } from "lucide-react";
import { Book, Comic, PodcastSeries } from "@/types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [formatFilter, setFormatFilter] = useState<"all" | "book" | "comic" | "podcast">("all");

  const allItems = useMemo(() => {
    return [
      ...SEED_BOOKS,
      ...SEED_COMICS,
      ...SEED_PODCASTS,
    ];
  }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allItems.filter((item) => {
      const matchesFormat = formatFilter === "all" || item.type === formatFilter;
      if (!q) return matchesFormat;

      const titleMatch = item.title.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      const catMatch = item.category.toLowerCase().includes(q);
      const authorMatch = (item as any).author?.toLowerCase().includes(q);
      const creatorMatch = (item as any).creator?.toLowerCase().includes(q);
      const hostMatch = (item as any).host?.toLowerCase().includes(q);

      return (
        matchesFormat &&
        (titleMatch || descMatch || catMatch || authorMatch || creatorMatch || hostMatch)
      );
    });
  }, [allItems, query, formatFilter]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h1 className="text-3xl font-bold font-heading text-primary-token">
              Search Platform Catalog
            </h1>
            <p className="text-sm text-secondary-token mt-1">
              Find strategic executive volumes, graphic stories, and masterclass episodes.
            </p>
          </div>

          {/* Search Box */}
          <div className="p-4 rounded-2xl bg-surface-primary border border-theme shadow-sm space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-muted-token absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search across titles, creators, topics, or keywords..."
                className="w-full pl-12 pr-10 py-3 rounded-xl bg-surface-secondary border border-theme text-sm text-primary-token focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-token hover:text-primary-token"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto text-xs">
              {[
                { id: "all", label: "All Formats" },
                { id: "book", label: "Books", icon: BookOpen },
                { id: "comic", label: "Comics", icon: Layers },
                { id: "podcast", label: "Podcasts", icon: Film },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFormatFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    formatFilter === tab.id
                      ? "bg-brand text-white font-bold"
                      : "bg-surface-secondary text-secondary-token hover:text-primary-token"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Summary */}
          <div className="flex items-center justify-between text-xs text-secondary-token">
            <span>
              Found <strong>{results.length}</strong> title{results.length === 1 ? "" : "s"}
              {query && ` for "${query}"`}
            </span>
          </div>

          {/* Results Grid */}
          {results.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-surface-secondary flex items-center justify-center text-muted-token">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-primary-token">
                No matching titles found
              </h3>
              <p className="text-xs text-secondary-token max-w-sm mx-auto">
                Try searching for broader terms like &quot;Strategy&quot;, &quot;Noir&quot;, or &quot;CFO&quot;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map((item) => {
                if (item.type === "book") {
                  return <BookCard key={item.id} book={item as Book} />;
                } else if (item.type === "comic") {
                  return <ComicCard key={item.id} comic={item as Comic} />;
                } else {
                  return <PodcastCard key={item.id} series={item as PodcastSeries} />;
                }
              })}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
