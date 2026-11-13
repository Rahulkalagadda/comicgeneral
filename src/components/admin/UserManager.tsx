"use client";

import React, { useState, useEffect } from "react";
import { User, Entitlement } from "@/types";
import { getAdminUsers } from "@/lib/api/client";
import { SEED_ENTITLEMENTS } from "@/lib/api/seedData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import {
  Users,
  Search,
  ShieldCheck,
  ShieldAlert,
  Key,
  CheckCircle2,
  Lock,
} from "lucide-react";

export function UserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getAdminUsers().then(setUsers);
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === "active" ? "suspended" : "active";
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#18232F]">
          User Management & Entitlement Audits
        </h1>
        <p className="text-xs sm:text-sm text-[#68717D] mt-1">
          Inspect user accounts, verify issued backend access signatures, and enforce governance permissions.
        </p>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E4E2DA] flex items-center gap-3">
        <Search className="w-4 h-4 text-[#8A929C]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by user name, corporate email, or role..."
          className="flex-1 bg-transparent text-xs text-[#18232F] focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-xs text-[#68717D] hover:text-[#18232F]"
          >
            Clear
          </button>
        )}
      </div>

      {/* USERS TABLE */}
      <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4E2DA] shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E4E2DA] text-[#8A929C] uppercase font-semibold">
                <th className="py-3 px-3">User</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Entitlements</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Member Since</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E2DA]">
              {filteredUsers.map((u) => {
                const userEntitlements = SEED_ENTITLEMENTS.filter((e) => e.userId === u.id);
                return (
                  <tr key={u.id} className="hover:bg-[#F6F5F1] transition-colors">
                    <td className="py-3.5 px-3">
                      <p className="font-semibold text-[#18232F]">{u.name}</p>
                      <p className="text-[11px] text-[#68717D]">{u.email}</p>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#203B53]/10 text-[#203B53]">
                        {u.role.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-flex items-center gap-1 font-semibold text-[#B89555]">
                        <Key className="w-3.5 h-3.5" />
                        {userEntitlements.length} Active Key(s)
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      {u.status === "active" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#32765A]/15 text-[#32765A]">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-600">
                          <Lock className="w-3 h-3" /> Suspended
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-[#68717D]">
                      {formatDate(u.createdAt)}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedUser(u)}
                          className="px-2.5 py-1 rounded bg-[#EFEEE8] hover:bg-[#E4E2DA] font-semibold text-[#203B53] text-[11px]"
                        >
                          Keys
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-2.5 py-1 rounded font-semibold text-[11px] ${
                            u.status === "active"
                              ? "bg-red-50 text-red-600 hover:bg-red-100"
                              : "bg-green-50 text-green-700 hover:bg-green-100"
                          }`}
                        >
                          {u.status === "active" ? "Suspend" : "Reactivate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* USER ENTITLEMENTS MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#E4E2DA] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4E2DA] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#18232F]">
                  Cryptographic Entitlements
                </h3>
                <p className="text-xs text-[#68717D]">{selectedUser.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="text-xs font-semibold text-[#68717D] hover:text-[#18232F]"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              {SEED_ENTITLEMENTS.filter((e) => e.userId === selectedUser.id).length === 0 ? (
                <p className="text-xs text-[#68717D] py-4 text-center">
                  No explicit entitlements granted yet.
                </p>
              ) : (
                SEED_ENTITLEMENTS.filter((e) => e.userId === selectedUser.id).map((ent) => (
                  <div
                    key={ent.id}
                    className="p-3 rounded-xl bg-[#F6F5F1] border border-[#E4E2DA] space-y-1 text-xs"
                  >
                    <div className="flex justify-between font-semibold text-[#18232F]">
                      <span className="uppercase text-[10px] text-[#B89555]">
                        {ent.contentType}
                      </span>
                      <span>Target: {ent.contentId}</span>
                    </div>
                    <p className="font-mono text-[10px] text-[#68717D] truncate">
                      Signature: {ent.verifiedBackendSignature}
                    </p>
                    <p className="text-[10px] text-[#8A929C]">
                      Granted: {formatDate(ent.grantedAt)}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setSelectedUser(null)}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
