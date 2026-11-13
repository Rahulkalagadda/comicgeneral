"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
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
              Create Executive Reader Account
            </h1>
            <p className="text-xs text-secondary-token">
              Register to save reading progress and access verified entitlements.
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="p-6 sm:p-8 rounded-3xl bg-surface-primary border border-theme shadow-xl space-y-4"
          >
            <div>
              <label className="text-xs font-semibold text-primary-token block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-muted-token absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-surface-secondary border border-theme text-xs text-primary-token focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
                />
              </div>
            </div>

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
              <label className="text-xs font-semibold text-primary-token block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-token absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
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
              Create Account
            </Button>

            <div className="pt-2 text-center text-xs text-secondary-token">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-brand-token hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
