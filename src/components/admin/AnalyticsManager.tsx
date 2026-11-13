"use client";

import React from "react";
import { formatCurrency } from "@/lib/utils";
import { BarChart3, TrendingUp, PieChart, Users, DollarSign } from "lucide-react";

export function AnalyticsManager() {
  const channelBreakdown = [
    { type: "Executive Books", percentage: 58, revenue: 3290, color: "bg-[#203B53]" },
    { type: "Graphic Stories & Comics", percentage: 27, revenue: 1530, color: "bg-[#B89555]" },
    { type: "Video Podcast Episodes", percentage: 15, revenue: 877, color: "bg-[#54776C]" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#18232F]">
          Revenue Analytics & Audience Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-[#68717D] mt-1">
          Detailed financial breakdowns, conversion metrics, and content-category sales velocity.
        </p>
      </div>

      {/* REVENUE CATEGORY BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4E2DA] shadow-sm space-y-4">
          <h2 className="text-base font-bold font-heading text-[#18232F]">
            Revenue Split by Content Classification
          </h2>

          <div className="space-y-4 pt-2">
            {channelBreakdown.map((item) => (
              <div key={item.type} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-[#18232F]">
                  <span>{item.type}</span>
                  <span>{formatCurrency(item.revenue)} ({item.percentage}%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#EFEEE8] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E4E2DA] flex items-center justify-between text-xs text-[#68717D]">
            <span>Average Conversion from 10-Page Preview to Full Purchase:</span>
            <strong className="text-[#32765A] text-sm font-bold">18.4%</strong>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4E2DA] shadow-sm space-y-4">
          <h2 className="text-base font-bold font-heading text-[#18232F]">
            Top Converting Content
          </h2>
          <div className="space-y-3">
            {[
              { title: "The Sovereign Strategist", format: "Book", units: 48, revenue: 91152 },
              { title: "The Silicon Syndicate", format: "Comic", units: 36, revenue: 46764 },
              { title: "The Executive Crucible Ep 2", format: "Episode", units: 29, revenue: 14471 },
            ].map((c, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#F6F5F1] border border-[#E4E2DA] flex justify-between items-center text-xs">
                <div>
                  <p className="font-semibold text-[#18232F]">{c.title}</p>
                  <p className="text-[11px] text-[#68717D]">{c.format} • {c.units} Purchases</p>
                </div>
                <span className="font-bold font-heading text-[#18232F]">
                  {formatCurrency(c.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
