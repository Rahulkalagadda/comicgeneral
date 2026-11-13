"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PodcastSeries } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";
import { checkEntitlement } from "@/lib/api/client";
import {
  Film,
  PlayCircle,
  Lock,
  ArrowLeft,
  Clock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

interface PodcastDetailClientProps {
  series: PodcastSeries;
}

export function PodcastDetailClient({ series }: PodcastDetailClientProps) {
  const [ownedEpisodeIds, setOwnedEpisodeIds] = useState<Set<string>>(new Set());
  const [selectedEpisodeForCheckout, setSelectedEpisodeForCheckout] = useState<any>(null);

  useEffect(() => {
    Promise.all(series.episodes.map((ep) => checkEntitlement(ep.id))).then((results) => {
      const owned = new Set<string>();
      results.forEach((hasEnt, index) => {
        if (hasEnt) owned.add(series.episodes[index].id);
      });
      setOwnedEpisodeIds(owned);
    });
  }, [series.episodes]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Back Link */}
          <Link
            href="/podcasts"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary-token hover:text-primary-token"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Podcasts Catalog
          </Link>

          {/* Series Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-b border-theme/80 pb-10">
            <div className="lg:col-span-5 max-w-md mx-auto w-full">
              <div className="aspect-video rounded-2xl overflow-hidden border border-theme/80 shadow-2xl bg-surface-secondary">
                <img
                  src={series.coverUrl}
                  alt={series.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="green" className="text-[10px] font-medium tracking-wide">
                  Episode 1 Free For All
                </Badge>
                <Badge variant="gold" className="text-[10px] font-medium tracking-wide">
                  Individually Purchasable Episodes
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold text-primary-token leading-tight">
                {series.title}
              </h1>

              <p className="text-sm sm:text-base text-secondary-token">
                Hosted by <strong className="text-primary-token">{series.host}</strong> • {series.episodeCount} Masterclass Episodes
              </p>

              <p className="text-sm text-secondary-token leading-relaxed">
                {series.description}
              </p>

              <div className="p-4 rounded-xl bg-surface-secondary/70 border border-theme/80 soft-surface flex items-center gap-3 text-xs text-secondary-token">
                <ShieldCheck className="w-5 h-5 text-[#B89555] shrink-0" />
                <span className="leading-relaxed">
                  Watch Episode 1 immediately in your browser in 4K. Subsequent episodes require individual purchase with instant entitlement.
                </span>
              </div>
            </div>
          </div>

          {/* Episode List */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-primary-token">
              Episodes in this Masterclass Series
            </h2>

            <div className="space-y-4">
              {series.episodes.map((ep) => {
                const isOwned = ep.isFree || ownedEpisodeIds.has(ep.id);
                return (
                  <div
                    key={ep.id}
                    className="p-5 sm:p-6 rounded-2xl bg-surface-primary border border-theme/80 soft-surface flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="relative aspect-video w-36 sm:w-48 rounded-xl overflow-hidden bg-surface-secondary border border-theme shrink-0">
                        <img
                          src={ep.thumbnailUrl}
                          alt={ep.title}
                          className="w-full h-full object-cover"
                        />
                        {ep.isFree ? (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#32765A] text-white shadow-sm">
                            FREE
                          </span>
                        ) : !isOwned ? (
                          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] flex items-center justify-center">
                            <Lock className="w-6 h-6 text-white" />
                          </div>
                        ) : null}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-[#B89555]">
                            Episode {ep.episodeNumber}
                          </span>
                          <span className="text-muted-token flex items-center gap-1 font-medium">
                            <Clock className="w-3.5 h-3.5" /> {ep.duration}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-base sm:text-lg text-primary-token leading-snug">
                          {ep.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-secondary-token line-clamp-2 max-w-xl leading-relaxed">
                          {ep.description}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-theme">
                      {isOwned ? (
                        <Link href={`/episodes/${ep.id}`}>
                          <Button variant="primary" size="md">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Watch Episode
                          </Button>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="font-heading font-bold text-base text-primary-token">
                            {formatCurrency(ep.price)}
                          </span>
                          <Button
                            variant="primary"
                            size="md"
                            onClick={() => setSelectedEpisodeForCheckout(ep)}
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Unlock Ep {ep.episodeNumber}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />

      {selectedEpisodeForCheckout && (
        <CheckoutModal
          isOpen={true}
          onClose={() => setSelectedEpisodeForCheckout(null)}
          item={{
            id: selectedEpisodeForCheckout.id,
            title: selectedEpisodeForCheckout.title,
            price: selectedEpisodeForCheckout.price,
            type: "podcast_episode",
            coverUrl: selectedEpisodeForCheckout.thumbnailUrl,
          }}
          onSuccess={() => {
            setOwnedEpisodeIds((prev) => new Set([...prev, selectedEpisodeForCheckout.id]));
          }}
        />
      )}
    </>
  );
}
