"use client";

import React, { useState, useEffect } from "react";
import { AuditLog } from "@/types";
import { getAdminAuditLogs } from "@/lib/api/client";
import { formatDate } from "@/lib/utils";
import { Activity, Shield, CheckCircle2, AlertCircle } from "lucide-react";

export function AuditLogsViewer() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    getAdminAuditLogs().then(setLogs);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#18232F]">
          Platform Security & Audit Trail
        </h1>
        <p className="text-xs sm:text-sm text-[#68717D] mt-1">
          Immutable audit record of all administrative operations, content publications, and refund transactions.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4E2DA] shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E4E2DA] text-[#8A929C] uppercase font-semibold">
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Actor Email</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Action Event</th>
                <th className="py-3 px-3">Target Record</th>
                <th className="py-3 px-3">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E2DA]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F6F5F1] transition-colors">
                  <td className="py-3.5 px-3 font-mono text-[11px] text-[#68717D]">
                    {formatDate(log.timestamp)}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-[#18232F]">
                    {log.actorEmail}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-[#203B53]/10 text-[#203B53]">
                      {log.actorRole.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-[#B89555]">
                    {log.action}
                  </td>
                  <td className="py-3.5 px-3 text-[#18232F]">{log.targetRecord}</td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 font-bold text-[10px] bg-[#32765A]/15 text-[#32765A] px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> {log.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
