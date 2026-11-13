"use client";

import React, { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SEED_CURRENT_USER } from "@/lib/api/seedData";
import { useTheme } from "@/lib/theme/ThemeContext";
import { Button } from "@/components/ui/Button";
import {
  User,
  Shield,
  Palette,
  CheckCircle2,
  Lock,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState(SEED_CURRENT_USER.name);
  const [email, setEmail] = useState(SEED_CURRENT_USER.email);
  const [saved, setSaved] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="border-b border-theme pb-4">
            <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
              Account Governance
            </span>
            <h1 className="text-3xl font-bold font-heading text-primary-token mt-1">
              Account Settings & Preferences
            </h1>
            <p className="text-sm text-secondary-token mt-1">
              Manage your personal credentials, visual themes, and security settings.
            </p>
          </div>

          {/* Profile Form */}
          <form
            onSubmit={handleProfileSave}
            className="p-6 sm:p-8 rounded-3xl bg-surface-primary border border-theme shadow-sm space-y-6"
          >
            <div className="flex items-center gap-2 border-b border-theme pb-3">
              <User className="w-5 h-5 text-accent-gold" />
              <h2 className="text-base font-bold font-heading text-primary-token">
                Executive Profile Details
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={SEED_CURRENT_USER.avatarUrl}
                alt={name}
                className="w-16 h-16 rounded-full border border-theme object-cover"
              />
              <div>
                <p className="text-xs font-bold text-primary-token">Executive Avatar</p>
                <p className="text-[11px] text-muted-token">
                  Role: <strong className="uppercase">{SEED_CURRENT_USER.role.replace("_", " ")}</strong>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-primary-token block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-theme text-xs text-primary-token focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-primary-token block mb-1">
                  Corporate Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-theme text-xs text-primary-token focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {saved ? (
                <span className="text-xs font-bold text-[#32765A] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Profile updated successfully
                </span>
              ) : (
                <span />
              )}
              <Button variant="primary" type="submit">
                Save Profile
              </Button>
            </div>
          </form>

          {/* Theme Preference */}
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-primary border border-theme shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-theme pb-3">
              <Palette className="w-5 h-5 text-accent-gold" />
              <h2 className="text-base font-bold font-heading text-primary-token">
                Visual Experience Theme
              </h2>
            </div>

            <p className="text-xs text-secondary-token">
              Switch between the minimal Executive editorial theme and the illustrated Jungle theme with cartoon mascots without losing your reading progress or library items.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={() => setTheme("executive")}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  theme === "executive"
                    ? "border-brand bg-brand/5 shadow-sm"
                    : "border-theme bg-surface-secondary hover:bg-surface-primary"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-primary-token">
                    Executive Theme
                  </span>
                  {theme === "executive" && (
                    <span className="text-[10px] font-bold text-brand-token uppercase">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-token mt-1">
                  Editorial, sophisticated, minimal navy and ivory styling suited for CXOs and founders.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setTheme("jungle")}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  theme === "jungle"
                    ? "border-[#234735] bg-[#234735]/5 shadow-sm"
                    : "border-theme bg-surface-secondary hover:bg-surface-primary"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-primary-token">
                    Jungle Theme
                  </span>
                  {theme === "jungle" && (
                    <span className="text-[10px] font-bold text-[#234735] uppercase">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-token mt-1">
                  Warm illustrated jungle world featuring original monkey, lion, elephant, and wolf mascots.
                </p>
              </button>
            </div>
          </div>

          {/* Refund Policy Information */}
          <div className="p-6 rounded-3xl bg-surface-secondary border border-theme space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-token flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-accent-gold" />
              Customer Refund & Support Guarantee
            </h3>
            <p className="text-xs text-secondary-token leading-relaxed">
              All digital purchases carry a 48-hour satisfaction guarantee. If you encounter any technical issues reading or streaming content, review our{" "}
              <Link href="/refund-policy" className="text-accent-gold font-semibold underline">
                Refund Policy
              </Link>{" "}
              or contact our executive support team.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
