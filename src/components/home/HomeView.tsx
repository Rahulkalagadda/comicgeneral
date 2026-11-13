"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/lib/theme/ThemeContext";
import { Book, Comic, PodcastSeries } from "@/types";
import { getCatalog } from "@/lib/api/client";
import { BookCard } from "@/components/cards/BookCard";
import { ComicCard } from "@/components/cards/ComicCard";
import { PodcastCard } from "@/components/cards/PodcastCard";
import { Button } from "@/components/ui/Button";
import {
  MascotMonkey,
  MascotLion,
  MascotElephant,
  MascotWolf,
} from "@/components/mascots/Mascots";
import { ContinueReadingBanner } from "./ContinueReadingBanner";
import {
  BookOpen,
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Film,
  CheckCircle2,
  Bookmark,
  Mail,
  Layers,
  ChevronRight,
  TreePine,
  Feather,
  Award,
  Play,
  Pause,
  Star,
  Lock,
  Eye,
  Radio,
  Clock,
  Palette,
} from "lucide-react";

export function HomeView() {
  const { theme, setTheme } = useTheme();
  const [catalog, setCatalog] = useState<{
    books: Book[];
    comics: Comic[];
    podcasts: PodcastSeries[];
  }>({ books: [], comics: [], podcasts: [] });

  // Hero Audio interaction state (Stitch Screen 10)
  const [isHeroPlaying, setIsHeroPlaying] = useState(false);
  const [heroAudioProgress, setHeroAudioProgress] = useState(38);

  // Audio snippet previews state (Voices & Dispatches)
  const [playingSnippet, setPlayingSnippet] = useState<string | null>(null);

  // Comics Carousel Scroll Ref
  const comicsTrackRef = useRef<HTMLDivElement>(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    getCatalog().then(setCatalog);
  }, []);

  // Audio teaser progress simulation
  useEffect(() => {
    let interval: any = null;
    if (isHeroPlaying) {
      interval = setInterval(() => {
        setHeroAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1.5));
      }, 300);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHeroPlaying]);

  const toggleHeroPlay = () => {
    setIsHeroPlaying(!isHeroPlaying);
  };

  const scrollComics = (direction: number) => {
    if (comicsTrackRef.current) {
      comicsTrackRef.current.scrollBy({ left: direction * 360, behavior: "smooth" });
    }
  };

  const toggleSnippet = (id: string) => {
    if (playingSnippet === id) {
      setPlayingSnippet(null);
    } else {
      setPlayingSnippet(id);
      setTimeout(() => {
        setPlayingSnippet((curr) => (curr === id ? null : curr));
      }, 5000);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* =========================================================================
          THEME DECIDER: EXECUTIVE THEME (EXACT STITCH SCREEN 10) VS JUNGLE THEME
          ========================================================================= */}

      {theme === "executive" ? (
        /* =======================================================================
           EXACT STITCH SCREEN 10: HOMEPAGE — PROFESSIONAL / EXECUTIVE THEME
           ======================================================================= */
        <div className="relative w-full overflow-hidden">
          {/* Subtle Editorial Ambient Background Accents */}
          <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-brand-token/5 blur-3xl pointer-events-none" />
          <div className="absolute top-96 right-10 w-[30rem] h-[30rem] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

          {/* 1. HERO SECTION (EXACT STITCH SCREEN 10) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-12 lg:pb-24 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Hero Text Column */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-surface-secondary border border-theme text-secondary-token text-[11px] font-bold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-brand-token animate-pulse" />
                  Beacon Fall 2025 Folio
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-editorial font-bold text-primary-token tracking-tight leading-[1.08] max-w-2xl">
                  Stories That <span className="italic font-normal text-brand-token">Reshape</span> Perspectives.
                </h1>

                <p className="text-base sm:text-lg text-secondary-token max-w-xl leading-relaxed">
                  Immerse yourself in award-winning literature, curated graphic novels, and masterclass audio series crafted by the world’s most observant minds.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Link
                    href="/books"
                    className="px-6 py-3 rounded-xl bg-[#584ABD] hover:bg-[#483BA6] text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 group"
                  >
                    <span>Explore Catalog</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="#curations"
                    className="px-6 py-3 rounded-xl bg-surface-secondary text-primary-token font-semibold text-sm border border-theme hover:bg-surface-primary transition-all flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-brand-token" />
                    <span>Browse Curations</span>
                  </a>

                  <div className="flex items-center gap-2 pl-2 text-secondary-token text-xs font-semibold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Archival Preservation Standard</span>
                  </div>
                </div>

                {/* Proof Stat Metrics (3 columns) */}
                <div className="grid grid-cols-3 gap-6 pt-6 max-w-lg border-t border-theme/60">
                  <div>
                    <p className="text-2xl sm:text-3xl font-serif-editorial font-bold text-primary-token">
                      1,400+
                    </p>
                    <p className="text-[10px] sm:text-[11px] font-bold text-secondary-token uppercase tracking-wider mt-0.5">
                      Unabridged Works
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-serif-editorial font-bold text-brand-token">
                      48
                    </p>
                    <p className="text-[10px] sm:text-[11px] font-bold text-secondary-token uppercase tracking-wider mt-0.5">
                      Pulitzer &amp; Booker Authors
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-serif-editorial font-bold text-emerald-700 dark:text-emerald-400">
                      100%
                    </p>
                    <p className="text-[10px] sm:text-[11px] font-bold text-secondary-token uppercase tracking-wider mt-0.5">
                      Typeset Craft
                    </p>
                  </div>
                </div>
              </div>

              {/* Hero Layered Visual Spotlight (Right) */}
              <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md">
                  {/* Back Decorative Sheet */}
                  <div className="absolute -inset-2 rounded-2xl bg-surface-secondary/80 rotate-2 translate-y-3 pointer-events-none border border-theme shadow-md" />

                  {/* Main Hero Featured Volume Card */}
                  <div className="relative rounded-2xl bg-surface-primary p-6 border border-theme shadow-xl transition-all hover:-translate-y-1">
                    <div className="flex items-center justify-between pb-3">
                      <span className="px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-[10px] uppercase tracking-wider border border-emerald-500/20">
                        Folio Spotlight
                      </span>
                      <span className="text-[11px] font-mono text-secondary-token">
                        Vol. XXVIII • Issue 04
                      </span>
                    </div>

                    {/* Book Cover Art */}
                    <div className="relative w-full h-72 rounded-xl overflow-hidden my-2 bg-surface-secondary shadow-inner border border-theme">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkR8_byCMZVmKTJTAkNMjiQOFWDKE6Hm6nh-uGMhnwKKOGDB5ir57A-CLv9iJojdEayvNDirjoTKESX7IA7IqU7SnmqgauwxWgVfiAZGOUXswcr_FmXTp7VY-MQOzCVtXLQMdNMtiquspCVTOgPrhbfbVvyqupN-RV-cCBz2PdxehVD9rw73iTJEIl9_JvWFob_QnP00XpoAcH8fkmRYtZkysONg9dZ7uY0G-O2MLrfvZXPuaunUoI"
                        alt="The Architecture of Silence book cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                        <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-neutral-900 text-[10px] font-bold uppercase tracking-wider shadow">
                          First 10 Pages Free
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-bold font-serif-editorial text-primary-token">
                            The Architecture of Silence
                          </h3>
                          <p className="text-xs text-secondary-token mt-0.5">
                            Elena Vasquez-Lowe • Essayistic Memoir
                          </p>
                        </div>
                        <span className="text-xl font-bold font-serif-editorial text-brand-token">
                          $24.00
                        </span>
                      </div>

                      {/* Tactile Audio Masterclass Teaser Widget */}
                      <div className="mt-4 p-3 rounded-xl bg-surface-secondary border border-theme flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={toggleHeroPlay}
                          aria-label={isHeroPlaying ? "Pause commentary" : "Play commentary"}
                          className="w-10 h-10 rounded-full bg-[#584ABD] hover:bg-[#483BA6] text-white flex items-center justify-center shadow hover:opacity-95 transition-all flex-shrink-0 cursor-pointer"
                        >
                          {isHeroPlaying ? (
                            <Pause className="w-5 h-5 fill-current text-white" />
                          ) : (
                            <Play className="w-5 h-5 fill-current ml-0.5 text-white" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-primary-token truncate">
                            Author Dispatches • Audio Commentary
                          </p>
                          <div className="w-full bg-surface-primary h-1.5 rounded-full mt-1.5 overflow-hidden border border-theme">
                            <div
                              className="bg-[#584ABD] h-full rounded-full transition-all duration-300"
                              style={{ width: `${heroAudioProgress}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-secondary-token flex-shrink-0">
                          12:44 left
                        </span>
                      </div>

                      <div className="pt-3 flex items-center gap-2">
                        <Link
                          href="/read/book-1"
                          className="flex-1 py-2 px-3 rounded-lg bg-surface-secondary hover:bg-surface-primary border border-theme text-xs font-semibold text-center text-primary-token transition-colors"
                        >
                          Read 10-Page Preview
                        </Link>
                        <Link
                          href="/checkout"
                          className="py-2 px-3 rounded-lg bg-[#584ABD] hover:bg-[#483BA6] text-white text-xs font-semibold text-center transition-colors shadow-sm"
                        >
                          Unlock Volume
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Continue Reading Banner for persistent reader momentum */}
          <ContinueReadingBanner />

          {/* 2. SECTION 1: EDITOR'S CHOICE (EXACT STITCH SCREEN 10) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-brand-token text-[11px] font-bold uppercase tracking-widest mb-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Curatorial Board Selection</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif-editorial font-bold text-primary-token tracking-tight">
                  Editor’s Choice
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-secondary-token">
                  Archived and typeset for optimal optical kerning
                </span>
                <Link
                  href="/books"
                  className="text-xs font-bold text-brand-token hover:underline flex items-center gap-0.5"
                >
                  <span>View All (42)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Book 1 */}
              <article className="group rounded-2xl bg-surface-primary p-4 border border-theme shadow-md flex flex-col justify-between transition-all hover:-translate-y-1">
                <div>
                  <div className="relative w-full h-64 rounded-xl overflow-hidden bg-surface-secondary mb-3 border border-theme">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL5kUM04TYZc1y5FJbyN89IbLRjtAqHVb5Uxt73MO_KC6r66rzS8bdjy1_0MBnpksjxvNf1u0BCJzLY3085cYrPFbnyyi4xZIX3QTkVBktO450--y4Jv9Bd-VUEJC4mSXhT0MA0aUSHimCRoXOPuK2jQZuAhPUWzmPjLte6Hk5ZsxscpJlT8N_ijbS1rMGal2N87gsGeavJauLxhTo-xfSAMUpEYumGAwRE25WE_4Vvr81yCc8Z05i"
                      alt="The Solitude of Geographers cover"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white/95 text-neutral-900 text-[10px] font-bold uppercase shadow-sm">
                      First 10 Pages Free
                    </span>
                    <button
                      type="button"
                      title="Save to reading list"
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-brand-token transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-surface-secondary border border-theme text-secondary-token text-[10px] font-bold uppercase">
                      Literary Fiction
                    </span>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-semibold text-primary-token ml-0.5">4.9</span>
                    </div>
                  </div>
                  <h3 className="font-serif-editorial font-bold text-base text-primary-token group-hover:text-brand-token transition-colors leading-snug">
                    The Solitude of Geographers
                  </h3>
                  <p className="text-xs text-secondary-token mt-0.5">Julian S. Croft</p>
                </div>
                <div className="pt-4 mt-3 flex items-center justify-between border-t border-theme/60">
                  <div>
                    <span className="font-serif-editorial font-bold text-sm text-primary-token">
                      $18.00
                    </span>
                    <span className="block text-[10px] text-secondary-token font-mono">
                      Hardcover / EPUB
                    </span>
                  </div>
                  <Link
                    href="/read/book-1"
                    className="px-3.5 py-1.5 rounded-lg bg-surface-secondary hover:bg-[#584ABD] hover:text-white hover:border-[#584ABD] text-primary-token font-semibold text-xs border border-theme transition-all"
                  >
                    Sample
                  </Link>
                </div>
              </article>

              {/* Book 2 */}
              <article className="group rounded-2xl bg-surface-primary p-4 border border-theme shadow-md flex flex-col justify-between transition-all hover:-translate-y-1">
                <div>
                  <div className="relative w-full h-64 rounded-xl overflow-hidden bg-surface-secondary mb-3 border border-theme">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTYF42iYzYv0YVPYMz4_0fNGPQFLwVN1Jwz__oP1aSMw8sJRxpZSj8eIE_0bWZfVqYSe7h9wI52iueKScpgc1MNWGoVtkyBQ84jmjMN15c5vI7LrSv5fNwYSiXltDV1Xsy7l2Z-7UWrC7G2ylb8KRG_QjReA2ELEo0HbizVcf5yq86IW8ZSbWhV9F9XsOxP4rjVgcRSU-ko1bo9cKpK2EjuMJlrbWQ84OloCNwTLZLqu1LCrJntrxa"
                      alt="In Defense of Drifting cover"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#584ABD] text-white text-[10px] font-bold uppercase shadow-sm">
                      Staff Pick
                    </span>
                    <button
                      type="button"
                      title="Save to reading list"
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-brand-token transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-surface-secondary border border-theme text-secondary-token text-[10px] font-bold uppercase">
                      Philosophy
                    </span>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-semibold text-primary-token ml-0.5">5.0</span>
                    </div>
                  </div>
                  <h3 className="font-serif-editorial font-bold text-base text-primary-token group-hover:text-brand-token transition-colors leading-snug">
                    In Defense of Drifting
                  </h3>
                  <p className="text-xs text-secondary-token mt-0.5">Prof. Clara M. Vance</p>
                </div>
                <div className="pt-4 mt-3 flex items-center justify-between border-t border-theme/60">
                  <div>
                    <span className="font-serif-editorial font-bold text-sm text-primary-token">
                      $22.50
                    </span>
                    <span className="block text-[10px] text-secondary-token font-mono">
                      Quarter-Cloth Bound
                    </span>
                  </div>
                  <Link
                    href="/read/book-2"
                    className="px-3.5 py-1.5 rounded-lg bg-surface-secondary hover:bg-[#584ABD] hover:text-white hover:border-[#584ABD] text-primary-token font-semibold text-xs border border-theme transition-all"
                  >
                    Sample
                  </Link>
                </div>
              </article>

              {/* Book 3 */}
              <article className="group rounded-2xl bg-surface-primary p-4 border border-theme shadow-md flex flex-col justify-between transition-all hover:-translate-y-1">
                <div>
                  <div className="relative w-full h-64 rounded-xl overflow-hidden bg-surface-secondary mb-3 border border-theme">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM5prcuTu9xR2eXprzCI0RSQ1jJCVWgQ4BRYJ7UitWqn53sVqfKWNBajmgy5feQ_naMA6ajBiws-c1PelWC_xiTsASM9taAiqkV1o_v9lWRzvXauKdXFHvkyEVNT9AYvbZAZeamH4QImlVZb05807QzjHdwWZTQ2sv6_6ILPQvzVTSV1fD7Q5zywByjTpYALLleBPje6jx8L2tQDORQL2lEgn6mR9Xe27O-DWaNSVNLjUBVOuL1lS"
                      alt="Cartography of an Echo cover"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white/95 text-neutral-900 text-[10px] font-bold uppercase shadow-sm">
                      First 10 Pages Free
                    </span>
                    <button
                      type="button"
                      title="Save to reading list"
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-brand-token transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-surface-secondary border border-theme text-secondary-token text-[10px] font-bold uppercase">
                      Memoir
                    </span>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-semibold text-primary-token ml-0.5">4.8</span>
                    </div>
                  </div>
                  <h3 className="font-serif-editorial font-bold text-base text-primary-token group-hover:text-brand-token transition-colors leading-snug">
                    Cartography of an Echo
                  </h3>
                  <p className="text-xs text-secondary-token mt-0.5">Tariq Al-Mansoor</p>
                </div>
                <div className="pt-4 mt-3 flex items-center justify-between border-t border-theme/60">
                  <div>
                    <span className="font-serif-editorial font-bold text-sm text-primary-token">
                      $19.00
                    </span>
                    <span className="block text-[10px] text-secondary-token font-mono">
                      Deckle Edge Paper
                    </span>
                  </div>
                  <Link
                    href="/read/book-1"
                    className="px-3.5 py-1.5 rounded-lg bg-surface-secondary hover:bg-[#584ABD] hover:text-white hover:border-[#584ABD] text-primary-token font-semibold text-xs border border-theme transition-all"
                  >
                    Sample
                  </Link>
                </div>
              </article>

              {/* Book 4 */}
              <article className="group rounded-2xl bg-surface-primary p-4 border border-theme shadow-md flex flex-col justify-between transition-all hover:-translate-y-1">
                <div>
                  <div className="relative w-full h-64 rounded-xl overflow-hidden bg-surface-secondary mb-3 border border-theme">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy-xzSHCKn6vUsB57le5rKjGxnWtlw7xa_wGOfmM9NxorABeMZhcJeYZ_0UYBDC1Sei6N9VN_OmEeeDgcUKdAF1FYdO5FFPbGEP2DGbt_761mkE_W6-VMDlmVChbS0OZL2OGbyD0IbX9QEQ-d6tx_k7K1S9JAEdf-ArdlRE_R9B1caDU44yPYB3WfKKztYoV6_llC8itJOVKSnyqFomZmhmDfpWCA8xnDioYwMBfaiyljWtJqlx8qq"
                      alt="The Glass Arboretum cover"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-surface-secondary text-secondary-token text-[10px] font-bold uppercase shadow-sm border border-theme">
                      Subscriber Vault
                    </span>
                    <button
                      type="button"
                      title="Save to reading list"
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-neutral-700 hover:text-brand-token transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-surface-secondary border border-theme text-secondary-token text-[10px] font-bold uppercase">
                      Speculative
                    </span>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-semibold text-primary-token ml-0.5">4.95</span>
                    </div>
                  </div>
                  <h3 className="font-serif-editorial font-bold text-base text-primary-token group-hover:text-brand-token transition-colors leading-snug">
                    The Glass Arboretum
                  </h3>
                  <p className="text-xs text-secondary-token mt-0.5">Helena Ødegård</p>
                </div>
                <div className="pt-4 mt-3 flex items-center justify-between border-t border-theme/60">
                  <div className="flex items-center gap-1.5 text-secondary-token">
                    <Lock className="w-3.5 h-3.5 text-secondary-token" />
                    <span className="font-serif-editorial font-bold text-sm text-secondary-token">
                      Locked
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    className="px-3.5 py-1.5 rounded-lg bg-[#584ABD] hover:bg-[#483BA6] text-white font-semibold text-xs transition-all shadow-sm"
                  >
                    Unlock
                  </Link>
                </div>
              </article>
            </div>
          </section>

          {/* 3. SECTION 2: GRAPHIC NOVELS & COMICS (EXACT STITCH SCREEN 10) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-widest mb-1.5">
                  <Palette className="w-4 h-4" />
                  <span>Graphic Narratives &amp; Sequential Art</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif-editorial font-bold text-primary-token tracking-tight">
                  Graphic Novels &amp; Comics
                </h2>
              </div>

              {/* Interactive Carousel Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous Comic"
                  onClick={() => scrollComics(-1)}
                  className="w-10 h-10 rounded-full bg-surface-secondary hover:bg-surface-primary border border-theme text-primary-token flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next Comic"
                  onClick={() => scrollComics(1)}
                  className="w-10 h-10 rounded-full bg-surface-secondary hover:bg-surface-primary border border-theme text-primary-token flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Comics Track */}
            <div
              ref={comicsTrackRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar"
              style={{ scrollbarWidth: "none" }}
            >
              {/* Comic 1 */}
              <div className="w-80 md:w-96 flex-shrink-0 snap-start rounded-2xl bg-surface-primary p-4 border border-theme shadow-md flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-80 rounded-xl overflow-hidden bg-surface-secondary mb-4 border border-theme">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhXyfY0wTSfa1kb72h5EnzdIPyZ53VxssKfqsLM6zIlxSlfbzlIUE9dwvXEom6d6MwdK14qNuDLi2EnrdOwmBIVAGxE2o2O6dxZpGcwMXrbSGoFq3-Zr6PLP3UzXc4ZzxyMckCrYVWgDjCfNTVWZgEkEdSaio8Hs6XeyYo74lWBhmztLU7UW-_dancqLcNOdMPa0_A-C-TF5CdQBvHxnCst-c7alTlFnRa9bOnzZW4SZFF0Ryt6mpr"
                      alt="The Iron Silt graphic novel"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider">
                      Preview Available • 8 Pgs
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm text-neutral-900 text-[10px] font-bold">
                      Full Color • 176 Pages
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-secondary-token text-[11px] font-mono mb-1">
                    <span>Chapter 1: The Descent</span>
                    <span>Serialized Edition</span>
                  </div>
                  <h3 className="font-serif-editorial font-bold text-xl text-primary-token">
                    The Iron Silt
                  </h3>
                  <p className="text-xs text-secondary-token mt-1">
                    Written &amp; Illustrated by Kaelen Thorne
                  </p>
                </div>
                <div className="pt-4 mt-3 flex items-center justify-between border-t border-theme/60">
                  <span className="font-serif-editorial font-bold text-lg text-primary-token">
                    $26.00
                  </span>
                  <Link
                    href="/read/book-1"
                    className="px-4 py-2 rounded-xl bg-surface-secondary hover:bg-emerald-700 hover:text-white text-primary-token font-semibold text-xs border border-theme transition-all flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open Reader</span>
                  </Link>
                </div>
              </div>

              {/* Comic 2 */}
              <div className="w-80 md:w-96 flex-shrink-0 snap-start rounded-2xl bg-surface-primary p-4 border border-theme shadow-md flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-80 rounded-xl overflow-hidden bg-surface-secondary mb-4 border border-theme">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmKHa4qAM7IEa0xtT2wVNt4__iiULK-mILtKsX_qdbYbNTUY_W2c5cwNMOOiQGOgBcvdV1DV5DCZUTrmUWrNKR8yaQymRUJohGnNkxYCXr20DgrSL-3XTzG7JdjTHEygB-nHu33Ye3to15IA2n_iq22VjX7fJ5ivU_vQsA8-uTZuRH1HWb0avT20Kc-uKoN6QugcJpmhjnwg1Eywdebu-vm0Ailz0Dg7stUouOz2LYWWChjFFaZQbE"
                      alt="Nocturne in Rust graphic novel"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#584ABD] text-white text-[10px] font-bold uppercase tracking-wider">
                      Preview Available • 12 Pgs
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm text-neutral-900 text-[10px] font-bold">
                      B&amp;W Inks • 210 Pages
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-secondary-token text-[11px] font-mono mb-1">
                    <span>Complete Omnibus</span>
                    <span>Nominee: Angoulême</span>
                  </div>
                  <h3 className="font-serif-editorial font-bold text-xl text-primary-token">
                    Nocturne in Rust
                  </h3>
                  <p className="text-xs text-secondary-token mt-1">Marion D’Amato</p>
                </div>
                <div className="pt-4 mt-3 flex items-center justify-between border-t border-theme/60">
                  <span className="font-serif-editorial font-bold text-lg text-primary-token">
                    $28.00
                  </span>
                  <Link
                    href="/read/book-2"
                    className="px-4 py-2 rounded-xl bg-surface-secondary hover:bg-[#584ABD] hover:text-white hover:border-[#584ABD] text-primary-token font-semibold text-xs border border-theme transition-all flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open Reader</span>
                  </Link>
                </div>
              </div>

              {/* Comic 3 */}
              <div className="w-80 md:w-96 flex-shrink-0 snap-start rounded-2xl bg-surface-primary p-4 border border-theme shadow-md flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-80 rounded-xl overflow-hidden bg-surface-secondary mb-4 border border-theme">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcyGHGLDNP6xOy-2Y5Be0W0qeYOicOyd349dBwaOFFS4v4pl1PgLT_Wy30tNtFAarpPme02e8Vu9ZLB28bmJT4hSc2LsEsc3c6-YwU1F-FwaTCwXQCJcIv0QHSE6tJ_RXY-ZIvgH_XU4Xjgr36H_CliUSrZgUePdIIZYbfWlqEAhiA9QenzDTGddxdiwwR5th07htrwPSLPiMXh5c7E9shAkXZohLYjsLxjrA_IyoqbIXQwKVDYYKE"
                      alt="The Quiet Observatory"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-white/90 backdrop-blur-sm text-neutral-900 text-[10px] font-bold uppercase tracking-wider">
                      Preview Available • 6 Pgs
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm text-neutral-900 text-[10px] font-bold">
                      Risograph Print • 96 Pages
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-secondary-token text-[11px] font-mono mb-1">
                    <span>Short Story Series</span>
                    <span>Hand-Numbered</span>
                  </div>
                  <h3 className="font-serif-editorial font-bold text-xl text-primary-token">
                    The Quiet Observatory
                  </h3>
                  <p className="text-xs text-secondary-token mt-1">Elias R. Vance &amp; S. Tanaka</p>
                </div>
                <div className="pt-4 mt-3 flex items-center justify-between border-t border-theme/60">
                  <span className="font-serif-editorial font-bold text-lg text-primary-token">
                    $16.50
                  </span>
                  <Link
                    href="/read/book-1"
                    className="px-4 py-2 rounded-xl bg-surface-secondary hover:bg-emerald-700 hover:text-white text-primary-token font-semibold text-xs border border-theme transition-all flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open Reader</span>
                  </Link>
                </div>
              </div>

              {/* Comic 4 */}
              <div className="w-80 md:w-96 flex-shrink-0 snap-start rounded-2xl bg-surface-primary p-4 border border-theme shadow-md flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-80 rounded-xl overflow-hidden bg-surface-secondary mb-4 border border-theme">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLdiS36bDDkinETtxjzc8IjwXE-KmcRzo8pnuRtVjSsZCWPWpfWv2hG_2VeElzP7XehwETFKbARc3Sb89GwkfBGNIqzHQoW1rsBBFC54OCgId4BiSFlkr3EiklQhZ3Q_Ij7AUCiZSausx8BXw-poPIAaxsJGNe5urXAY3D2mQmrHtg4eRm3L_RsSeG8n1xTuXL23-cDcX549QfdovBoGYYXHxOQXE_0Qix8RMQgoNz8uiQIVpI_sjI"
                      alt="Archipelago Zero"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider">
                      Free Prologue
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm text-neutral-900 text-[10px] font-bold">
                      Hardbound Deluxe • 320 Pgs
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-secondary-token text-[11px] font-mono mb-1">
                    <span>Epic Fantasy</span>
                    <span>Ignatz Award Winner</span>
                  </div>
                  <h3 className="font-serif-editorial font-bold text-xl text-primary-token">
                    Archipelago Zero
                  </h3>
                  <p className="text-xs text-secondary-token mt-1">Nadia Chen</p>
                </div>
                <div className="pt-4 mt-3 flex items-center justify-between border-t border-theme/60">
                  <span className="font-serif-editorial font-bold text-lg text-primary-token">
                    $34.00
                  </span>
                  <Link
                    href="/read/book-2"
                    className="px-4 py-2 rounded-xl bg-surface-secondary hover:bg-emerald-700 hover:text-white text-primary-token font-semibold text-xs border border-theme transition-all flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open Reader</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 4. SECTION 3: VOICES & DISPATCHES (EXACT STITCH SCREEN 10) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-brand-token text-[11px] font-bold uppercase tracking-widest mb-1.5">
                  <Radio className="w-4 h-4" />
                  <span>Uncut Literary Dialogues</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif-editorial font-bold text-primary-token tracking-tight">
                  Voices &amp; Dispatches
                </h2>
              </div>
              <p className="text-xs text-secondary-token max-w-sm">
                Audio recordings from intimate reading rooms, translator ateliers, and remote field expeditions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Episode 1 */}
              <div className="rounded-2xl bg-surface-primary p-6 border border-theme shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                      Free Episode 1
                    </span>
                    <span className="text-[11px] text-secondary-token flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" /> 48 mins
                    </span>
                  </div>
                  <h3 className="font-serif-editorial font-bold text-lg text-primary-token mb-2 leading-snug">
                    Ep. 42: The Geometry of Lost Dialects
                  </h3>
                  <p className="text-xs text-secondary-token mb-4 line-clamp-3 leading-relaxed">
                    Linguist Soren Kjeldsen and novelist Elena Vasquez-Lowe discuss how syntax alters the emotional memory of forgotten European borderlands.
                  </p>
                </div>
                <div className="pt-4 border-t border-theme/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSnippet("soren")}
                      className="w-9 h-9 rounded-full bg-[#584ABD] hover:bg-[#483BA6] text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                    >
                      {playingSnippet === "soren" ? (
                        <Pause className="w-4 h-4 fill-current text-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5 text-white" />
                      )}
                    </button>
                    <span className="text-xs font-semibold text-primary-token">
                      {playingSnippet === "soren" ? "Playing..." : "Play Preview"}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-secondary-token">Hi-Res Flac</span>
                </div>
              </div>

              {/* Episode 2 */}
              <div className="rounded-2xl bg-surface-primary p-6 border border-theme shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-secondary text-secondary-token text-[10px] font-bold uppercase tracking-wider border border-theme">
                      Subscriber Masterclass
                    </span>
                    <span className="text-[11px] text-secondary-token flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" /> 62 mins
                    </span>
                  </div>
                  <h3 className="font-serif-editorial font-bold text-lg text-primary-token mb-2 leading-snug">
                    Ep. 43: Hand-Set Metal Types in the Digital Void
                  </h3>
                  <p className="text-xs text-secondary-token mb-4 line-clamp-3 leading-relaxed">
                    Master typographer Tobias Frere explores why analog resistance and tactile paper weights are leading the avant-garde aesthetic renaissance.
                  </p>
                </div>
                <div className="pt-4 border-t border-theme/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSnippet("tobias")}
                      className="w-9 h-9 rounded-full bg-[#584ABD] hover:bg-[#483BA6] text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                    >
                      {playingSnippet === "tobias" ? (
                        <Pause className="w-4 h-4 fill-current text-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5 text-white" />
                      )}
                    </button>
                    <span className="text-xs font-semibold text-primary-token">
                      {playingSnippet === "tobias" ? "Playing..." : "Play Preview"}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-secondary-token">Colophon Audio</span>
                </div>
              </div>

              {/* Episode 3 */}
              <div className="rounded-2xl bg-surface-primary p-6 border border-theme shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                      Free Episode 1
                    </span>
                    <span className="text-[11px] text-secondary-token flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" /> 39 mins
                    </span>
                  </div>
                  <h3 className="font-serif-editorial font-bold text-lg text-primary-token mb-2 leading-snug">
                    Ep. 44: When Illustrators Dream in Woodcuts
                  </h3>
                  <p className="text-xs text-secondary-token mb-4 line-clamp-3 leading-relaxed">
                    A conversation with comic creator Kaelen Thorne on balancing heavy sequential ink textures with minimal negative space storytelling.
                  </p>
                </div>
                <div className="pt-4 border-t border-theme/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSnippet("kaelen")}
                      className="w-9 h-9 rounded-full bg-[#584ABD] hover:bg-[#483BA6] text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                    >
                      {playingSnippet === "kaelen" ? (
                        <Pause className="w-4 h-4 fill-current text-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5 text-white" />
                      )}
                    </button>
                    <span className="text-xs font-semibold text-primary-token">
                      {playingSnippet === "kaelen" ? "Playing..." : "Play Preview"}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-secondary-token">Studio Dispatch</span>
                </div>
              </div>
            </div>
          </section>

          {/* 5. SECTION 4: CURATED THEMATIC COLLECTIONS (EXACT STITCH SCREEN 10) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full" id="curations">
            <div className="mb-8">
              <span className="text-amber-600 dark:text-amber-400 text-[11px] font-bold uppercase tracking-widest block mb-1.5">
                Thematic Packages
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-editorial font-bold text-primary-token tracking-tight">
                Curated Collections
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Collection 1: Bento Big Card (2 Cols) */}
              <div className="lg:col-span-2 rounded-2xl bg-surface-secondary p-8 relative overflow-hidden flex flex-col justify-between border border-theme shadow-md">
                <div className="relative z-10 max-w-lg">
                  <span className="px-3 py-1 rounded-full bg-surface-primary border border-theme text-secondary-token text-[11px] font-bold uppercase tracking-wider">
                    Comprehensive Anthology • 6 Volumes
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-primary-token mt-3 mb-2 leading-tight">
                    The Architecture of Drift: Urban Nomads &amp; Topographies
                  </h3>
                  <p className="text-sm text-secondary-token leading-relaxed">
                    An exhaustive curriculum exploring wanderers, psycho-geography, and the philosophy of walking through historical capitals of the 20th century.
                  </p>
                </div>

                <div className="relative z-10 pt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/checkout"
                    className="px-6 py-2.5 rounded-xl bg-[#584ABD] hover:bg-[#483BA6] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
                  >
                    Access Anthology ($68.00)
                  </Link>
                  <span className="text-xs text-secondary-token">
                    Includes essays, archival maps &amp; audio walk
                  </span>
                </div>

                {/* Abstract Architectural SVG Illustration in Background */}
                <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none text-brand-token">
                  <svg fill="none" height="340" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 200 200" width="340">
                    <circle cx="100" cy="100" r="80" strokeDasharray="4 4" />
                    <circle cx="100" cy="100" r="50" />
                    <circle cx="100" cy="100" r="20" />
                    <line x1="20" x2="180" y1="100" y2="100" />
                    <line x1="100" x2="100" y1="20" y2="180" />
                    <path d="M40 40 L160 160" />
                    <path d="M40 160 L160 40" />
                  </svg>
                </div>
              </div>

              {/* Collection 2: Graphic Novel Folio (1 Col) */}
              <div className="rounded-2xl bg-surface-secondary p-8 relative overflow-hidden flex flex-col justify-between border border-theme shadow-md">
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-wider border border-emerald-500/20">
                    Graphic Novel Folio
                  </span>
                  <h3 className="text-2xl font-serif-editorial font-bold text-primary-token mt-3 mb-2 leading-tight">
                    Visions of the Submerged World
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary-token leading-relaxed">
                    Four breathtaking graphic novels united by oceanic folklore, lost bathyspheres, and the mystery of benthic ecosystems.
                  </p>
                </div>

                <div className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-secondary-token">4 Titles Bundled</span>
                    <span className="text-xl font-serif-editorial font-bold text-primary-token">
                      $54.00
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    className="w-full text-center block py-2.5 rounded-xl bg-surface-primary hover:bg-[#584ABD] hover:text-white hover:border-[#584ABD] text-primary-token font-semibold text-xs border border-theme transition-all"
                  >
                    Inspect Bundle
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 6. SECTION 5: JUNGLE MODE PROMPT BANNER (EXACT STITCH SCREEN 10) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <div className="rounded-2xl bg-gradient-to-r from-emerald-500/15 via-surface-secondary to-amber-500/10 p-8 sm:p-10 border border-theme shadow-md relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
                <div className="md:col-span-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-black/40 text-primary-token text-[11px] font-bold uppercase mb-2 border border-theme/60">
                    <TreePine className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dual-State Narrative Engine</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-primary-token">
                    Reading with young discoverers?
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary-token max-w-xl mt-1.5 leading-relaxed">
                    Switch anytime to <strong className="text-primary-token font-semibold">Jungle Mode</strong> for bouncy story cards, read-aloud animal companions (Monkey, Lion, Elephant, Wolf), and playful vocabulary quests.
                  </p>
                </div>

                <div className="md:col-span-4 flex md:justify-end items-center">
                  <button
                    type="button"
                    onClick={() => setTheme("jungle")}
                    className="px-6 py-3 rounded-full bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <TreePine className="w-4 h-4" />
                    <span>Switch to Jungle Mode</span>
                  </button>
                </div>
              </div>

              {/* Decorative Organic Waves */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none text-emerald-700">
                <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 200 200">
                  <path d="M0,100 C40,150 60,50 100,100 C140,150 160,50 200,100 L200,200 L0,200 Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* =======================================================================
           JUNGLE THEME (EXACT STITCH SCREEN 09 WITH 3D LIBRARY & 4 MASCOTS)
           ======================================================================= */
        <div className="space-y-16 sm:space-y-24">
          {/* Jungle Hero Section */}
          <section className="relative overflow-hidden pt-6 pb-16 sm:pt-10 sm:pb-24 border-b border-theme/80 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full nm-inset-control bg-surface-secondary text-xs font-bold text-[#234735]">
                      <Sparkles className="w-3.5 h-3.5 text-[#BE9A56]" />
                      <span className="tracking-wide">The Illustrated World of LeadSphere</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-[3.85rem] font-serif-editorial font-bold text-primary-token tracking-tight leading-[1.08]">
                      Enter a World of <br />
                      <span className="text-[#234735] italic">Stories.</span>
                    </h1>

                    <p className="text-base sm:text-lg text-secondary-token leading-relaxed max-w-xl mx-auto lg:mx-0">
                      A sanctuary for curious thinkers and young discoverers. Explore hand-curated books, graphic albums, and audio dialogues guided by tactile character companions.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                      <Link href="/discover">
                        <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                          <Compass className="w-4 h-4 mr-2" />
                          Explore the Jungle
                        </Button>
                      </Link>
                      <Link href="/library">
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                          <Bookmark className="w-4 h-4 mr-2" />
                          My Personal Library
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* 3D Jungle Library Scene */}
                  <div className="lg:col-span-6 flex justify-center">
                    <div className="relative w-full max-w-lg rounded-3xl overflow-hidden soft-surface border border-[#D7E1D1] shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                      <img
                        src="/images/jungle-library-hero.jpg"
                        alt="The LeadSphere Jungle Library: Regal Lion reading in armchair with scholar elephant and explorer monkey"
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-[#234735] text-white flex items-center justify-center shadow-lg border border-white/20">
                        <svg className="w-5 h-5 text-[#B6C8A6]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4-Mascot Guided Pavilion */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
                  <div className="p-5 rounded-2xl bg-surface-primary border border-theme/80 soft-surface flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1">
                    <MascotMonkey size={96} />
                    <h4 className="font-heading font-bold text-sm text-primary-token mt-3">
                      Curiosity &amp; Search
                    </h4>
                    <p className="text-[11px] text-secondary-token mt-1 leading-relaxed">
                      Guides exploratory discovery across hidden niches and secrets.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface-primary border border-theme/80 soft-surface flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1">
                    <MascotLion size={96} />
                    <h4 className="font-heading font-bold text-sm text-primary-token mt-3">
                      Leadership &amp; Vision
                    </h4>
                    <p className="text-[11px] text-secondary-token mt-1 leading-relaxed">
                      Highlights transformative executive strategy and bold masterclasses.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface-primary border border-theme/80 soft-surface flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1">
                    <MascotElephant size={96} />
                    <h4 className="font-heading font-bold text-sm text-primary-token mt-3">
                      Wisdom &amp; Curation
                    </h4>
                    <p className="text-[11px] text-secondary-token mt-1 leading-relaxed">
                      Preserves reading progress and curates foundational knowledge.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface-primary border border-theme/80 soft-surface flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1">
                    <MascotWolf size={96} />
                    <h4 className="font-heading font-bold text-sm text-primary-token mt-3">
                      Strategy &amp; Audio
                    </h4>
                    <p className="text-[11px] text-secondary-token mt-1 leading-relaxed">
                      Accompanies in-depth masterclasses with studio headphones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Continue Reading Banner */}
          <ContinueReadingBanner />

          {/* Jungle Section 2: The Story Clearing */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="story-clearing">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-theme/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-token" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B89555]">
                    The Story Clearing • Curated Treatises
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-primary-token mt-1">
                  Books from the Clearing
                </h2>
                <p className="text-xs sm:text-sm text-secondary-token mt-0.5">
                  Authoritative texts on strategy, capital allocation, and cognitive architecture.
                </p>
              </div>

              <Link href="/books">
                <Button variant="secondary" size="sm" className="self-start sm:self-auto">
                  View All Books ({catalog.books.length})
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {catalog.books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>

          {/* Jungle Section 3: Comic Canopy */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="comic-canopy">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-theme/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-accent-gold" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B89555]">
                    Comic Canopy • Graphic Novels
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-primary-token mt-1">
                  Stories of the Canopy
                </h2>
                <p className="text-xs sm:text-sm text-secondary-token mt-0.5">
                  Graphic chronicles illustrated with cinematic depth. First 10 pages completely open to preview.
                </p>
              </div>

              <Link href="/comics">
                <Button variant="secondary" size="sm" className="self-start sm:self-auto">
                  View All Comics ({catalog.comics.length})
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalog.comics.map((comic) => (
                <ComicCard key={comic.id} comic={comic} />
              ))}
            </div>
          </section>

          {/* Jungle Section 4: Voices from the Wild featuring Wolf */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="voices-from-the-wild">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-theme/80 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden soft-surface border border-theme/80 bg-surface-secondary/40 p-1 hidden sm:flex items-center justify-center">
                  <img
                    src="/images/mascot-wolf-transparent.png"
                    alt="Wolf Mascot with Headphones listening to masterclasses"
                    className="w-full h-full object-contain filter drop-shadow-sm transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Film className="w-5 h-5 text-brand-token" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B89555]">
                      Voices from the Wild • Masterclasses
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-primary-token mt-1">
                    Voices from the Wild
                  </h2>
                  <p className="text-xs sm:text-sm text-secondary-token mt-0.5">
                    Episode 1 of every series is complimentary in 4K video. Subsequent episodes purchased individually.
                  </p>
                </div>
              </div>

              <Link href="/podcasts">
                <Button variant="secondary" size="sm" className="self-start sm:self-auto">
                  View All Series ({catalog.podcasts.length})
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {catalog.podcasts.map((series) => (
                <PodcastCard key={series.id} series={series} />
              ))}
            </div>
          </section>

          {/* Jungle Section 5: Switch back to Executive Mode */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-surface-primary border border-[#D7E1D1] p-8 sm:p-10 soft-surface relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
                <div className="md:col-span-8 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6ECDD] text-[#234735] text-xs font-bold uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-[#BE9A56]" />
                    <span>Level 4 Trail Explorer • Reader's Treasure Chest</span>
                  </div>
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-primary-token">
                    Need a clean, distilled editorial desk for business strategy?
                  </h3>
                  <p className="text-sm text-secondary-token max-w-xl leading-relaxed">
                    Switch anytime to <strong className="text-primary-token font-semibold">Executive Mode</strong> for typographic focus, curatorial board selections, and institutional governance folios.
                  </p>
                </div>

                <div className="md:col-span-4 flex md:justify-end">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setTheme("executive")}
                    className="w-full sm:w-auto"
                  >
                    <Feather className="w-4 h-4 mr-2 text-[#B89555]" />
                    Switch to Executive Mode
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Jungle Section 6: Tailored Safari Feeds */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-surface-secondary/70 border border-theme/80 space-y-6 soft-surface">
              <div className="text-center max-w-xl mx-auto space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#B89555]">
                  Tailored Safari Feeds
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif-editorial font-bold text-primary-token">
                  Find Your Next Adventure
                </h2>
                <p className="text-xs sm:text-sm text-secondary-token">
                  Filter across treatises, graphic chronicles, and conversations by topic
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2.5 pt-2">
                {[
                  "Deep Wilds & Biology",
                  "Canopy Cartography",
                  "Ancient Forest Lore",
                  "Animal Companions",
                  "Explorer Chronicles",
                  "Cosmic Wilderness",
                ].map((topic) => (
                  <Link
                    key={topic}
                    href={`/search?q=${encodeURIComponent(topic)}`}
                    className="px-4 py-2 rounded-full nm-button bg-surface-primary text-xs font-semibold text-primary-token transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-token"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Global The LeadSphere Dispatch Newsletter */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-surface-primary border border-theme shadow-xl overflow-hidden soft-surface">
          {/* Editorial Decorative Background Watermark and Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-token/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-6 right-8 opacity-[0.03] dark:opacity-[0.05] pointer-events-none text-primary-token">
            <svg fill="none" height="260" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 200 200" width="260">
              <circle cx="100" cy="100" r="90" strokeDasharray="3 3" />
              <circle cx="100" cy="100" r="60" />
              <circle cx="100" cy="100" r="30" />
              <line x1="100" y1="10" x2="100" y2="190" />
              <line x1="10" y1="100" x2="190" y2="100" />
            </svg>
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Editorial Mandate, Form & Trust */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-secondary border border-theme text-secondary-token text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#584ABD] animate-pulse" />
                  <span>Weekly Executive Intelligence • Read by 28,000+ Leaders</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold text-primary-token tracking-tight leading-[1.12]">
                  The LeadSphere <span className="italic font-normal text-brand-token">Dispatch</span>.
                </h2>

                <p className="text-sm sm:text-base text-secondary-token leading-relaxed max-w-xl">
                  A curated Monday morning briefing for enterprise decision makers, institutional investors, and discerning minds. Every issue synthesizes newly typeset treatises, uncut atelier recordings with master thinkers, and early access previews.
                </p>

                {subscribed ? (
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span>Welcome to the LeadSphere Editorial Circle</span>
                    </div>
                    <p className="text-xs text-secondary-token leading-relaxed">
                      Your inaugural executive briefing and welcome monograph have been dispatched. You will receive Vol. 89 in your inbox next Monday morning at 06:00 EST.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3.5 pt-1">
                    <div className="flex flex-col sm:flex-row gap-2.5 p-1.5 rounded-2xl nm-inset-control bg-surface-secondary border border-theme">
                      <div className="relative flex-1 flex items-center">
                        <Mail className="w-4 h-4 text-secondary-token ml-3.5 absolute pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="Enter corporate email address..."
                          className="w-full pl-10 pr-4 py-3 bg-transparent text-xs sm:text-sm text-primary-token placeholder:text-secondary-token/60 focus:outline-none"
                        />
                      </div>
                      <Button
                        variant="primary"
                        type="submit"
                        className="sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                      >
                        <span>Subscribe to Folio</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Reader Promises / Guarantees */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-secondary-token pt-1">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Every Monday 06:00 EST</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-token" />
                        <span>Strict confidentiality • No spam</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#B89555]" />
                        <span>Single-click unsubscribe</span>
                      </div>
                    </div>
                  </form>
                )}

                {/* Subscriber social proof avatars */}
                <div className="pt-3 border-t border-theme/60 flex items-center gap-3">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-primary object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                      alt="Reader avatar"
                    />
                    <img
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-primary object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                      alt="Reader avatar"
                    />
                    <img
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-primary object-cover"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                      alt="Reader avatar"
                    />
                    <img
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-surface-primary object-cover"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                      alt="Reader avatar"
                    />
                  </div>
                  <p className="text-xs text-secondary-token">
                    Read by leaders at <strong className="text-primary-token font-semibold">McKinsey, Sequoia, Cambridge,</strong> and <strong className="text-primary-token font-semibold">DeepMind</strong>.
                  </p>
                </div>
              </div>

              {/* Right Column: Physical Folio Preview Card */}
              <div className="lg:col-span-5">
                <div className="p-6 sm:p-7 rounded-2xl bg-surface-secondary/70 border border-theme shadow-md soft-surface relative space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-theme/60">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-secondary-token">
                        Next Monday's Edition • Vol. 43
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-brand-token font-bold uppercase">
                      Archived Proof
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-surface-primary border border-theme/70 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase text-secondary-token">
                        <span className="text-brand-token">Executive Treatise</span>
                        <span>4 Min Read</span>
                      </div>
                      <h4 className="font-serif-editorial font-bold text-sm text-primary-token">
                        The Architecture of Silence: On Solitude &amp; Capital Clarity
                      </h4>
                      <p className="text-[11px] text-secondary-token line-clamp-2">
                        Key takeaways from Elena Vasquez-Lowe's monograph on institutional restraint and optical typesetting.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-primary border border-theme/70 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase text-secondary-token">
                        <span className="text-emerald-700 dark:text-emerald-400">Atelier Recording</span>
                        <span>14 Min Stem</span>
                      </div>
                      <h4 className="font-serif-editorial font-bold text-sm text-primary-token">
                        Tobias Frere on Analog Resistance in Digital Publishing
                      </h4>
                      <p className="text-[11px] text-secondary-token line-clamp-2">
                        High-resolution audio dispatch discussing metal hot-lead typography in an era of automated synthesis.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-primary border border-theme/70 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase text-secondary-token">
                        <span className="text-amber-600 dark:text-amber-400">Graphic Curations</span>
                        <span>8 Color Plates</span>
                      </div>
                      <h4 className="font-serif-editorial font-bold text-sm text-primary-token">
                        Exclusive Inks: The Iron Silt Chapter 1 Proofs
                      </h4>
                      <p className="text-[11px] text-secondary-token line-clamp-2">
                        Sequential lithographic proofs and artist sketchbook commentary before general release.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-theme/60 flex items-center justify-between text-[11px] text-secondary-token font-mono">
                    <span>Free for all readers</span>
                    <span className="font-bold text-primary-token">Delivered Mondays</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
