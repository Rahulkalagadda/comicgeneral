import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "green" | "red" | "outline";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-surface-secondary text-primary-token border-theme",
    gold: "bg-[#B89555]/15 text-[#B89555] border-[#B89555]/30 font-semibold",
    green: "bg-[#32765A]/15 text-[#32765A] border-[#32765A]/30 font-semibold",
    red: "bg-red-500/15 text-red-600 border-red-500/30 font-semibold",
    outline: "bg-transparent text-secondary-token border-theme",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
