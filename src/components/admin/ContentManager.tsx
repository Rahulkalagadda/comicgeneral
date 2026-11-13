"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Book, Comic, PodcastSeries } from "@/types";
import { getCatalog } from "@/lib/api/client";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  BookOpen,
  Layers,
  Film,
  PlusCircle,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  Trash2,
  Sparkles,
  Lock,
} from "lucide-react";

export function ContentManager() {
  const [filterType, setFilterType] = useState<"all" | "book" | "comic" | "podcast">("all");
  const [catalog, setCatalog] = useState<{
    books: Book[];
    comics: Comic[];
    podcasts: PodcastSeries[];
  }>({ books: [], comics: [], podcasts: [] });
  const [loading, setLoading] = useState(true);

  // New Content Form State
  const [isCreating, setIsCreating] = useState(false);
  const [contentType, setContentType] = useState<"book" | "comic" | "podcast">("book");
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [category, setCategory] = useState("Business Strategy");
  const [price, setPrice] = useState(1499);
  const [previewLimit, setPreviewLimit] = useState(10);
  const [pageCount, setPageCount] = useState(250);
  const [description, setDescription] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    getCatalog()
      .then(setCatalog)
      .finally(() => setLoading(false));
  }, []);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadSuccess(true);
    setTimeout(() => {
      if (contentType === "book") {
        const newBook: Book = {
          id: `book-${Date.now()}`,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          type: "book",
          title,
          author: creator,
          category,
          price,
          pageCount,
          previewPageLimit: previewLimit,
          coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
          description,
          tags: ["New Release", category],
          publishedAt: new Date().toISOString().split("T")[0],
          featured: true,
          isNew: true,
        };
        setCatalog((prev) => ({ ...prev, books: [newBook, ...prev.books] }));
      } else if (contentType === "comic") {
        const newComic: Comic = {
          id: `comic-${Date.now()}`,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          type: "comic",
          title,
          creator,
          genre: category,
          category,
          price,
          pageCount,
          previewPageLimit: previewLimit,
          coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
          description,
          publishedAt: new Date().toISOString().split("T")[0],
          featured: true,
          isNew: true,
        };
        setCatalog((prev) => ({ ...prev, comics: [newComic, ...prev.comics] }));
      }
      setIsCreating(false);
      setUploadSuccess(false);
      // Reset form
      setTitle("");
      setCreator("");
      setDescription("");
    }, 1000);
  };

  const allItems = [
    ...catalog.books.map((b) => ({ ...b, creatorOrHost: b.author })),
    ...catalog.comics.map((c) => ({ ...c, creatorOrHost: c.creator })),
    ...catalog.podcasts.map((p) => ({ ...p, creatorOrHost: p.host, pageCount: `${p.episodeCount} eps` })),
  ].filter((item) => filterType === "all" || item.type === filterType);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#18232F]">
            Content Catalog Management
          </h1>
          <p className="text-xs sm:text-sm text-[#68717D] mt-1">
            Configure metadata, upload page assets, and set the strict 10-page preview rules.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsCreating(!isCreating)}
          className="bg-[#203B53] text-white"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          {isCreating ? "Close Form" : "Upload New Content"}
        </Button>
      </div>

      {/* CREATE NEW CONTENT WIZARD */}
      {isCreating && (
        <form
          onSubmit={handleCreateSubmit}
          className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E4E2DA] shadow-lg space-y-6 animate-in fade-in duration-200"
        >
          <div className="border-b border-[#E4E2DA] pb-4">
            <h2 className="text-lg font-bold font-heading text-[#18232F]">
              Publish New Digital Title
            </h2>
            <p className="text-xs text-[#68717D]">
              Directly upload high-resolution page assets or podcast video masters with backend verification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Content Type Picker */}
            <div>
              <label className="text-xs font-semibold text-[#18232F] block mb-2">
                Content Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "book", label: "Book", icon: BookOpen },
                  { id: "comic", label: "Comic", icon: Layers },
                  { id: "podcast", label: "Podcast", icon: Film },
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setContentType(t.id as any)}
                      className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                        contentType === t.id
                          ? "border-[#203B53] bg-[#203B53] text-white"
                          : "border-[#E4E2DA] bg-[#F6F5F1] text-[#68717D] hover:bg-[#EFEEE8]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-xs font-semibold text-[#18232F] block mb-1.5">
                Title / Series Name
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Strategic Boardroom: 2026 Edition"
                className="w-full px-3 py-2 rounded-lg border border-[#E4E2DA] bg-[#F6F5F1] text-xs text-[#18232F] focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
              />
            </div>

            {/* Author / Creator */}
            <div>
              <label className="text-xs font-semibold text-[#18232F] block mb-1.5">
                Author / Illustrator / Host
              </label>
              <input
                type="text"
                required
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                placeholder="e.g. Richard Kingsley & Team"
                className="w-full px-3 py-2 rounded-lg border border-[#E4E2DA] bg-[#F6F5F1] text-xs text-[#18232F] focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-[#18232F] block mb-1.5">
                Category / Genre
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E4E2DA] bg-[#F6F5F1] text-xs text-[#18232F] focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-xs font-semibold text-[#18232F] block mb-1.5">
                Full Unlock Price (INR)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[#E4E2DA] bg-[#F6F5F1] text-xs text-[#18232F] focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
              />
            </div>

            {/* Page Count */}
            <div>
              <label className="text-xs font-semibold text-[#18232F] block mb-1.5">
                Total Pages
              </label>
              <input
                type="number"
                value={pageCount}
                onChange={(e) => setPageCount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[#E4E2DA] bg-[#F6F5F1] text-xs text-[#18232F] focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
              />
            </div>

            {/* Preview Page Limit (Strict rule) */}
            <div>
              <label className="text-xs font-semibold text-[#18232F] block mb-1.5 flex items-center justify-between">
                <span>Free Preview Boundary</span>
                <span className="text-[10px] text-[#32765A] font-bold">Standard: 10 Pages</span>
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={previewLimit}
                onChange={(e) => setPreviewLimit(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[#E4E2DA] bg-[#F6F5F1] text-xs text-[#18232F] focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
              />
            </div>
          </div>

          {/* Asset Dropzone */}
          <div>
            <label className="text-xs font-semibold text-[#18232F] block mb-1.5">
              Encrypted Page Asset Zip / PDF
            </label>
            <div className="border-2 border-dashed border-[#E4E2DA] hover:border-[#203B53] rounded-xl p-8 text-center bg-[#F6F5F1]/50 cursor-pointer transition-colors">
              <UploadCloud className="w-8 h-8 text-[#B89555] mx-auto mb-2" />
              <p className="text-xs font-semibold text-[#18232F]">
                Drag and drop high-resolution page bundle or click to browse
              </p>
              <p className="text-[11px] text-[#68717D] mt-1">
                Pages 1 through 10 will be served for public preview. Page 11+ is encrypted for verified entitlement holders.
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-[#18232F] block mb-1.5">
              Editorial Overview & Executive Abstract
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a comprehensive synopsis for executive readers..."
              className="w-full px-3 py-2 rounded-lg border border-[#E4E2DA] bg-[#F6F5F1] text-xs text-[#18232F] focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E4E2DA]">
            <Button variant="outline" type="button" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={uploadSuccess}>
              Publish Title to Catalog
            </Button>
          </div>
        </form>
      )}

      {/* FILTER TABS & CATALOG LIST */}
      <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4E2DA] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E2DA] pb-4">
          <div className="flex items-center gap-2">
            {[
              { id: "all", label: "All Formats" },
              { id: "book", label: "Books" },
              { id: "comic", label: "Graphic Stories" },
              { id: "podcast", label: "Podcasts" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  filterType === tab.id
                    ? "bg-[#203B53] text-white"
                    : "text-[#68717D] hover:bg-[#EFEEE8]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#68717D]">
            Showing <strong>{allItems.length}</strong> published titles
          </span>
        </div>

        {/* Catalog Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E4E2DA] text-[#8A929C] uppercase font-semibold">
                <th className="py-3 px-3">Cover</th>
                <th className="py-3 px-3">Title & Format</th>
                <th className="py-3 px-3">Author / Host</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Pages / Eps</th>
                <th className="py-3 px-3">Preview Policy</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E2DA]">
              {allItems.map((item: any) => (
                <tr key={item.id} className="hover:bg-[#F6F5F1] transition-colors">
                  <td className="py-3 px-3">
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      className="w-10 h-12 object-cover rounded border border-[#E4E2DA]"
                    />
                  </td>
                  <td className="py-3 px-3 max-w-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B89555] block">
                      {item.type}
                    </span>
                    <p className="font-semibold text-[#18232F] truncate">{item.title}</p>
                  </td>
                  <td className="py-3 px-3 text-[#68717D]">{item.creatorOrHost}</td>
                  <td className="py-3 px-3 font-bold font-heading text-[#18232F]">
                    {item.price ? formatCurrency(item.price) : "Variable / Ep"}
                  </td>
                  <td className="py-3 px-3 text-[#68717D]">{item.pageCount || "N/A"}</td>
                  <td className="py-3 px-3">
                    {item.type === "podcast" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#32765A]">
                        <CheckCircle2 className="w-3 h-3" /> Ep 1 Free
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#32765A]">
                        <Lock className="w-3 h-3" /> First 10 Pages Free
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={item.type === "podcast" ? `/podcasts/${item.slug}` : `/read/${item.id}`}
                        className="px-2.5 py-1 rounded bg-[#EFEEE8] hover:bg-[#E4E2DA] font-semibold text-[#203B53] text-[11px]"
                      >
                        Preview
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
