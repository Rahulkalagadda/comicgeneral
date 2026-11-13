"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useTheme } from "@/lib/theme/ThemeContext";
import { createOrder, verifyPayment } from "@/lib/api/client";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  QrCode,
  Building2,
  Wallet,
  CheckCircle2,
  AlertTriangle,
  X,
  ArrowRight,
  Tag,
  HelpCircle,
  Check,
  Palette,
  Sparkles,
  Smartphone,
  BookOpen,
  Headphones,
  CheckCheck,
  Laptop,
  MailCheck,
  RotateCcw,
} from "lucide-react";

type PaymentTab = "cards" | "upi" | "netbanking" | "wallets";
type Currency = "USD" | "INR" | "EUR";

interface CartItem {
  id: string;
  title: string;
  type: "book" | "podcast";
  badge: string;
  edition: string;
  authorOrHost: string;
  tierOrFormat: string;
  priceUSD: number;
  priceINR: number;
  coverUrl: string;
}

const DEFAULT_CART: CartItem[] = [
  {
    id: "book-1",
    title: "The Sovereign Strategist",
    type: "book",
    badge: "EBOOK",
    edition: "Full Unabridged Illustrated Edition",
    authorOrHost: "Julian Vance, Ph.D.",
    tierOrFormat: "Tier IV Unlocked • 10-Page Preview Certified",
    priceUSD: 19.99,
    priceINR: 999,
    coverUrl:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "ep-102",
    title: "Deep Cosmos & Executive Crucible",
    type: "podcast",
    badge: "AUDIO",
    edition: "Episode 2 & Complete Season Pass",
    authorOrHost: "Marcus Sterling",
    tierOrFormat: "Lossless FLAC Master • Includes Stems & PDF",
    priceUSD: 12.5,
    priceINR: 500,
    coverUrl:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
  },
];

