import type { ReactNode } from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-[#7DA49F]/20 text-[#9DBFB8] border border-[#7DA49F]/40",
  secondary: "bg-[#323D59] text-[#F8FAFC] border border-white/[0.07]",
  accent: "bg-[#899C9A]/20 text-[#AABCAF] border border-[#899C9A]/30",
  success: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  warning: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  danger: "bg-red-500/20 text-red-300 border border-red-500/30",
  neutral: "bg-white/[0.06] text-[#A5B4BF] border border-white/[0.08]",
};

export function Badge({
  children,
  variant = "primary",
  size = "md",
  className = "",
}: BadgeProps) {
  const sizeStyle =
    size === "sm"
      ? "px-2 py-0.5 text-[10px] rounded-md"
      : "px-2.5 py-1 text-xs rounded-lg";

  return (
    <span
      className={`inline-flex items-center justify-center font-bold tracking-tight select-none ${sizeStyle} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
