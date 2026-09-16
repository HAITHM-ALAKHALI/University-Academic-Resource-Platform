import type { ReactNode } from "react";
import { FolderOpen } from "lucide-react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#323D59] text-[#7DA49F] shadow-inner mb-4 border border-white/[0.06]">
        {icon || <FolderOpen className="h-7 w-7" />}
      </div>
      <h3 className="text-base font-bold text-[#F8FAFC]">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-xs font-medium text-[#A5B4BF]">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;
