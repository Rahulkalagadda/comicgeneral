"use client";

import React from "react";
import { Shield, Check, X } from "lucide-react";

export function RolesManager() {
  const permissions = [
    { name: "View Content Marketplace", super_admin: true, content_manager: true, support_agent: true, finance_manager: true, customer: true },
    { name: "Access Reader & Video Player", super_admin: true, content_manager: true, support_agent: true, finance_manager: true, customer: true },
    { name: "Upload & Draft Content", super_admin: true, content_manager: true, support_agent: false, finance_manager: false, customer: false },
    { name: "Publish & Archive Content", super_admin: true, content_manager: true, support_agent: false, finance_manager: false, customer: false },
    { name: "Configure 10-Page Preview Limits", super_admin: true, content_manager: true, support_agent: false, finance_manager: false, customer: false },
    { name: "Modify Pricing & Catalog Offers", super_admin: true, content_manager: false, support_agent: false, finance_manager: true, customer: false },
    { name: "Authorize Customer Refunds", super_admin: true, content_manager: false, support_agent: false, finance_manager: true, customer: false },
    { name: "Inspect & Suspend User Accounts", super_admin: true, content_manager: false, support_agent: true, finance_manager: false, customer: false },
    { name: "View Cryptographic Entitlements", super_admin: true, content_manager: true, support_agent: true, finance_manager: true, customer: false },
    { name: "Access Immutable Audit Logs", super_admin: true, content_manager: false, support_agent: false, finance_manager: false, customer: false },
    { name: "Modify Platform & Gateway Keys", super_admin: true, content_manager: false, support_agent: false, finance_manager: false, customer: false },
  ];

  const roles = [
    { key: "super_admin", label: "Super Admin", desc: "Full administrative and security authority" },
    { key: "content_manager", label: "Content Manager", desc: "Manage manuscripts, graphic panels & episodes" },
    { key: "finance_manager", label: "Finance Manager", desc: "Audit Razorpay ledger & authorize refunds" },
    { key: "support_agent", label: "Support Agent", desc: "Assist customers & inspect entitlements" },
    { key: "customer", label: "Customer / Reader", desc: "Store purchases and library access" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#18232F]">
          Roles & Cryptographic Access Matrix
        </h1>
        <p className="text-xs sm:text-sm text-[#68717D] mt-1">
          Strict backend role-based access control (RBAC) governance configuration across administrative operations.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4E2DA] shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E4E2DA] text-[#8A929C] uppercase font-semibold">
                <th className="py-3 px-3">Permission Capability</th>
                {roles.map((r) => (
                  <th key={r.key} className="py-3 px-3 text-center">
                    <span className="block font-bold text-[#18232F]">{r.label}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E2DA]">
              {permissions.map((p, idx) => (
                <tr key={idx} className="hover:bg-[#F6F5F1] transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-[#18232F]">
                    {p.name}
                  </td>
                  {roles.map((r) => {
                    const hasPerm = (p as any)[r.key];
                    return (
                      <td key={r.key} className="py-3.5 px-3 text-center">
                        {hasPerm ? (
                          <div className="w-5 h-5 mx-auto rounded-full bg-[#32765A]/15 text-[#32765A] flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 mx-auto rounded-full bg-[#EFEEE8] text-[#8A929C] flex items-center justify-center">
                            <X className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
