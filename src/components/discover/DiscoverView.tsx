"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Compass,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Play,
  Pause,
  Star,
  Lock,
  Eye,
  Radio,
  Sliders,
  RotateCcw,
  RotateCw,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Zap,
  Layers,
  Film,
  Award,
} from "lucide-react";

export function DiscoverView() {
  // Trending Carousel filtering & scrolling
  const [activeFilter, setActiveFilter] = useState<"all" | "books" | "comics" | "audio">("all");
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Persistent Audio Dock state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(38); // 38%

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingAudio]);

  // Bento Audio player state
  const [isBentoAudioPlaying, setIsBentoAudioPlaying] = useState(false);

  // Tactile Reader Engine Demo Interactive State
  const [readerTheme, setReaderTheme] = useState<"warm-ivory" | "jungle-moss" | "obsidian-nocturne">("warm-ivory");
  const [readerTypeface, setReaderTypeface] = useState<"newsreader" | "jakarta" | "mono">("newsreader");
  const [readerFontSize, setReaderFontSize] = useState<number>(18); // 16 - 22

  // Trending items data
  const trendingItems = [
    {
      id: "forms-of-stillness",
      type: "books" as const,
      badge: "New Release",
      freeTag: "10-Page Free",
      category: "Architectural Theory",
      rating: "4.9 (830)",
      author: "Hiroshi Takahashi",
      title: "Forms of Stillness",
      description: "An exploration of quiet spaces, brutalist sanctuaries, and natural acoustics.",
      price: "₹749",
      coverUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBs_5vcfvt_-4fUvJ0aatHlq8ERdUUlHIl36rolsYr99vhcDsMSC-NieKUh1-fcAH5EsQnasFsytJSYjTFo9NohiD3JzhcNnNbslIq30ukyzPH0sFEEsHrWdjTPGZBMsi_YtyXDJ0GP9H5E57ul2XWWq_NTAuVWBDGaPZ3CBKKJ6QnbtmbpNrr7YUTCKS-8SnOvux5XK7sBODyG8Rk20zetOrme4zKx1xxtLe5KikiJe7OZkmvnSrzv",
      fallbackUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      href: "/books/book-1",
    },
    {
      id: "vortex-protocol",
      type: "comics" as const,
      badge: "Comic #04",
      freeTag: "Free Preview",
      category: "Graphic Novel",
      rating: "4.8 (1,920)",
      author: "Clara Oswald & Ren",
      title: "Vortex Protocol",
      description: "The neural underworld awakens beneath subterranean Neo-Geneva.",
      price: "₹299",
      coverUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCTUqdwN3hE5RVUnOjffuhZjsZPsKbEEMbfrRajF1FUU4sl9zOM0P0lxFrTDyqx6qcyVJIFrCL9M36cKdGAHluKHA8PKa3skEdEJQdsgvf2psYM9IOHHaxQccSGZhcDl53LLl_MxFwefDZ7V7utxBzDu3ajfUwZg5q3IXAw9MiBo057x3i4cwy9MT4heUrZLLQ985SaG7e71nZlx52u5xj2N0vNjpnfpiJxGI3WeOOUCAOl0XVapPtT",
      fallbackUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      href: "/comics/comic-1",
    },
    {
      id: "deep-sky-chronicles",
      type: "audio" as const,
      badge: "Video Series",
      freeTag: "Watch Ep 1",
      category: "Documentary",
      rating: "5.0 (420)",
      author: "Dr. Samira Khan",
      title: "The Deep Sky Chronicles",
      description: "Astrophysicists recount revelations from the outermost edge of the visible cosmos.",
      price: "₹549",
      coverUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDzVp7Vft60uSNd0mhQnBczHR9ErPG5DBxA1Znphz-JbI0AaxIj-w7RKdTkG6aPeJ1QgBiC0nBWlSibDj1RP0UKfn5-pYGh_YIFpHH5t1S40Rp5FIYTWxt_4TbJ8BCSS85mAOrYxYkKWgK0XuzIYsCWzLHKQhae86AQC0GPtV4L1yfdOEXiIUM1svJSScwQCcH8y7bYL7n0brdyTqIenbxIL-gpgJDbOrmxQcNkSqklSwOWwRlOlHml",
      fallbackUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      href: "/podcasts/podcast-1",
    },
    {
      id: "darjeeling-ledger",
      type: "books" as const,
      badge: "Staff Pick",
      freeTag: "10-Page Free",
      category: "Culinary History",
      rating: "4.94 (2,100)",
      author: "Anand Sen",
      title: "The Darjeeling Ledger",
      description: "Two centuries of mountain fog, copper kettles, and high-elevation terroir storytelling.",
      price: "₹429",
      coverUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD4K-ysSgawlsTxrUzaS-1cnmsMChStmI_4Sm4sW3VkiSQjiT9SmUrfV1hSO9lGwRhwCePRolTKbRYVG5M0S2UGdfYxdJzy8alUn1zuVPSX9408RkjoqS1FJnj7H2kHO9lLEmjY8cESooH4qDXG-r_yg1qEaCnauiwcIF1VNr_ohGkHbwoYW04WBwnUKacXEvi9lhqMPxzgFJzgF6UdexRfl7VXxgPEXscplXxzRQ2uV_rKWo9OYGpH",
      fallbackUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80",
      href: "/books/book-2",
    },
  ];

  const filteredItems =
    activeFilter === "all" ? trendingItems : trendingItems.filter((item) => item.type === activeFilter);

  return (
    <div className="w-full bg-[#f9f9fe] min-h-screen text-[#1a1c1f] antialiased selection:bg-[#584abd]/20 selection:text-[#584abd] pb-24">
      {/* ----------------------------------------------------
          HERO SECTION
          ---------------------------------------------------- */}
      <section className="relative w-full overflow-hidden pb-12 pt-6 lg:pt-10">
        {/* Ambient Tactile Diffuse Backdrops */}
        <div className="absolute top-6 left-1/4 w-96 h-96 rounded-full bg-[#584abd]/10 blur-[90px] pointer-events-none -z-10" />
        <div className="absolute top-28 right-12 w-80 h-80 rounded-full bg-[#b5eae0]/40 blur-[80px] pointer-events-none -z-10" />
        <div className="absolute -bottom-10 left-1/3 w-[32rem] h-64 rounded-full bg-[#efbe7d]/20 blur-[100px] pointer-events-none -z-10" />

        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Editorial Typography Stream */}
            <div className="lg:col-span-7 flex flex-col gap-5 z-10">
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#ededf3]/80 shadow-sm text-[#34675f] font-jakarta font-semibold text-xs tracking-wider">
                <Sparkles className="w-4 h-4 text-[#34675f]" />
                <span>CURATED LITERARY EDITORIAL • VOL. IX</span>
              </div>

              <h1 className="font-newsreader text-4xl sm:text-5xl lg:text-6xl text-[#1a1c1f] tracking-tight leading-[1.12]">
                Stories Worth <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#584abd]">Getting Lost In.</span>
              </h1>

              <p className="font-jakarta text-base sm:text-lg text-[#474553] max-w-xl leading-relaxed">
                Discover unforgettable books, immersive comics, and podcasts that stay with you. Thoughtfully edited,
                physical tactility brought to digital life.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#handpicked"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#584abd] text-white font-jakarta font-semibold text-sm shadow-lg hover:shadow-xl hover:bg-[#483ba6] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985]"
                >
                  <span>Explore Library</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#trending"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#1a1c1f] font-jakarta font-semibold text-sm shadow-md hover:bg-[#f3f3f8] transition-all duration-300 transform hover:-translate-y-0.5 border border-[#e2e2e7]"
                >
                  <Zap className="w-4 h-4 text-[#34675f]" />
                  <span>Discover What's New</span>
                </a>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg">
                <div className="flex flex-col p-3 rounded-xl bg-[#ededf3]/60 border border-[#e2e2e7] shadow-sm">
                  <span className="font-jakarta font-bold text-lg sm:text-xl text-[#1a1c1f]">14,800+</span>
                  <span className="font-jakarta text-xs text-[#787584]">Archival Volumes</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl bg-[#ededf3]/60 border border-[#e2e2e7] shadow-sm">
                  <span className="font-jakarta font-bold text-lg sm:text-xl text-[#34675f]">10 Pages</span>
                  <span className="font-jakarta text-xs text-[#787584]">Complimentary Preview</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl bg-[#ededf3]/60 border border-[#e2e2e7] shadow-sm">
                  <span className="font-jakarta font-bold text-lg sm:text-xl text-[#79551e]">4.92 / 5</span>
                  <span className="font-jakarta text-xs text-[#787584]">Critical Praise</span>
                </div>
              </div>
            </div>

            {/* Right Tactile Dimensional Stage */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] py-6">
              {/* Claymorphic Base Disk */}
              <div className="absolute w-[340px] sm:w-[380px] h-[340px] sm:h-[380px] rounded-full bg-gradient-to-tr from-[#e2e2e7] via-[#ededf3] to-white shadow-2xl opacity-90 transform -rotate-6" />

              {/* Central Floating 3D Hardcover Book Showcase */}
              <div className="relative z-20 w-64 h-96 rounded-2xl bg-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden flex flex-col group border border-[#e2e2e7]">
                <div className="relative w-full h-[72%] overflow-hidden bg-[#e2e2e7]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="The Glass Archipelago"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj9mj-SXKh1sy39SVaKDpa7MzXL3Fc3eHJHC4HR46Xxg6gTyx1lp0buAidIp3pnXL6JPfE_jEcf0IIPPzla4EPoV2LRKnuM_LAj2dnjQXwY_lpfEObrljqUZiGZmtp_onagAZuI_3avCuRzUwuyTN0myfuDBLx9LdciaQ25vBWsIXNnR8eVe4TIZbWnuvAgmo74eM8AKskjTSI-mHpMcYrNBoRJ4QvOn4_dWoo4YSNn7hobxX-iV-Y"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  {/* Spine Simulation */}
                  <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none" />
                  {/* Specular Foil Badge */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#1a1c1f] font-jakarta font-semibold text-[11px] shadow-sm">
                    Hardcover Ed.
                  </div>
                </div>

                <div className="flex-1 p-3.5 flex flex-col justify-between bg-white">
                  <div>
                    <p className="font-jakarta text-[11px] font-semibold text-[#584abd] uppercase tracking-wide">
                      Staff Pick • Monograph
                    </p>
                    <h3 className="font-jakarta font-bold text-sm text-[#1a1c1f] truncate mt-0.5">
                      The Glass Archipelago
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-jakarta font-bold text-base text-[#1a1c1f]">₹849</span>
                    <Link
                      href="/books/book-1/reader?preview=true"
                      className="px-2.5 py-0.5 rounded-full bg-[#b5eae0] text-[#194f48] font-jakarta font-semibold text-[11px] hover:bg-[#9cd1c7] transition-colors"
                    >
                      Free 10p Read
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Comic Card (Offset Upper Right) */}
              <div className="absolute -top-2 right-0 sm:right-4 z-30 w-44 rounded-xl bg-white p-2 shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300 border border-[#e2e2e7]">
                <div className="w-full h-28 rounded-lg overflow-hidden relative bg-[#e2e2e7]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Neon Chronology"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVbqMnqP8StcNHz0D3QtelBWx08GpoB9fs1Du7ZQi9CVQt0fq3zTAVeKJlJtn3yvAzalHcgct1eFzI44ZV6UtCkfzBYLsHfIJt-ZBfpSo4L-s2556CzL576liBli6yhAYMlha3nOaMmomDYBySVLcQm0peVJMcFJRnqBxg4LaDM0fpPChv8Rivpoa0V-Q8_5GZxMa2XiAlHnY1Zgnb7310BNT2eoDZ2yA9ReN6hrf3DZIwiUyHQIKw"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full bg-[#1a1c1f]/80 text-white font-jakarta text-[10px] font-semibold">
                    Graphic Vol. 1
                  </div>
                </div>
                <div className="p-1 pt-1.5">
                  <p className="font-jakarta font-semibold text-xs text-[#1a1c1f] truncate">Neon Chronology</p>
                  <div className="flex items-center justify-between text-[#34675f] font-jakarta text-[11px] mt-0.5">
                    <span>Free Prologue</span>
                    <BookOpen className="w-3.5 h-3.5 text-[#34675f]" />
                  </div>
                </div>
              </div>

              {/* Cinematic Podcast Floating Badge (Offset Lower Left) */}
              <div className="absolute -bottom-4 left-0 sm:left-4 z-30 rounded-2xl bg-white/95 backdrop-blur-md p-3 shadow-2xl flex items-center gap-3 max-w-[280px] transform -rotate-3 hover:rotate-0 transition-transform duration-300 border border-[#e2e2e7]">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-[#e2e2e7]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Conversations at Dusk"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW2YvKyjrYjXJeA1lE-kz6JdSVyN_IgrDtQ5jiz0M6HmxtJM3RbgAnv3X5ooO2pEGBaJzSi0SCNKTizpuRRPvcLw8RmRymXClScXWcJXD_nd2d8lhwxVbkGOPHWBELcDy6MqslIQ3CLkToD2oqogIbzV0xBxleQOMN-EjMgui2YQ1U8Yi9mWnnmGk_rrIrI8oIKR2OPcMYSg-QBPCGcJc9f4gz7Nt_lCjmbdIt9-EUFGKD-nwZ1HWG"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-[#584abd]/20 flex items-center justify-center">
                    <Radio className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[#34675f] font-jakarta font-semibold text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-[#34675f] animate-pulse" />
                    <span>Season Final</span>
                  </div>
                  <h4 className="font-jakarta font-bold text-xs text-[#1a1c1f] truncate">Conversations at Dusk</h4>
                  <p className="font-jakarta text-[11px] text-[#787584] truncate">Ep. 42 • 48 min stream</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 1: HANDPICKED FOR YOU (Bento Editorial Grid)
          ---------------------------------------------------- */}
      <section className="w-full py-16 bg-[#ededf3]/40 border-y border-[#e2e2e7]" id="handpicked">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-[#584abd] font-jakarta font-bold text-xs tracking-wider uppercase">
                <Star className="w-4 h-4 fill-current" />
                <span>CRITICS’ COMPENDIUM</span>
              </div>
              <h2 className="font-newsreader text-3xl sm:text-4xl text-[#1a1c1f]">Handpicked For You</h2>
              <p className="font-jakarta text-sm text-[#474553]">
                Exquisite narratives paired with unhurried audio essays and fine art graphic serials.
              </p>
            </div>
            <div className="flex items-center">
              <span className="font-jakarta text-xs text-[#474553] px-3.5 py-1.5 rounded-full bg-[#e2e2e7] font-medium">
                Instant 10-Page Preview Enabled
              </span>
            </div>
          </div>

          {/* Bento-style Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Large Primary Feature (8 Cols) */}
            <div className="lg:col-span-8 rounded-3xl bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 border border-[#e2e2e7]">
              <div className="md:w-5/12 h-72 md:h-auto rounded-2xl overflow-hidden relative shadow-inner flex-shrink-0 bg-[#e2e2e7]">
                <img
                  className="w-full h-full object-cover"
                  alt="The Labyrinth of Solitary Hours"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW2NrvxcUDtPuzC8aY85fq8_vxc3B33pxhPXgk72Y-BPsHfVq01QaXRXWRNrLnLIeFyXwnywOcchHh2Oibi2Jt6Qvny6XSRpjLWFq36BsDXieNJWgHNUZNXUbxw5TTXVbjedafQs5HuNrLXTd2yTD2tLP-nxg31xwy6dsnCiVJfh5jRG1yHHxUq2seUJg14XYbbvQ4lcu34lwO6QoDHopDsa34ebS20hdv-sg4Tfq3cr02Qf6rywH2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#34675f] text-white font-jakarta font-semibold text-xs shadow-md">
                  Editor of the Month
                </span>
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 flex items-center justify-between text-[#1a1c1f]">
                  <span className="font-jakarta text-xs font-semibold">10-Page Free Excerpt</span>
                  <ShieldCheck className="w-4 h-4 text-[#584abd]" />
                </div>
              </div>

              <div className="md:w-7/12 flex flex-col justify-between py-1">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ededf3] text-[#1a1c1f] font-jakarta text-xs font-medium">
                      Curated Monograph
                    </span>
                    <span className="text-[#79551e] font-jakarta text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" /> 4.96 (1,420 Reviews)
                    </span>
                  </div>

                  <h3 className="font-newsreader text-2xl sm:text-3xl text-[#1a1c1f]">
                    The Labyrinth of Solitary Hours
                  </h3>

                  <p className="font-jakarta text-xs text-[#787584] uppercase tracking-wider font-semibold">
                    By Elena Rostova • 412 Pages
                  </p>

                  <p className="font-jakarta text-sm text-[#474553] line-clamp-3 leading-relaxed">
                    A sweeping meditative meditation on silence, coastal lighthouses, and the forgotten cartographers
                    of the Northern Baltic archipelagos. Crafted for deep winter reading.
                  </p>

                  {/* Interactive audio teaser bar */}
                  <div className="p-3 rounded-xl bg-[#f9f9fe] border border-[#e2e2e7] flex items-center justify-between gap-3">
                    <button
                      onClick={() => setIsBentoAudioPlaying(!isBentoAudioPlaying)}
                      className="w-8 h-8 rounded-full bg-[#584abd] text-white flex items-center justify-center hover:bg-[#483ba6] transition-transform active:scale-95 flex-shrink-0 shadow-sm"
                      aria-label="Play sample"
                    >
                      {isBentoAudioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[11px] font-jakarta font-medium text-[#474553]">
                        <span className="truncate">Archipelago Overture Teaser</span>
                        <span className="text-[#584abd] font-semibold">FREE</span>
                      </div>
                      <div className="w-full bg-[#e2e2e7] h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="bg-[#584abd] h-full rounded-full transition-all duration-300"
                          style={{ width: isBentoAudioPlaying ? "65%" : "20%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#ededf3] flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="font-jakarta text-xs text-[#787584] block font-medium">Digital Collector Edition</span>
                    <span className="font-jakarta font-bold text-xl text-[#1a1c1f]">₹699</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/books/book-1/reader?preview=true"
                      className="px-4 py-2 rounded-full bg-[#ededf3] hover:bg-[#e2e2e7] text-[#1a1c1f] font-jakarta text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Read Free 10p</span>
                    </Link>
                    <Link
                      href="/checkout?type=book&id=book-1"
                      className="px-5 py-2 rounded-full bg-[#584abd] text-white font-jakarta text-xs font-semibold shadow-md hover:bg-[#483ba6] transition-all"
                    >
                      <span>Get Edition</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Card: Graphic Serial (4 Cols) */}
            <div className="lg:col-span-4 rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-[#e2e2e7]">
              <div className="flex flex-col gap-4">
                <div className="h-56 rounded-2xl overflow-hidden relative shadow-inner bg-[#e2e2e7]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Submerged Horizons"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZI-uxVt7ESJyFDkFdepLx76x2p5Voq7yM2l-hbzs6BxfJRPE2Z2uJIPxqTPjmuGhUyf0aYUgcSSujlH26Bl2t5daXa889Kp84X3hf1q_vRZsmMWppikOTzkOwX9fTa319FAAq4BHkaJ0naz_Ip06ET8sIj6mxvbdZ8iW3u2pltvV6klOwHgow3TDEibgwP9stOiqcQxEBM9mMAot1CU6-XwLgxuWEPsin8ruQHIWV-WTqrN_dEXHY"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1a1c1f] font-jakarta font-semibold text-xs shadow-sm">
                    Graphic Album • Free Preview
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-[#584abd] text-white font-jakarta font-semibold text-xs">
                    Issue #01
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-jakarta text-xs text-[#34675f] font-bold tracking-wide uppercase">
                    COMIC MASTERWORK
                  </span>
                  <h3 className="font-jakarta font-bold text-lg text-[#1a1c1f]">Submerged Horizons</h3>
                  <p className="font-jakarta text-xs text-[#787584]">Marcus Thorne • 88 Full-Color Plates</p>
                  <p className="font-jakarta text-xs text-[#474553] line-clamp-2 leading-relaxed mt-1">
                    A speculative graphic excursion into sunken architectures and ancient undersea radio frequencies.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#ededf3] flex items-center justify-between">
                <div>
                  <span className="font-jakarta text-xs text-[#787584] block font-medium">Single Volume</span>
                  <p className="font-jakarta font-bold text-lg text-[#1a1c1f]">₹349</p>
                </div>
                <Link
                  href="/comics/comic-1"
                  className="px-4 py-2 rounded-full bg-[#ededf3] hover:bg-[#e2e2e7] text-[#1a1c1f] font-jakarta text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>10 Free Pages</span>
                </Link>
              </div>
            </div>

            {/* Tertiary Card: Broadcast Series (6 Cols) */}
            <div className="lg:col-span-6 rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 border border-[#e2e2e7]">
              <div className="sm:w-1/2 h-48 sm:h-auto rounded-2xl overflow-hidden relative shadow-inner flex-shrink-0 bg-[#e2e2e7]">
                <img
                  className="w-full h-full object-cover"
                  alt="The Acoustics of Memory"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdH0S_iAPxIVGmsTg11b0ywvWnwRA3d0Z0_QqjZBYGVB6QFr2HQ0lK8JgbExLteTTYcf8I9D2vi40aVLtNYrbUtwQzie3ndHXPGKODs5sBCY8GDzXXbghfoBuLNU6eKQvNGPydPfEXpTsX8qqQrSp3A2Iisf0TK6iTppbbulCXDIeVZSN1OLC46-R5Jw-0jmSBK7d2mg8s6ej6N8hzk_GnxZAeSknxIsvyBvBBuvxlM-ljQUpqSUFI"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#ffddb3] text-[#614009] font-jakarta font-semibold text-xs">
                  Video • Audio Doc
                </div>
              </div>

              <div className="sm:w-1/2 flex flex-col justify-between py-1">
                <div className="flex flex-col gap-1.5">
                  <span className="font-jakarta text-xs text-[#584abd] font-bold tracking-wide uppercase">
                    PODCAST SPECIAL
                  </span>
                  <h4 className="font-jakarta font-bold text-base text-[#1a1c1f]">The Acoustics of Memory</h4>
                  <p className="font-jakarta text-xs text-[#787584]">Archival Sound Laboratory</p>
                  <p className="font-jakarta text-xs text-[#474553] line-clamp-2 leading-relaxed mt-1">
                    Documenting vanishing world dialects and acoustic archeology across six continents.
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#ededf3] flex items-center justify-between">
                  <div>
                    <span className="font-jakarta text-xs text-[#787584] block font-medium">Full 8 Episodes</span>
                    <p className="font-jakarta font-bold text-lg text-[#1a1c1f]">₹499</p>
                  </div>
                  <Link
                    href="/podcasts/podcast-1"
                    className="px-4 py-2 rounded-full bg-[#b5eae0] hover:bg-[#9cd1c7] text-[#194f48] font-jakarta text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Ep 1 Free</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quaternary Card: Essay Anthology (6 Cols) */}
            <div className="lg:col-span-6 rounded-3xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 border border-[#e2e2e7]">
              <div className="sm:w-1/2 h-48 sm:h-auto rounded-2xl overflow-hidden relative shadow-inner flex-shrink-0 bg-[#e2e2e7]">
                <img
                  className="w-full h-full object-cover"
                  alt="The Printed Senses"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0CxDI31HqujNjaEwu-_clPzPRT9W8yS8oX1-gMYlEEIssTarUol0oyuhTyXPAcsIbGJEplNQBxJZyb0lItYWnLxFRlsdo9iHCGIFNEUqbNAtHfi0Db4tWJujzEdDedIpdUjii7FOijca6OlJlcGA1OrxGgrwn0gWuAjDJuFPH-v3J3_2me9FvfxTcozXqPmuieHug2N7YXIlgtO8gmKb4w7z_cM9xySEse8raAs2ZhYDNP0SZjGYu"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1a1c1f] font-jakarta font-semibold text-xs shadow-sm">
                  Anthology Edition
                </span>
              </div>

              <div className="sm:w-1/2 flex flex-col justify-between py-1">
                <div className="flex flex-col gap-1.5">
                  <span className="font-jakarta text-xs text-[#34675f] font-bold tracking-wide uppercase">
                    ESSAYS & CRITICISM
                  </span>
                  <h4 className="font-jakarta font-bold text-base text-[#1a1c1f]">The Printed Senses</h4>
                  <p className="font-jakarta text-xs text-[#787584]">Edited by Julian Vane</p>
                  <p className="font-jakarta text-xs text-[#474553] line-clamp-2 leading-relaxed mt-1">
                    Twelve master designers dissect the tactile power of ink, cellulose, and modern digital typographies.
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#ededf3] flex items-center justify-between">
                  <div>
                    <span className="font-jakarta text-xs text-[#787584] block font-medium">Interactive Digital Book</span>
                    <p className="font-jakarta font-bold text-lg text-[#1a1c1f]">₹599</p>
                  </div>
                  <Link
                    href="/books/book-2/reader?preview=true"
                    className="px-4 py-2 rounded-full bg-[#ededf3] hover:bg-[#e2e2e7] text-[#1a1c1f] font-jakarta text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Free 10p</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 2: EXPLORE BY CATEGORY (Tactile 3-Pillar Cards)
          ---------------------------------------------------- */}
      <section className="w-full py-16">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="px-3.5 py-1.5 rounded-full bg-[#ededf3] text-[#34675f] font-jakarta font-semibold text-xs tracking-wider uppercase">
              THREE DISCIPLINARY STREAMS
            </span>
            <h2 className="font-newsreader text-3xl sm:text-4xl text-[#1a1c1f] mt-3">Explore by Category</h2>
            <p className="font-jakarta text-sm text-[#474553] mt-2">
              Engineered for leisurely absorption. Choose your medium and settle into pure focus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Books Card */}
            <div className="relative group rounded-3xl bg-white p-7 shadow-[4px_6px_20px_rgba(37,39,43,0.04),inset_1px_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[6px_12px_28px_rgba(37,39,43,0.08)] transition-all duration-300 flex flex-col justify-between border border-[#e2e2e7]">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#ededf3] shadow-inner flex items-center justify-center text-[#584abd] mb-5 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-7 h-7 text-[#584abd]" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-newsreader text-2xl text-[#1a1c1f]">Curated Books</h3>
                  <span className="font-jakarta text-xs px-2.5 py-0.5 rounded-full bg-[#ededf3] text-[#474553] font-semibold">
                    7,200 Titles
                  </span>
                </div>
                <p className="font-jakarta text-sm text-[#474553] mb-6 leading-relaxed">
                  Literary fiction, philosophy, architecture monographs, and essays typeset with uncompromising
                  typographic discipline.
                </p>
                <div className="space-y-2.5 mb-8">
                  <div className="flex items-center gap-2 text-[#1a1c1f] font-jakarta text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#34675f] flex-shrink-0" />
                    <span>Includes 10-page preview on every book</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#1a1c1f] font-jakarta text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#34675f] flex-shrink-0" />
                    <span>Custom serif typography & night mode</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#1a1c1f] font-jakarta text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#34675f] flex-shrink-0" />
                    <span>Offline DRM-free downloads</span>
                  </div>
                </div>
              </div>

              <Link
                href="/books"
                className="w-full py-3 px-4 rounded-full bg-[#ededf3] text-[#1a1c1f] font-jakarta font-semibold text-xs text-center hover:bg-[#e2e2e7] active:scale-[0.985] transition-all flex items-center justify-center gap-2"
              >
                <span>Browse Library Books</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Comics Card */}
            <div className="relative group rounded-3xl bg-white p-7 shadow-[4px_6px_20px_rgba(37,39,43,0.04),inset_1px_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[6px_12px_28px_rgba(37,39,43,0.08)] transition-all duration-300 flex flex-col justify-between border border-[#e2e2e7]">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#ededf3] shadow-inner flex items-center justify-center text-[#34675f] mb-5 group-hover:scale-105 transition-transform">
                  <Layers className="w-7 h-7 text-[#34675f]" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-newsreader text-2xl text-[#1a1c1f]">Graphic Comics</h3>
                  <span className="font-jakarta text-xs px-2.5 py-0.5 rounded-full bg-[#b5eae0] text-[#194f48] font-semibold">
                    3,400 Editions
                  </span>
                </div>
                <p className="font-jakarta text-sm text-[#474553] mb-6 leading-relaxed">
                  High-resolution graphic memoirs, indie science fiction, and sequential fine art with smooth guided
                  panel transitions.
                </p>
                <div className="space-y-2.5 mb-8">
                  <div className="flex items-center gap-2 text-[#1a1c1f] font-jakarta text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#34675f] flex-shrink-0" />
                    <span>High-DPI Retina plate rendering</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#1a1c1f] font-jakarta text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#34675f] flex-shrink-0" />
                    <span>Cinematic tap-to-focus panel zoom</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#1a1c1f] font-jakarta text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#34675f] flex-shrink-0" />
                    <span>First chapter always complimentary</span>
                  </div>
                </div>
              </div>

              <Link
                href="/comics"
                className="w-full py-3 px-4 rounded-full bg-[#ededf3] text-[#1a1c1f] font-jakarta font-semibold text-xs text-center hover:bg-[#e2e2e7] active:scale-[0.985] transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Graphic Serials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Podcasts Card */}
            <div className="relative group rounded-3xl bg-white p-7 shadow-[4px_6px_20px_rgba(37,39,43,0.04),inset_1px_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[6px_12px_28px_rgba(37,39,43,0.08)] transition-all duration-300 flex flex-col justify-between border border-[#e2e2e7]">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#ededf3] shadow-inner flex items-center justify-center text-[#79551e] mb-5 group-hover:scale-105 transition-transform">
                  <Film className="w-7 h-7 text-[#79551e]" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-newsreader text-2xl text-[#1a1c1f]">Video Podcasts</h3>
                  <span className="font-jakarta text-xs px-2.5 py-0.5 rounded-full bg-[#ffddb3] text-[#614009] font-semibold">
                    1,100 Hours
                  </span>
                </div>
                <p className="font-jakarta text-sm text-[#474553] mb-6 leading-relaxed">
                  Cinematic studio broadcasts, longform creator dialogs, and masterclass audio series filmed in 4K studio
                  clarity.
                </p>
                <div className="space-y-2.5 mb-8">
                  <div className="flex items-center gap-2 text-[#1a1c1f] font-jakarta text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#34675f] flex-shrink-0" />
                    <span>Background audio dock playback</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#1a1c1f] font-jakarta text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#34675f] flex-shrink-0" />
                    <span>Interactive synced transcriptions</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#1a1c1f] font-jakarta text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#34675f] flex-shrink-0" />
                    <span>Stream Episode 1 free of charge</span>
                  </div>
                </div>
              </div>

              <Link
                href="/podcasts"
                className="w-full py-3 px-4 rounded-full bg-[#ededf3] text-[#1a1c1f] font-jakarta font-semibold text-xs text-center hover:bg-[#e2e2e7] active:scale-[0.985] transition-all flex items-center justify-center gap-2"
              >
                <span>Listen & Stream</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 3: TRENDING & NEW RELEASES (Carousel Cards)
          ---------------------------------------------------- */}
      <section className="w-full py-16 bg-[#ededf3]/40 border-y border-[#e2e2e7]" id="trending">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1.5">
              <span className="text-[#584abd] font-jakarta font-bold text-xs uppercase tracking-wider">
                THIS WEEK IN REVIEW
              </span>
              <h2 className="font-newsreader text-3xl sm:text-4xl text-[#1a1c1f]">Trending & New Releases</h2>
            </div>

            {/* Carousel Filters & Navigation Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center p-1 rounded-full bg-[#e2e2e7] text-[#474553] font-jakarta text-xs">
                {(
                  [
                    { id: "all", label: "All Works" },
                    { id: "books", label: "Books Only" },
                    { id: "comics", label: "Comics" },
                    { id: "audio", label: "Audio" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3 py-1 rounded-full transition-all font-medium ${
                      activeFilter === tab.id
                        ? "bg-white text-[#1a1c1f] shadow-sm font-semibold"
                        : "hover:text-[#1a1c1f]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scrollCarousel("left")}
                  aria-label="Previous"
                  className="w-9 h-9 rounded-full bg-white shadow-sm hover:bg-[#ededf3] flex items-center justify-center text-[#1a1c1f] transition-colors border border-[#e2e2e7]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  aria-label="Next"
                  className="w-9 h-9 rounded-full bg-white shadow-sm hover:bg-[#ededf3] flex items-center justify-center text-[#1a1c1f] transition-colors border border-[#e2e2e7]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Scrolling Carousel Track */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="w-72 sm:w-80 flex-shrink-0 snap-start rounded-3xl bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-[#e2e2e7]"
              >
                <div>
                  <div className="relative h-72 rounded-2xl overflow-hidden shadow-inner mb-3 group bg-[#e2e2e7]">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={item.title}
                      src={item.coverUrl}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = item.fallbackUrl;
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#1a1c1f] font-jakarta font-semibold text-[11px] shadow-sm">
                      {item.badge}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#b5eae0] text-[#194f48] font-jakarta font-semibold text-[11px]">
                      {item.freeTag}
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center px-3 py-1.5 bg-[#1a1c1f]/80 backdrop-blur-sm rounded-xl text-white font-jakarta text-[11px]">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#efbe7d] text-[#efbe7d]" />
                        <span>{item.rating}</span>
                      </span>
                      <span>{item.category}</span>
                    </div>
                  </div>

                  <p className="font-jakarta text-xs text-[#584abd] font-medium">{item.author}</p>
                  <h4 className="font-jakarta font-bold text-base text-[#1a1c1f] truncate mt-0.5">{item.title}</h4>
                  <p className="font-jakarta text-xs text-[#474553] line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#ededf3] flex items-center justify-between">
                  <span className="font-jakarta font-bold text-base text-[#1a1c1f]">{item.price}</span>
                  <Link
                    href={item.href}
                    className="px-4 py-1.5 rounded-full bg-[#584abd] text-white font-jakarta font-semibold text-xs shadow hover:bg-[#483ba6] transition-colors"
                  >
                    Instant Access
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 4: HOW LEADSPHERE WORKS (3-Step Numbered Cards)
          ---------------------------------------------------- */}
      <section className="w-full py-16">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="px-3.5 py-1.5 rounded-full bg-[#b5eae0]/60 text-[#194f48] font-jakarta font-semibold text-xs tracking-wider uppercase">
              EFFORTLESS JOURNEY
            </span>
            <h2 className="font-newsreader text-3xl sm:text-4xl text-[#1a1c1f] mt-3">How LeadSphere Works</h2>
            <p className="font-jakarta text-sm text-[#474553] mt-2">
              A frictionless reading environment engineered without DRM lockouts or intrusive friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="rounded-3xl bg-white p-7 shadow-[4px_6px_20px_rgba(37,39,43,0.04),inset_1px_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between relative overflow-hidden border border-[#e2e2e7]">
              <span className="absolute -right-3 -top-5 font-newsreader text-8xl text-[#e2e2e7]/50 select-none font-bold">
                01
              </span>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#ededf3] shadow-inner flex items-center justify-center text-[#584abd] mb-5">
                  <Compass className="w-7 h-7 text-[#584abd]" />
                </div>
                <h3 className="font-newsreader text-2xl text-[#1a1c1f] mb-2">Discover</h3>
                <p className="font-jakarta text-sm text-[#474553] leading-relaxed">
                  Browse hand-curated monographs, independent comics, and broadcast podcasts reviewed by senior editors
                  and critics.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-[#ededf3] flex items-center gap-1.5 text-[#584abd] font-jakarta font-semibold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero sponsored clutter</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-3xl bg-white p-7 shadow-[4px_6px_20px_rgba(37,39,43,0.04),inset_1px_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between relative overflow-hidden border border-[#e2e2e7]">
              <span className="absolute -right-3 -top-5 font-newsreader text-8xl text-[#e2e2e7]/50 select-none font-bold">
                02
              </span>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#ededf3] shadow-inner flex items-center justify-center text-[#34675f] mb-5">
                  <BookOpen className="w-7 h-7 text-[#34675f]" />
                </div>
                <h3 className="font-newsreader text-2xl text-[#1a1c1f] mb-2">Preview 10 Pages Free</h3>
                <p className="font-jakarta text-sm text-[#474553] leading-relaxed">
                  Every single volume grants 10 uncompromised high-fidelity preview pages. Evaluate tone, typography, and
                  depth before committing.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-[#ededf3] flex items-center gap-1.5 text-[#34675f] font-jakarta font-semibold text-xs">
                <Eye className="w-4 h-4" />
                <span>No sign-up mandatory for previews</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-3xl bg-white p-7 shadow-[4px_6px_20px_rgba(37,39,43,0.04),inset_1px_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between relative overflow-hidden border border-[#e2e2e7]">
              <span className="absolute -right-3 -top-5 font-newsreader text-8xl text-[#e2e2e7]/50 select-none font-bold">
                03
              </span>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#ededf3] shadow-inner flex items-center justify-center text-[#79551e] mb-5">
                  <Lock className="w-7 h-7 text-[#79551e]" />
                </div>
                <h3 className="font-newsreader text-2xl text-[#1a1c1f] mb-2">Razorpay Instant Read</h3>
                <p className="font-jakarta text-sm text-[#474553] leading-relaxed">
                  Seamless one-click checkout via UPI, Cards, or NetBanking backed by Razorpay. Read instantly in-browser
                  or download offline.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-[#ededf3] flex items-center gap-1.5 text-[#79551e] font-jakarta font-semibold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>256-Bit Razorpay Direct Protocol</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 5: TACTILE READER ENGINE DEMONSTRATOR
          ---------------------------------------------------- */}
      <section className="w-full py-16 bg-[#ededf3]/50 border-t border-[#e2e2e7]">
        <div className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="rounded-3xl bg-white p-6 sm:p-8 lg:p-12 shadow-xl border border-[#e2e2e7]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Controls Column */}
              <div className="lg:col-span-6 flex flex-col gap-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ededf3] text-[#1a1c1f] font-jakarta font-semibold text-xs self-start">
                  <Sliders className="w-4 h-4 text-[#584abd]" />
                  <span>TACTILE READING ENGINE DEMO</span>
                </div>

                <h2 className="font-newsreader text-3xl sm:text-4xl text-[#1a1c1f]">Designed for Sensory Pleasure</h2>

                <p className="font-jakarta text-sm text-[#474553] leading-relaxed">
                  Experience reading that respects your circadian rhythm. Toggle tactile color profiles, adjust line
                  leading, and inspect our gentle neurotropic reader deck.
                </p>

                {/* Canvas Palette Picker */}
                <div className="flex flex-col gap-2 pt-2">
                  <label className="font-jakarta font-bold text-xs text-[#1a1c1f] tracking-wide uppercase">
                    SELECT CANVAS PALETTE
                  </label>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => setReaderTheme("warm-ivory")}
                      className={`px-4 py-2 rounded-full font-jakarta font-semibold text-xs flex items-center gap-2 transition-all ${
                        readerTheme === "warm-ivory"
                          ? "bg-[#ededf3] text-[#1a1c1f] ring-2 ring-[#584abd] shadow-inner"
                          : "bg-[#f9f9fe] text-[#787584] hover:text-[#1a1c1f] border border-[#e2e2e7]"
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-[#ffffff] border border-gray-300 shadow-sm" />
                      <span>Warm Ivory {readerTheme === "warm-ivory" ? "(Current)" : ""}</span>
                    </button>

                    <button
                      onClick={() => setReaderTheme("jungle-moss")}
                      className={`px-4 py-2 rounded-full font-jakarta font-semibold text-xs flex items-center gap-2 transition-all ${
                        readerTheme === "jungle-moss"
                          ? "bg-[#ededf3] text-[#1a1c1f] ring-2 ring-[#34675f] shadow-inner"
                          : "bg-[#f9f9fe] text-[#787584] hover:text-[#1a1c1f] border border-[#e2e2e7]"
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-[#194f48] shadow-sm" />
                      <span>Jungle Moss</span>
                    </button>

                    <button
                      onClick={() => setReaderTheme("obsidian-nocturne")}
                      className={`px-4 py-2 rounded-full font-jakarta font-semibold text-xs flex items-center gap-2 transition-all ${
                        readerTheme === "obsidian-nocturne"
                          ? "bg-[#ededf3] text-[#1a1c1f] ring-2 ring-[#1a1c1f] shadow-inner"
                          : "bg-[#f9f9fe] text-[#787584] hover:text-[#1a1c1f] border border-[#e2e2e7]"
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-[#1a1c1f] shadow-sm" />
                      <span>Obsidian Nocturne</span>
                    </button>
                  </div>
                </div>

                {/* Typeface & Font Scale Adjuster */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-jakarta text-xs text-[#787584] font-medium">TYPEFACE ENGINE</span>
                    <select
                      value={readerTypeface}
                      onChange={(e) => setReaderTypeface(e.target.value as any)}
                      className="p-3 bg-[#ededf3] rounded-xl text-[#1a1c1f] font-jakarta font-semibold text-xs border border-[#e2e2e7] outline-none cursor-pointer focus:ring-2 focus:ring-[#584abd]"
                    >
                      <option value="newsreader">Newsreader Antiqua (Serif)</option>
                      <option value="jakarta">Plus Jakarta Sans (Modern)</option>
                      <option value="mono">Editorial Monospace</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs text-[#787584] font-medium">
                      <span>TEXT SCALE & LEADING</span>
                      <span className="text-[#1a1c1f] font-semibold">{readerFontSize}px</span>
                    </div>
                    <div className="p-2.5 bg-[#ededf3] rounded-xl flex items-center gap-3 border border-[#e2e2e7]">
                      <span className="text-xs font-semibold text-[#787584]">A</span>
                      <input
                        type="range"
                        min="15"
                        max="22"
                        step="1"
                        value={readerFontSize}
                        onChange={(e) => setReaderFontSize(Number(e.target.value))}
                        className="w-full h-1.5 bg-[#e2e2e7] rounded-lg appearance-none cursor-pointer accent-[#584abd]"
                      />
                      <span className="text-base font-bold text-[#1a1c1f]">A</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reader Simulation Deck */}
              <div className="lg:col-span-6 rounded-2xl bg-[#ededf3] p-5 sm:p-6 shadow-inner border border-[#e2e2e7]">
                <div
                  className="rounded-2xl p-6 sm:p-8 shadow-md transition-all duration-300"
                  style={{
                    backgroundColor:
                      readerTheme === "warm-ivory"
                        ? "#ffffff"
                        : readerTheme === "jungle-moss"
                        ? "#194f48"
                        : "#1a1c1f",
                    color:
                      readerTheme === "warm-ivory"
                        ? "#1a1c1f"
                        : readerTheme === "jungle-moss"
                        ? "#f0fdf4"
                        : "#f3f4f6",
                  }}
                >
                  <div
                    className="flex items-center justify-between pb-3 border-b text-xs font-jakarta font-semibold tracking-wider"
                    style={{
                      borderColor:
                        readerTheme === "warm-ivory"
                          ? "#ededf3"
                          : readerTheme === "jungle-moss"
                          ? "rgba(255,255,255,0.15)"
                          : "rgba(255,255,255,0.1)",
                      color:
                        readerTheme === "warm-ivory"
                          ? "#787584"
                          : readerTheme === "jungle-moss"
                          ? "#a7f3d0"
                          : "#9ca3af",
                    }}
                  >
                    <span>CHAPTER III • THE COASTAL TOWER</span>
                    <span
                      className="flex items-center gap-1 font-bold"
                      style={{
                        color:
                          readerTheme === "warm-ivory"
                            ? "#584abd"
                            : readerTheme === "jungle-moss"
                            ? "#6ee7b7"
                            : "#c7bfff",
                      }}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" /> Page 48 of 412
                    </span>
                  </div>

                  <div
                    className="py-6"
                    style={{
                      fontFamily:
                        readerTypeface === "newsreader"
                          ? "'Newsreader', Georgia, serif"
                          : readerTypeface === "jakarta"
                          ? "'Plus Jakarta Sans', sans-serif"
                          : "monospace",
                    }}
                  >
                    <h3
                      className="text-2xl sm:text-3xl font-normal mb-3"
                      style={{
                        color:
                          readerTheme === "warm-ivory"
                            ? "#1a1c1f"
                            : readerTheme === "jungle-moss"
                            ? "#ffffff"
                            : "#ffffff",
                      }}
                    >
                      A Geometry of Rising Salt
                    </h3>
                    <p
                      className="italic leading-relaxed mb-4 opacity-95"
                      style={{
                        fontSize: `${readerFontSize + 2}px`,
                        lineHeight: "1.7",
                      }}
                    >
                      “We arrived when the low tide had carved shallow silver trenches into the shale. Nothing moved
                      save for three gray petrels tracing cold parabolas above the fog horns.”
                    </p>
                    <p
                      className="leading-relaxed opacity-85"
                      style={{
                        fontSize: `${readerFontSize}px`,
                        lineHeight: "1.7",
                      }}
                    >
                      The light through the western gallery was thick as unspooled linen. One could hear the clockwork
                      generator pulsing in the cellar, a steady subterranean heartbeat that had survived four changes of
                      dynasty.
                    </p>
                  </div>

                  <div
                    className="pt-3 border-t flex items-center justify-between font-jakarta text-xs"
                    style={{
                      borderColor:
                        readerTheme === "warm-ivory"
                          ? "#ededf3"
                          : readerTheme === "jungle-moss"
                          ? "rgba(255,255,255,0.15)"
                          : "rgba(255,255,255,0.1)",
                      color:
                        readerTheme === "warm-ivory"
                          ? "#787584"
                          : readerTheme === "jungle-moss"
                          ? "#a7f3d0"
                          : "#9ca3af",
                    }}
                  >
                    <span className="flex items-center gap-1.5">
                      <Headphones className="w-4 h-4 text-[#34675f]" />
                      <span>Audio sync ready (11 min remaining)</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#34675f]" />
                      <span>100% Calibrated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          PERSISTENT FLOATING TACTILE AUDIO DOCK
          ---------------------------------------------------- */}
      <div className="fixed bottom-6 left-0 right-0 z-40 px-4 pointer-events-none">
        <div className="max-w-[760px] mx-auto pointer-events-auto">
          <div className="rounded-full bg-white/95 backdrop-blur-xl p-2 px-5 shadow-[0_12px_28px_rgba(37,39,43,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] flex items-center justify-between gap-4 border border-[#e2e2e7]">
            {/* Track Thumbnail and Info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-sm relative bg-[#ededf3]">
                <img
                  className="w-full h-full object-cover"
                  alt="The Archipelago Diaries"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1IYltpOFSrqGK3-vDZcGAdQWfr-5Mdl5WK1oFnyDoNDgfhbyKccezz_7a6wqHI9EulJ02l9jso23ea_lU7uWpQrRiahV1EM8u2Tx6B_Dy391q0PUbIOm7U2FozGkc9DFjyva5ECLAF_WKtpL7MujoUWcPRxPESKyWGO82f1MAdVkgcXzz6tnY8W5kB21c31VF2by7bSIdALotW9IFP3l-N_ZBNPfEEsQd2tZTxahVcZoJAjg-d6Yv"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-[#584abd]/20 flex items-center justify-center">
                  <Volume2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-jakarta font-bold text-xs text-[#1a1c1f] truncate">
                    The Archipelago Diaries
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#b5eae0] text-[#194f48] text-[9px] font-bold">
                    EP 03
                  </span>
                </div>
                <span className="font-jakarta text-[11px] text-[#787584] truncate">
                  Reading by Julian Vane • 14:28 / 38:00
                </span>
              </div>
            </div>

            {/* Scrub Channel Simulation */}
            <div className="hidden sm:flex flex-1 items-center gap-2 max-w-xs mx-1">
              <span className="font-jakarta text-[11px] text-[#787584]">14:28</span>
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                  setAudioProgress(newProgress);
                }}
                className="flex-1 h-1.5 bg-[#e2e2e7] rounded-full overflow-hidden relative cursor-pointer shadow-inner"
              >
                <div
                  className="h-full bg-[#584abd] rounded-full transition-all duration-200"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              <span className="font-jakarta text-[11px] text-[#787584]">38:00</span>
            </div>

            {/* Physical Tactile Playback Buttons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => setAudioProgress((p) => Math.max(0, p - 5))}
                aria-label="Skip back 10 seconds"
                className="w-8 h-8 rounded-full bg-[#ededf3] hover:bg-[#e2e2e7] flex items-center justify-center text-[#1a1c1f] transition-all active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                aria-label="Play or pause audio"
                className="w-10 h-10 rounded-full bg-[#584abd] text-white flex items-center justify-center shadow-md hover:bg-[#483ba6] transition-all active:scale-95"
              >
                {isPlayingAudio ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>
              <button
                onClick={() => setAudioProgress((p) => Math.min(100, p + 5))}
                aria-label="Skip forward 30 seconds"
                className="w-8 h-8 rounded-full bg-[#ededf3] hover:bg-[#e2e2e7] flex items-center justify-center text-[#1a1c1f] transition-all active:scale-95"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
