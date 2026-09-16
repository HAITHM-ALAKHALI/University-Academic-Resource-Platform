import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glowColor?: string;
  isHoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      glowColor,
      isHoverable = false,
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={style}
        className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#323D59] p-6 shadow-lg transition-all duration-300 ${
          isHoverable
            ? "hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-2xl hover:bg-[#3B4868] cursor-pointer"
            : ""
        } ${className}`}
        {...props}
      >
        {glowColor && (
          <div
            className="absolute -top-10 -left-10 h-32 w-32 rounded-full opacity-[0.12] blur-xl pointer-events-none transition-transform duration-500 group-hover:scale-125"
            style={{ background: glowColor }}
          />
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
