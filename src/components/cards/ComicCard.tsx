"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Comic } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { Bookmark, Eye, Sparkles } from "lucide-react";
import { toggleBookmark, isBookmarked } from "@/lib/api/client";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";

export interface ComicCardProps {
  comic: Comic;
  isOwned?: boolean;
}

export function ComicCard({ comic, isOwned = false }: ComicCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  React.useEffect(() => {
    isBookmarked(comic.id).then(setBookmarked).catch(() => {});
  }, [comic.id]);

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = await toggleBookmark({
      id: `bmk-${comic.id}`,
      contentId: comic.id,
      contentType: "comic",
      title: comic.title,
      creatorOrAuthor: comic.creator,
      coverUrl: comic.coverUrl,
      price: comic.price,
      savedAt: new Date().toISOString(),
    });
    setBookmarked(nextState);
  };

  return (
    <>
      <div className="group flex flex-col rounded-xl bg-surface-primary border border-theme/80 soft-surface overflow-hidden transition-all duration-200 hover:-translate-y-1">
        {/* Comic Artwork Container (Strict Aspect Ratio 3:4 with Spine Depth) */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-secondary/60 p-3 flex items-center justify-center">
          <div className="relative w-full h-full rounded-md overflow-hidden book-cover-3d bg-surface-secondary shadow-md">
            <img
              src={comic.coverUrl}
              alt={comic.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/10 pointer-events-none" />
          </div>

          <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start z-10">
            {comic.featured && (
              <Badge variant="gold" className="shadow-sm">
                <Sparkles className="w-3 h-3 mr-1" /> Featured
              </Badge>
            )}
            <Badge variant="green" className="shadow-sm text-[10px] font-medium tracking-wide">
              10 Pages Free
            </Badge>
          </div>

          {/* Tactile Neumorphic Bookmark Button */}
          <button
            type="button"
            onClick={handleBookmark}
            aria-label={bookmarked ? "Remove bookmark" : "Save bookmark"}
            className="absolute top-4 right-4 p-2 rounded-full nm-button bg-surface-primary/95 text-primary-token transition-all z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-token"
          >
            <Bookmark
              className={`w-3.5 h-3.5 transition-colors ${
                bookmarked ? "fill-accent-gold text-accent-gold" : "text-secondary-token group-hover:text-primary-token"
              }`}
            />
          </button>
        </div>

        {/* Content Details */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-muted-token mb-1.5">
              <span className="font-semibold text-brand-token uppercase tracking-wider text-[10px]">
                {comic.genre}
              </span>
              <span className="text-[11px] font-medium">{comic.pageCount} Pages</span>
            </div>

            <Link href={`/comics/${comic.slug}`} className="focus:outline-none block">
              <h3 className="font-heading font-bold text-base text-primary-token line-clamp-2 leading-snug group-hover:text-brand-token transition-colors">
                {comic.title}
              </h3>
            </Link>

            <p className="text-xs text-secondary-token mt-1">Story & Art by {comic.creator}</p>
          </div>

          <div className="pt-3.5 mt-3 border-t border-theme-subtle flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-muted-token block font-medium">
                Full Graphic Novel
              </span>
              <span className="font-heading font-bold text-base text-primary-token">
                {formatCurrency(comic.price)}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Link href={`/read/${comic.id}`}>
                <Button variant="secondary" size="sm" className="text-xs px-2.5">
                  <Eye className="w-3.5 h-3.5" />
                  Read Free
                </Button>
              </Link>
              {!isOwned && (
                <Button
                  variant="primary"
                  size="sm"
                  className="text-xs px-3"
                  onClick={() => setCheckoutOpen(true)}
                >
                  Unlock
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        item={{
          id: comic.id,
          title: comic.title,
          price: comic.price,
          type: "comic",
          coverUrl: comic.coverUrl,
        }}
      />
    </>
  );
}
