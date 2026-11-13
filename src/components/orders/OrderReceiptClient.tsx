"use client";

import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Order } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CheckCircle2, RotateCcw, ShieldCheck } from "lucide-react";

interface OrderReceiptClientProps {
  order: Order;
}

export function OrderReceiptClient({ order }: OrderReceiptClientProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary-token hover:text-primary-token"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Orders
          </Link>

          <div className="p-8 rounded-3xl bg-surface-primary border border-theme shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme pb-6">
              <div>
                <span className="text-[10px] font-bold text-accent-gold uppercase tracking-wider block">
                  Official Merchant Receipt
                </span>
                <h1 className="text-2xl font-bold font-heading text-primary-token mt-1">
                  Order {order.orderNumber}
                </h1>
                <p className="text-xs text-secondary-token mt-0.5">
                  Issued on {formatDate(order.createdAt)}
                </p>
              </div>

              <div>
                {order.status === "payment_successful" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#32765A]/15 text-[#32765A] border border-[#32765A]/30">
                    <CheckCircle2 className="w-4 h-4" /> Payment Settled & Verified
                  </span>
                )}
                {order.status === "refunded" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-600 border border-red-500/30">
                    <RotateCcw className="w-4 h-4" /> Order Refunded
                  </span>
                )}
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-token">
                Purchased Digital Assets
              </h2>
              <div className="p-4 rounded-2xl bg-surface-secondary border border-theme flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-accent-gold block">
                    {order.items[0]?.contentType}
                  </span>
                  <h3 className="font-bold text-sm text-primary-token">
                    {order.items[0]?.title}
                  </h3>
                  <p className="text-[11px] text-muted-token mt-0.5">
                    Item ID: {order.items[0]?.contentId}
                  </p>
                </div>
                <span className="font-bold font-heading text-base text-primary-token">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>
            </div>

            {/* Cryptographic Verification Details */}
            <div className="p-4 rounded-2xl bg-surface-secondary/70 border border-theme space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-primary-token">
                <ShieldCheck className="w-4 h-4 text-accent-gold" />
                <span>Backend Gateway Telemetry</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#68717D] pt-1">
                <p>Razorpay Order ID: <strong className="text-primary-token font-mono">{order.razorpayOrderId || "N/A"}</strong></p>
                <p>Payment Reference: <strong className="text-primary-token font-mono">{order.razorpayPaymentId || "N/A"}</strong></p>
                <p>Verified Timestamp: <strong className="text-primary-token">{order.verifiedAt || order.createdAt}</strong></p>
                <p>Customer Email: <strong className="text-primary-token">{order.customerEmail}</strong></p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-theme flex items-center justify-between">
              <Link href="/library">
                <Button variant="primary">
                  Open in My Library
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
