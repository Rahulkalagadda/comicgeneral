"use client";

import React from "react";
import Link from "next/link";
import { PodcastSeries } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Film, PlayCircle, Sparkles } from "lucide-react";

export interface PodcastCardProps {
  series: PodcastSeries;
}

export function PodcastCard({ series }: PodcastCardProps) {
  const firstEpisode = series.episodes[0];

  return (
    <div className="group flex flex-col rounded-xl bg-surface-primary border border-theme/80 soft-surface overflow-hidden transition-all duration-200 hover:-translate-y-1">
      {/* Cinematic 16:9 Series Artwork Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-surface-secondary">
        <img
          src={series.coverUrl}
          alt={series.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Cinematic gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10">
          {series.featured && (
            <Badge variant="gold" className="shadow-sm">
              <Sparkles className="w-3 h-3 mr-1" /> Featured
            </Badge>
          )}
          <Badge variant="green" className="shadow-sm text-[10px] font-medium tracking-wide">
            Ep 1 Free Video
          </Badge>
        </div>

        {/* Hover tactile Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <div className="w-12 h-12 rounded-full nm-button bg-surface-primary/95 text-primary-token flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
            <PlayCircle className="w-6 h-6 text-brand-token" />
          </div>
        </div>

        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-semibold text-white flex items-center gap-1.5 z-10">
          <Film className="w-3 h-3 text-[#BE9A56]" />
          <span>{series.episodeCount} Masterclasses</span>
        </div>
      </div>

      {/* Series Metadata */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-token block mb-1">
            {series.category}
          </span>

          <Link href={`/podcasts/${series.slug}`} className="focus:outline-none block">
            <h3 className="font-heading font-bold text-base text-primary-token line-clamp-2 leading-snug group-hover:text-brand-token transition-colors">
              {series.title}
            </h3>
          </Link>

          <p className="text-xs text-secondary-token mt-1">Hosted by {series.host}</p>
          <p className="text-xs text-muted-token mt-2 line-clamp-2 leading-relaxed">
            {series.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-3.5 mt-3 border-t border-theme-subtle flex items-center justify-between gap-2">
          <span className="text-[11px] text-muted-token font-medium">
            Ep 1 Free • Series in 4K
          </span>

          <div className="flex items-center gap-1.5">
            {firstEpisode && (
              <Link href={`/episodes/${firstEpisode.id}`}>
                <Button variant="primary" size="sm" className="text-xs px-3">
                  <PlayCircle className="w-3.5 h-3.5" />
                  Watch Ep 1
                </Button>
              </Link>
            )}
            <Link href={`/podcasts/${series.slug}`}>
              <Button variant="secondary" size="sm" className="text-xs px-2.5">
                Series
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
