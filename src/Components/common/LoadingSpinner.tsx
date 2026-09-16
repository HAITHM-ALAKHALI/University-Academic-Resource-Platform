export interface LoadingSpinnerProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
}

export function LoadingSpinner({
  label = "جاري التحميل...",
  size = "md",
  fullPage = false,
}: LoadingSpinnerProps) {
  const sizeMap = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeMap[size]} animate-spin rounded-full border-[#7DA49F] border-t-transparent`}
      />
      {label && (
        <span className="text-xs font-semibold text-[#A5B4BF]">{label}</span>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#242D42]">
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-8">{content}</div>;
}

export default LoadingSpinner;
