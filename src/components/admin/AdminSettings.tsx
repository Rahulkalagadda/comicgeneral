"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Shield, Key, Sliders, Globe } from "lucide-react";

export function AdminSettings() {
  const [apiBaseUrl, setApiBaseUrl] = useState(process.env.NEXT_PUBLIC_API_BASE_URL || "");
  const [razorpayKey, setRazorpayKey] = useState("rzp_live_vance_corp_9901");
  const [previewLimit, setPreviewLimit] = useState(10);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#18232F]">
          Platform & Integration Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#68717D] mt-1">
          Configure production API endpoints, Razorpay merchant credentials, and global preview policies.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E4E2DA] shadow-sm space-y-6"
      >
        <div className="space-y-4">
          <h2 className="text-sm font-bold font-heading text-[#18232F] uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#B89555]" />
            Backend API Configuration
          </h2>

          <div>
            <label className="text-xs font-semibold text-[#18232F] block mb-1">
              Backend API Base URL (NEXT_PUBLIC_API_BASE_URL)
            </label>
            <input
              type="text"
              value={apiBaseUrl}
              onChange={(e) => setApiBaseUrl(e.target.value)}
              placeholder="https://api.leadsphere.press"
              className="w-full px-3 py-2 rounded-lg border border-[#E4E2DA] bg-[#F6F5F1] text-xs text-[#18232F] focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
            />
            <p className="text-[11px] text-[#68717D] mt-1">
              Leave blank to operate in high-fidelity mock demo simulation mode.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#E4E2DA]">
          <h2 className="text-sm font-bold font-heading text-[#18232F] uppercase tracking-wider flex items-center gap-2">
            <Key className="w-4 h-4 text-[#B89555]" />
            Payment Gateway (Razorpay)
          </h2>

          <div>
            <label className="text-xs font-semibold text-[#18232F] block mb-1">
              Razorpay Key ID
            </label>
            <input
              type="text"
              value={razorpayKey}
              onChange={(e) => setRazorpayKey(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E4E2DA] bg-[#F6F5F1] text-xs text-[#18232F] focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
            />
            <p className="text-[11px] text-[#68717D] mt-1">
              Public publishable client key. Secret key is strictly restricted to secure backend environment variables.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#E4E2DA]">
          <h2 className="text-sm font-bold font-heading text-[#18232F] uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#B89555]" />
            Global Reading & Preview Policies
          </h2>

          <div>
            <label className="text-xs font-semibold text-[#18232F] block mb-1">
              Global Free Preview Boundary (Pages)
            </label>
            <input
              type="number"
              value={previewLimit}
              onChange={(e) => setPreviewLimit(Number(e.target.value))}
              min="1"
              max="20"
              className="w-48 px-3 py-2 rounded-lg border border-[#E4E2DA] bg-[#F6F5F1] text-xs text-[#18232F] focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
            />
            <p className="text-[11px] text-[#68717D] mt-1">
              Default is 10 pages across all books and comics.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#E4E2DA]">
          {saved ? (
            <span className="text-xs font-bold text-[#32765A] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Platform settings updated successfully
            </span>
          ) : (
            <span />
          )}

          <Button variant="primary" type="submit" className="bg-[#203B53] text-white">
            Save Platform Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
