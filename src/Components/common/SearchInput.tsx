import { forwardRef, type InputHTMLAttributes } from "react";
import { Search, X } from "lucide-react";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  containerClassName?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      onClear,
      placeholder = "بحث...",
      containerClassName = "",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`relative w-full ${containerClassName}`}>
        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7DA49F] pointer-events-none" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-white/[0.07] bg-[#323D59] py-2.5 pr-10 pl-9 text-sm text-[#F8FAFC] placeholder-[#7A8A9B] outline-none transition-all duration-200 focus:border-[#7DA49F]/50 focus:ring-2 focus:ring-[#7DA49F]/15 ${className}`}
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              if (onClear) onClear();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-[#A5B4BF] hover:bg-white/[0.1] hover:text-[#F8FAFC] transition-colors border-0 bg-transparent cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
