"use client";

import React, { useState } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/Button";
import { Mail, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
              Executive Inquiries
            </span>
            <h1 className="text-3xl font-bold font-heading text-primary-token">
              Contact Editorial & Support
            </h1>
            <p className="text-xs text-secondary-token">
              Reach our corporate publishing desk regarding titles, rights, or technical questions.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-surface-primary border border-theme shadow-xl space-y-4">
            {sent ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#32765A] mx-auto" />
                <h3 className="font-bold text-base text-primary-token">
                  Message Transmitted
                </h3>
                <p className="text-xs text-secondary-token max-w-sm mx-auto">
                  Our executive team has received your message and will respond within 4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-primary-token block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-theme text-xs text-primary-token focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-primary-token block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-theme text-xs text-primary-token focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-primary-token block mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry or order reference..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-secondary border border-theme text-xs text-primary-token focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
                  />
                </div>

                <Button variant="primary" size="lg" type="submit" className="w-full">
                  Submit Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
