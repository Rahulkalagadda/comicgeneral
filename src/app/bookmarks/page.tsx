"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getBookmarks, toggleBookmark } from "@/lib/api/client";
import { BookmarkItem } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Bookmark, Trash2, ArrowRight } from "lucide-react";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookmarks()
      .then(setBookmarks)
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (item: BookmarkItem) => {
    await toggleBookmark(item);
    setBookmarks((prev) => prev.filter((b) => b.contentId !== item.contentId));
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-theme pb-4">
            <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
              Saved Collection
            </span>
            <h1 className="text-3xl font-bold font-heading text-primary-token mt-1">
              My Saved Bookmarks
            </h1>
            <p className="text-sm text-secondary-token mt-1">
              Curated reading list bookmarked for later review.
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 mx-auto border-2 border-brand border-t-transparent rounded-full animate-spin" />
            </div>
          ) : bookmarks.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-surface-secondary flex items-center justify-center text-accent-gold">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-primary-token">
                No saved bookmarks yet
              </h3>
              <p className="text-xs text-secondary-token max-w-sm mx-auto">
                Click the bookmark ribbon on any book or graphic novel card to save it to your reading list.
              </p>
              <Link href="/books">
                <Button variant="primary" size="sm">
                  Browse Catalog
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bookmarks.map((bmk) => (
                <div
                  key={bmk.id}
                  className="rounded-2xl border border-theme bg-surface-primary p-4 theme-card-shadow flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={bmk.coverUrl}
                      alt={bmk.title}
                      className="w-full aspect-[3/4] object-cover rounded-xl border border-theme mb-3"
                    />
                    <span className="text-[10px] uppercase font-bold text-accent-gold block">
                      {bmk.contentType}
                    </span>
                    <h3 className="font-bold text-sm text-primary-token line-clamp-2 mt-0.5">
                      {bmk.title}
                    </h3>
                    <p className="text-xs text-secondary-token mt-0.5">
                      By {bmk.creatorOrAuthor}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-theme-subtle flex items-center justify-between gap-2">
                    <Link
                      href={bmk.contentType === "book" ? `/read/${bmk.contentId}` : `/read/${bmk.contentId}`}
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        Open Preview
                      </Button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleRemove(bmk)}
                      className="p-2 rounded-lg text-secondary-token hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
