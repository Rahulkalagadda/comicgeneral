import React, { Suspense } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F6F5F1]">
          <div className="w-8 h-8 border-2 border-[#203B53] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AdminLayout>{children}</AdminLayout>
    </Suspense>
  );
}
