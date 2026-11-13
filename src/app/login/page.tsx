"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("marcus.vance@vanceholdings.com");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/library");
    }, 800);
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <BrandLogo className="justify-center" />
            <h1 className="text-2xl font-bold font-heading text-primary-token mt-3">
              Executive Sign In
            </h1>
            <p className="text-xs text-secondary-token">
              Access your digital library, verified entitlements, and reading progress.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="p-6 sm:p-8 rounded-3xl bg-surface-primary border border-theme shadow-xl space-y-4"
          >
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 text-red-600 text-xs font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-primary-token block mb-1">
                Corporate Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-token absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-surface-secondary border border-theme text-xs text-primary-token focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-primary-token">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-semibold text-accent-gold hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-token absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-surface-secondary border border-theme text-xs text-primary-token focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
                />
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={loading}
              className="w-full"
            >
              Sign In to Account
            </Button>

            <div className="pt-2 text-center text-xs text-secondary-token">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-brand-token hover:underline">
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
