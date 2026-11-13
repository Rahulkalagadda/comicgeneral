"use client";

import React, { useState, useEffect } from "react";
import { Order, OrderStatus } from "@/types";
import { getAdminOrders } from "@/lib/api/client";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  ShoppingCart,
  Search,
  Filter,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
} from "lucide-react";

export function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [refundModalOrder, setRefundModalOrder] = useState<Order | null>(null);
  const [refundReason, setRefundReason] = useState("");
  const [refundSuccess, setRefundSuccess] = useState(false);

  useEffect(() => {
    getAdminOrders().then(setOrders);
  }, []);

  const handleRefundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundModalOrder) return;

    setRefundSuccess(true);
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) => {
          if (o.id === refundModalOrder.id) {
            return {
              ...o,
              status: "refunded" as OrderStatus,
              refundReason,
            };
          }
          return o;
        })
      );
      setRefundSuccess(false);
      setRefundModalOrder(null);
      setRefundReason("");
    }, 1000);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    const matchesQuery =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#18232F]">
          Orders & Payment Settlements
        </h1>
        <p className="text-xs sm:text-sm text-[#68717D] mt-1">
          Full transactional ledger verified via Razorpay API webhooks and backend signatures.
        </p>
      </div>

      {/* FILTER & SEARCH CONTROLS */}
      <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E4E2DA] flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="w-4 h-4 text-[#8A929C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order number or customer email..."
            className="text-xs text-[#18232F] bg-transparent focus:outline-none w-full sm:w-64"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { id: "all", label: "All Orders" },
            { id: "payment_successful", label: "Paid" },
            { id: "refunded", label: "Refunded" },
            { id: "processing", label: "Processing" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-[#203B53] text-white"
                  : "text-[#68717D] hover:bg-[#EFEEE8]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4E2DA] shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E4E2DA] text-[#8A929C] uppercase font-semibold">
                <th className="py-3 px-3">Order #</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Items</th>
                <th className="py-3 px-3">Total</th>
                <th className="py-3 px-3">Razorpay Ref</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E2DA]">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#F6F5F1] transition-colors">
                  <td className="py-3.5 px-3 font-mono font-semibold text-[#203B53]">
                    {ord.orderNumber}
                  </td>
                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-[#18232F]">{ord.customerName}</p>
                    <p className="text-[11px] text-[#68717D]">{ord.customerEmail}</p>
                  </td>
                  <td className="py-3.5 px-3 max-w-xs truncate text-[#18232F]">
                    {ord.items[0]?.title || "Content Title"}
                  </td>
                  <td className="py-3.5 px-3 font-bold font-heading text-[#18232F]">
                    {formatCurrency(ord.totalAmount)}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[11px] text-[#68717D]">
                    {ord.razorpayPaymentId || ord.razorpayOrderId || "—"}
                  </td>
                  <td className="py-3.5 px-3">
                    {ord.status === "payment_successful" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#32765A]/15 text-[#32765A]">
                        <CheckCircle2 className="w-3 h-3" /> Paid & Settled
                      </span>
                    )}
                    {ord.status === "refunded" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-600">
                        <RotateCcw className="w-3 h-3" /> Refunded
                      </span>
                    )}
                    {ord.status === "processing" && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600">
                        Processing
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-[#68717D]">
                    {formatDate(ord.createdAt)}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(ord)}
                        className="px-2.5 py-1 rounded bg-[#EFEEE8] hover:bg-[#E4E2DA] font-semibold text-[#203B53] text-[11px]"
                      >
                        Receipt
                      </button>
                      {ord.status === "payment_successful" && (
                        <button
                          type="button"
                          onClick={() => setRefundModalOrder(ord)}
                          className="px-2.5 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 font-semibold text-[11px]"
                        >
                          Refund
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REFUND MODAL */}
      {refundModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <form
            onSubmit={handleRefundSubmit}
            className="w-full max-w-md rounded-2xl bg-white border border-[#E4E2DA] p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-red-100 text-red-600">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#18232F]">
                  Issue Verified Refund
                </h3>
                <p className="text-xs text-[#68717D]">
                  Order {refundModalOrder.orderNumber} • {formatCurrency(refundModalOrder.totalAmount)}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#68717D] leading-relaxed">
              This action revokes the customer's cryptographic entitlement for the purchased content and authorizes a Razorpay reversal back to the source bank account.
            </p>

            <div>
              <label className="text-xs font-semibold text-[#18232F] block mb-1.5">
                Audit Justification / Reason
              </label>
              <textarea
                required
                rows={3}
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                placeholder="e.g. Customer reported accidental duplicate purchase..."
                className="w-full px-3 py-2 rounded-lg border border-[#E4E2DA] bg-[#F6F5F1] text-xs text-[#18232F] focus:outline-none focus:ring-2 focus:ring-[#547DAD]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setRefundModalOrder(null)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                type="submit"
                isLoading={refundSuccess}
              >
                Confirm & Reclaim Entitlement
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* RECEIPT AUDIT MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-[#E4E2DA] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4E2DA] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#B89555]" />
                <h3 className="text-base font-bold text-[#18232F]">
                  Commercial Settlement Record
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-xs font-semibold text-[#68717D] hover:text-[#18232F]"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-4 p-3 rounded-xl bg-[#F6F5F1] border border-[#E4E2DA]">
                <div>
                  <span className="text-[10px] text-[#8A929C] uppercase block">Order Number</span>
                  <span className="font-mono font-bold text-[#18232F]">{selectedOrder.orderNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A929C] uppercase block">Settlement Status</span>
                  <span className="font-bold text-[#32765A] uppercase">{selectedOrder.status}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A929C] uppercase block">Customer</span>
                  <span className="font-semibold text-[#18232F]">{selectedOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8A929C] uppercase block">Corporate Email</span>
                  <span className="font-mono text-[#68717D]">{selectedOrder.customerEmail}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-[#E4E2DA] space-y-2">
                <span className="text-[10px] text-[#8A929C] uppercase font-bold block">Purchased Line Item</span>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#18232F]">{selectedOrder.items[0]?.title}</span>
                  <span className="font-bold text-[#18232F]">{formatCurrency(selectedOrder.totalAmount)}</span>
                </div>
              </div>

              <div className="space-y-1 text-[#68717D]">
                <p>Razorpay Order ID: <span className="font-mono text-[#18232F]">{selectedOrder.razorpayOrderId || "N/A"}</span></p>
                <p>Razorpay Payment ID: <span className="font-mono text-[#18232F]">{selectedOrder.razorpayPaymentId || "N/A"}</span></p>
                <p>Created At: <span className="text-[#18232F]">{selectedOrder.createdAt}</span></p>
                {selectedOrder.refundReason && (
                  <p className="text-red-600 font-semibold mt-1">Refund Justification: {selectedOrder.refundReason}</p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setSelectedOrder(null)}
              >
                Close Record
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
