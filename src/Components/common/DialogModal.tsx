import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

export interface DialogModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  maxWidth?: string;
}

export function DialogModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-xl",
}: DialogModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      dir="rtl"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${maxWidth} overflow-hidden rounded-2xl border border-white/[0.08] bg-[#242D42] shadow-2xl animate-scaleUp`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4 bg-[#323D59]/50">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#F8FAFC]">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 text-xs text-[#A5B4BF]">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#A5B4BF] hover:bg-white/[0.06] hover:text-[#F8FAFC] transition-colors cursor-pointer border-0 bg-transparent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default DialogModal;