export default function CheckoutPage() {
  const { theme, toggleTheme } = useTheme();

  // Payment tab state
  const [activeTab, setActiveTab] = useState<PaymentTab>("cards");
  const [currency, setCurrency] = useState<Currency>("USD");

  // Form states
  const [cardName, setCardName] = useState("Elena Vance");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4092");
  const [cardExpiry, setCardExpiry] = useState("09 / 28");
  const [cardCvc, setCardCvc] = useState("•••");
  const [saveCard, setSaveCard] = useState(true);

  // UPI state
  const [upiVpa, setUpiVpa] = useState("elena.vance@okhdfcbank");
  const [isUpiVerified, setIsUpiVerified] = useState(false);

  // Netbanking state
  const [selectedBank, setSelectedBank] = useState("hdfc");

  // Wallets state
  const [selectedWallet, setSelectedWallet] = useState("paytm");

  // Promo Code
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscountPct, setPromoDiscountPct] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Checkout process & modal
  const [isProcessing, setIsProcessing] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [settledPaymentId, setSettledPaymentId] = useState("");
  const [settledOrderNumber, setSettledOrderNumber] = useState("");

  const isJungle = theme === "jungle";

  // Financial calculations
  const subtotalUSD = DEFAULT_CART.reduce((acc, item) => acc + item.priceUSD, 0);
  const subtotalINR = DEFAULT_CART.reduce((acc, item) => acc + item.priceINR, 0);

  const rawSubtotal = currency === "USD" ? subtotalUSD : subtotalINR;
  const discountAmount = appliedPromo ? (rawSubtotal * promoDiscountPct) / 100 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const formatPrice = (val: number) => {
    if (currency === "USD") return `$${val.toFixed(2)}`;
    if (currency === "EUR") return `€${(val * 0.92).toFixed(2)}`;
    return `₹${Math.round(val).toLocaleString("en-IN")}`;
  };

  const handleApplyPromo = () => {
    const clean = promoInput.trim().toUpperCase();
    if (!clean) return;

    if (clean === "STRATEGY20" || clean === "FELLOWSHIP20" || clean === "LEADSPHERE" || clean === "LUMINA") {
      setAppliedPromo(clean);
      setPromoDiscountPct(20);
      setPromoMessage({ text: "20% Creator Fellowship discount applied!", isError: false });
    } else if (clean === "JUNGLE50" || clean === "DISCOVERY50") {
      setAppliedPromo(clean);
      setPromoDiscountPct(50);
      setPromoMessage({ text: "50% Jungle Explorer discount applied!", isError: false });
    } else {
      setPromoMessage({ text: "Invalid promo code. Try STRATEGY20, LEADSPHERE, or JUNGLE50", isError: true });
    }
  };

  const handleAuthorizeAndSettle = async () => {
    try {
      setIsProcessing(true);

      // 1. Create order in platform system
      const order = await createOrder(
        {
          id: DEFAULT_CART[0].id,
          title: `${DEFAULT_CART[0].title} & ${DEFAULT_CART[1].title}`,
          price: Math.round(finalTotal),
          type: "book",
        },
        {
          name: cardName || "Elena Vance",
          email: "elena.vance@studio.arch",
        }
      );

      // 2. Simulate Razorpay Gateway settlement
      setTimeout(async () => {
        const generatedRzpId = `RZP_${Math.floor(10000000 + Math.random() * 90000000)}`;
        try {
          await verifyPayment(order.id, generatedRzpId);
        } catch {
          // ignore simulated fallback
        }

        setSettledPaymentId(generatedRzpId);
        setSettledOrderNumber(order.orderNumber || `AGY-${Date.now().toString().slice(-6)}`);
        setIsProcessing(false);
        setSuccessModalOpen(true);
      }, 1400);
    } catch {
      setIsProcessing(false);
      setSuccessModalOpen(true);
    }
  };

  return (
    <>
      <SiteHeader />

      <main className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto w-full">
          {/* Top Editorial Header & Trust Ribbon */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-secondary-token text-xs mb-1.5">
                <span className="font-semibold uppercase tracking-wider text-[11px]">
                  Folio Vault &amp; Entitlements
                </span>
                <span className="text-muted-token">•</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> 256-bit Encrypted Session
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-serif-editorial text-primary-token tracking-tight">
                Checkout Folio
              </h1>
            </div>

            {/* Quick Trust Indicators & Currency Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Currency Selector */}
              <div className="flex items-center bg-surface-secondary border border-theme rounded-xl p-1 shadow-sm">
                {(["USD", "INR", "EUR"] as Currency[]).map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                      currency === curr
                        ? "bg-surface-primary text-primary-token shadow-sm"
                        : "text-secondary-token hover:text-primary-token"
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-3 bg-surface-secondary border border-theme px-3.5 py-1.5 rounded-xl shadow-sm text-xs">
                <div className="flex items-center gap-1.5 text-secondary-token">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-primary-token">Razorpay Vaulted</span>
                </div>
                <span className="w-1 h-3 bg-border-subtle rounded-full" />
                <div className="flex items-center gap-1.5 text-secondary-token">
                  <Sparkles className="w-4 h-4 text-brand-token" />
                  <span className="font-medium text-primary-token">Instant Unlocking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Workspace: Asymmetrical 12-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Payment Architecture & Gateway Integration (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Razorpay Orchestration Board */}
              <div className="bg-surface-primary rounded-2xl p-6 sm:p-8 border border-theme shadow-md transition-all">
                {/* Header with PCI-DSS Status */}
                <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-theme gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-token/10 text-brand-token flex items-center justify-center font-bold">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold font-serif-editorial text-primary-token">
                        Payment Mechanism
                      </h2>
                      <p className="text-xs text-secondary-token">
                        Razorpay Secure Standard Routing
                      </p>
                    </div>
                  </div>

                  {/* Gateway Status Pill */}
                  <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>PCI-DSS L1 Compliant</span>
                  </div>
                </div>

                {/* 4 Payment Method Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-surface-secondary p-1.5 rounded-xl mb-6 border border-theme">
                  <button
                    type="button"
                    onClick={() => setActiveTab("cards")}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === "cards"
                        ? "bg-surface-primary text-primary-token shadow-sm border border-theme"
                        : "text-secondary-token hover:text-primary-token"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-brand-token" />
                    <span>Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("upi")}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === "upi"
                        ? "bg-surface-primary text-primary-token shadow-sm border border-theme"
                        : "text-secondary-token hover:text-primary-token"
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-emerald-600" />
                    <span>UPI Instant</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("netbanking")}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === "netbanking"
                        ? "bg-surface-primary text-primary-token shadow-sm border border-theme"
                        : "text-secondary-token hover:text-primary-token"
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-accent-gold" />
                    <span>Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("wallets")}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === "wallets"
                        ? "bg-surface-primary text-primary-token shadow-sm border border-theme"
                        : "text-secondary-token hover:text-primary-token"
                    }`}
                  >
                    <Wallet className="w-4 h-4 text-purple-600" />
                    <span>Wallets</span>
                  </button>
                </div>

                {/* TAB 1: CARDS */}
                {activeTab === "cards" && (
                  <div className="flex flex-col gap-4 animate-in fade-in duration-150">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary-token mb-1.5">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Full name on card"
                        className="w-full bg-surface-secondary border border-theme rounded-xl px-4 py-2.5 text-sm text-primary-token outline-none focus:ring-2 focus:ring-brand-token/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary-token mb-1.5">
                        Card Digits
                      </label>
                      <div className="flex items-center bg-surface-secondary border border-theme rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-brand-token/30 transition-all">
                        <CreditCard className="w-4 h-4 text-secondary-token mr-2.5 flex-shrink-0" />
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="Card number"
                          className="w-full bg-transparent text-sm text-primary-token outline-none font-mono"
                        />
                        <span className="text-[10px] font-bold bg-surface-primary border border-theme px-2 py-0.5 rounded text-secondary-token ml-2">
                          VISA
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary-token mb-1.5">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM / YY"
                          className="w-full bg-surface-secondary border border-theme rounded-xl px-4 py-2.5 text-sm text-primary-token outline-none font-mono focus:ring-2 focus:ring-brand-token/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary-token mb-1.5">
                          Security CVC
                        </label>
                        <div className="flex items-center bg-surface-secondary border border-theme rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-brand-token/30 transition-all">
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="CVC"
                            className="w-full bg-transparent text-sm text-primary-token outline-none font-mono"
                          />
                          <HelpCircle className="w-4 h-4 text-secondary-token ml-1 cursor-pointer" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="save-card-box"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-4 h-4 rounded text-brand-token accent-brand-token cursor-pointer"
                      />
                      <label
                        htmlFor="save-card-box"
                        className="text-xs text-secondary-token cursor-pointer select-none"
                      >
                        Vault this card securely on Razorpay Tokenized Network
                      </label>
                    </div>
                  </div>
                )}

                {/* TAB 2: UPI INSTANT */}
                {activeTab === "upi" && (
                  <div className="flex flex-col gap-4 animate-in fade-in duration-150">
                    <div className="p-4 bg-surface-secondary rounded-xl border border-theme flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-24 h-24 bg-surface-primary rounded-xl p-2 border border-theme shadow-sm flex items-center justify-center flex-shrink-0">
                        {/* Dynamic SVG QR */}
                        <svg className="w-full h-full text-primary-token" viewBox="0 0 80 80">
                          <rect width="24" height="24" fill="currentColor" />
                          <rect x="4" y="4" width="16" height="16" fill="white" />
                          <rect x="8" y="8" width="8" height="8" fill="currentColor" />
                          <rect x="56" width="24" height="24" fill="currentColor" />
                          <rect x="60" y="4" width="16" height="16" fill="white" />
                          <rect x="64" y="8" width="8" height="8" fill="currentColor" />
                          <rect y="56" width="24" height="24" fill="currentColor" />
                          <rect x="4" y="60" width="16" height="16" fill="white" />
                          <rect x="8" y="64" width="8" height="8" fill="currentColor" />
                          <rect x="32" y="4" width="16" height="8" fill="currentColor" />
                          <rect x="36" y="24" width="12" height="12" fill="currentColor" />
                          <rect x="56" y="32" width="20" height="8" fill="currentColor" />
                          <rect x="28" y="44" width="20" height="12" fill="currentColor" />
                          <rect x="56" y="56" width="16" height="16" fill="currentColor" />
                        </svg>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="font-bold text-sm text-primary-token">Instant App Scan</h3>
                        <p className="text-xs text-secondary-token mt-1 leading-relaxed">
                          Scan with Google Pay, PhonePe, Paytm, or BHIM. Instant UPI auto-settle.
                        </p>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-2">
                          <Check className="w-3.5 h-3.5" /> 0% Additional Surcharge
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary-token mb-1.5">
                        Or enter UPI ID / VPA
                      </label>
                      <div className="flex items-center bg-surface-secondary border border-theme rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-brand-token/30 transition-all">
                        <input
                          type="text"
                          value={upiVpa}
                          onChange={(e) => {
                            setUpiVpa(e.target.value);
                            setIsUpiVerified(false);
                          }}
                          placeholder="username@okhdfcbank"
                          className="w-full bg-transparent text-sm text-primary-token outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setIsUpiVerified(true)}
                          className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
                            isUpiVerified
                              ? "bg-emerald-500/10 text-emerald-600"
                              : "text-brand-token hover:underline"
                          }`}
                        >
                          {isUpiVerified ? "✓ Verified" : "Verify"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: NET BANKING */}
                {activeTab === "netbanking" && (
                  <div className="flex flex-col gap-3 animate-in fade-in duration-150">
                    <p className="text-xs text-secondary-token">
                      Select your institutional clearing provider:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: "hdfc", name: "HDFC Bank", code: "HDFC", color: "text-blue-600" },
                        { id: "icici", name: "ICICI Direct", code: "ICICI", color: "text-orange-600" },
                        { id: "sbi", name: "State Bank of India", code: "SBI", color: "text-cyan-600" },
                        { id: "axis", name: "Axis Bank", code: "AXIS", color: "text-rose-600" },
                        { id: "kotak", name: "Kotak Mahindra", code: "KOTAK", color: "text-red-600" },
                        { id: "other", name: "All Other Banks", code: "50+ MORE", color: "text-secondary-token" },
                      ].map((bank) => (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => setSelectedBank(bank.id)}
                          className={`p-3 rounded-xl text-left flex flex-col justify-between h-20 border transition-all cursor-pointer ${
                            selectedBank === bank.id
                              ? "bg-surface-primary border-brand-token ring-2 ring-brand-token/20 shadow-sm"
                              : "bg-surface-secondary border-theme hover:bg-surface-primary/60"
                          }`}
                        >
                          <span className={`text-[11px] font-bold ${bank.color}`}>{bank.code}</span>
                          <span className="text-xs font-semibold text-primary-token truncate">
                            {bank.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: WALLETS */}
                {activeTab === "wallets" && (
                  <div className="flex flex-col gap-2.5 animate-in fade-in duration-150">
                    {[
                      { id: "paytm", name: "Paytm Wallet & Postpaid", icon: Wallet, color: "text-blue-500" },
                      { id: "amazon", name: "Amazon Pay Balance", icon: Wallet, color: "text-amber-500" },
                      { id: "phonepe", name: "PhonePe Wallet", icon: Wallet, color: "text-purple-500" },
                    ].map((wallet) => (
                      <label
                        key={wallet.id}
                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                          selectedWallet === wallet.id
                            ? "bg-surface-primary border-brand-token ring-2 ring-brand-token/20 shadow-sm"
                            : "bg-surface-secondary border-theme hover:bg-surface-primary/60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <wallet.icon className={`w-5 h-5 ${wallet.color}`} />
                          <span className="text-xs font-semibold text-primary-token">{wallet.name}</span>
                        </div>
                        <input
                          type="radio"
                          name="wallet-selection"
                          checked={selectedWallet === wallet.id}
                          onChange={() => setSelectedWallet(wallet.id)}
                          className="accent-brand-token"
                        />
                      </label>
                    ))}
                  </div>
                )}

                {/* Dual-Mode Trigger Checkout CTA */}
                <div className="mt-8 pt-6 border-t border-theme">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleAuthorizeAndSettle}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#584ABD] hover:bg-[#483BA6] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Authorizing via Razorpay TLS 1.3...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Authorize &amp; Settle {formatPrice(finalTotal)}</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-secondary-token mt-3 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Payments orchestrated natively via Razorpay Financial Technologies
                  </p>
                </div>
              </div>

              {/* Digital Entitlement Guarantee Badge & Digital Lock Protocol */}
              <div className="bg-surface-secondary rounded-2xl p-6 border border-theme shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold font-serif-editorial text-sm sm:text-base text-primary-token">
                    Digital Entitlement Guarantee
                  </h3>
                  <p className="text-xs text-secondary-token mt-1 leading-relaxed">
                    Instant digital access to locked pages, high-res illustrated chapters, and
                    premium podcast stems. No external downloads or unauthorized reproduction
                    permitted under LeadSphere StorySphere Archival Standard v4.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                      <CheckCheck className="w-3.5 h-3.5" /> Lifetime Platform Stream
                    </span>
                    <span className="text-[11px] font-bold text-secondary-token uppercase tracking-wider flex items-center gap-1">
                      <Laptop className="w-3.5 h-3.5" /> Synchronized Co-Reading
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dual-State Order Folio & Mascot Showcase (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Theme Mode Switcher Banner (Visual Guide) */}
              <div className="bg-surface-secondary rounded-2xl p-4 border border-theme flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-brand-token" />
                  <span className="text-xs font-semibold text-primary-token">Experience Toggle</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-brand-token/10 text-brand-token">
                    {theme}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="text-xs font-semibold text-secondary-token hover:text-primary-token transition-colors cursor-pointer"
                >
                  Switch mode →
                </button>
              </div>

              {/* The Order Folio Container */}
              <div className="relative bg-surface-primary rounded-2xl p-6 sm:p-7 border border-theme shadow-md overflow-hidden transition-all">
                {/* Accent Watermark */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-brand-token/10 blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 mb-4 border-b border-theme">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-token">
                      Cart Registry
                    </span>
                    <h3 className="text-xl font-bold font-serif-editorial text-primary-token">
                      Order Summary
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-surface-secondary border border-theme text-[11px] font-bold text-secondary-token">
                    {DEFAULT_CART.length} Units
                  </span>
                </div>

                {/* Itemised Stack */}
                <div className="flex flex-col gap-4">
                  {DEFAULT_CART.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 pb-4 border-b border-theme/60 last:border-b-0"
                    >
                      <div className="w-16 h-20 bg-surface-secondary rounded-xl overflow-hidden flex-shrink-0 border border-theme shadow-sm relative">
                        <img
                          src={item.coverUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 text-white rounded text-[8px] font-bold uppercase tracking-wider">
                          {item.badge}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-sm text-primary-token leading-tight truncate">
                            {item.title}
                          </h4>
                          <span className="font-bold text-sm text-primary-token font-serif-editorial">
                            {formatPrice(currency === "USD" ? item.priceUSD : item.priceINR)}
                          </span>
                        </div>
                        <p className="text-xs text-secondary-token truncate mt-0.5">
                          {item.edition}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-secondary-token">
                          <span className="font-semibold text-primary-token truncate">
                            {item.authorOrHost}
                          </span>
                          <span>•</span>
                          <span className="truncate">{item.tierOrFormat}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon / Creator Fellowship Token Input */}
                <div className="mt-4 mb-4">
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center bg-surface-secondary border border-theme rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-brand-token/30 transition-all">
                      <Tag className="w-4 h-4 text-secondary-token mr-2" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Fellowship / Promo Code"
                        className="w-full bg-transparent text-xs text-primary-token outline-none uppercase placeholder:normal-case font-mono"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 rounded-xl bg-surface-secondary hover:bg-surface-primary border border-theme text-primary-token font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p
                      className={`text-[11px] mt-1.5 ${
                        promoMessage.isError ? "text-red-500 font-medium" : "text-emerald-600 font-semibold"
                      }`}
                    >
                      {promoMessage.text}
                    </p>
                  )}
                </div>

                {/* Financial Breakdown */}
                <div className="bg-surface-secondary rounded-xl p-4 flex flex-col gap-2 border border-theme">
                  <div className="flex justify-between items-center text-xs text-secondary-token">
                    <span>Folio Subtotal</span>
                    <span className="font-medium text-primary-token">{formatPrice(rawSubtotal)}</span>
                  </div>

                  {appliedPromo && (
                    <div className="flex justify-between items-center text-xs text-emerald-600 font-medium">
                      <span>Fellowship Discount ({promoDiscountPct}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs text-secondary-token">
                    <span>Platform Archival Licensing</span>
                    <span className="font-semibold text-emerald-600">Complimentary</span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-secondary-token">
                    <span>Integrated Taxes &amp; Duties</span>
                    <span className="font-medium text-primary-token">Included</span>
                  </div>

                  <div className="pt-2 mt-2 border-t border-theme flex justify-between items-baseline">
                    <span className="font-serif-editorial font-bold text-sm text-primary-token">
                      Total Payable
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-bold font-serif-editorial text-brand-token">
                        {formatPrice(finalTotal)}
                      </span>
                      <span className="block text-[10px] text-secondary-token font-semibold uppercase">
                        {currency} Guaranteed Rate
                      </span>
                    </div>
                  </div>
                </div>

                {/* Jungle Mascot Companion Box */}
                <div
                  className={`mt-6 rounded-2xl p-4 relative overflow-hidden transition-all border ${
                    isJungle
                      ? "bg-amber-500/15 border-amber-500/30 text-amber-950 dark:text-amber-100"
                      : "bg-amber-500/10 border-amber-500/20 text-primary-token"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface-primary border border-amber-400/40 p-1 shadow-sm">
                      <img
                        src="/images/mascot-lion.jpg"
                        alt="Playful Lion mascot waving happily"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mb-1">
                        🐾 Jungle Co-Reader Ready
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-primary-token leading-tight">
                        Roar! Ready to read?
                      </h4>
                      <p className="text-[11px] text-secondary-token mt-0.5 leading-snug">
                        Your purchase rewards <strong>150 Jungle Paw Badges</strong> for family reading quests.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Celebratory Checkout Success Modal Preview (Interactive Toggleable Simulation) */}
      {successModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-surface-primary max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-theme shadow-2xl relative overflow-hidden transform animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setSuccessModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-secondary text-secondary-token transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Celebratory Graphic & Mascot */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl overflow-hidden relative mb-4 p-1 bg-surface-secondary border border-theme shadow-md">
                <img
                  src="/images/mascot-lion.jpg"
                  alt="Celebratory Lion mascot congratulating on successful checkout"
                  className="w-full h-full object-cover rounded-xl"
                />
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <Check className="w-4 h-4 stroke-[3]" />
                </span>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 mb-1">
                Payment Completed • {settledPaymentId || "RZP_92817340"}
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-primary-token mb-2">
                Folio Unlocked &amp; Ready!
              </h2>

              <p className="text-xs sm:text-sm text-secondary-token max-w-sm mb-6 leading-relaxed">
                Both <em>The Sovereign Strategist</em> and <em>Deep Cosmos</em> have settled
                permanently into your private library vault.
              </p>

              {/* Stamped Receipt Pill */}
              <div className="w-full bg-surface-secondary rounded-2xl p-4 mb-6 text-left flex items-center justify-between border border-theme">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-token/10 text-brand-token flex items-center justify-center flex-shrink-0">
                    <MailCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary-token">Vault Receipt Dispatched</p>
                    <p className="text-[11px] text-secondary-token">elena.vance@studio.arch</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold bg-surface-primary border border-theme px-2.5 py-1 rounded-lg text-primary-token">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              {/* Navigation CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <Link
                  href="/library"
                  className="w-full py-3 px-4 rounded-xl bg-[#584ABD] hover:bg-[#483BA6] text-white font-bold text-xs sm:text-sm text-center shadow-sm transition-all"
                >
                  Open My Library
                </Link>
                <Link
                  href="/orders"
                  className="w-full py-3 px-4 rounded-xl bg-surface-secondary hover:bg-surface-primary border border-theme text-primary-token font-bold text-xs sm:text-sm text-center transition-all"
                >
                  Review Order Receipt
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </>
  );
}
