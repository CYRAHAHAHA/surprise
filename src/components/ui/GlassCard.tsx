import { HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  transparent?: boolean;
};

const GlassCard = ({ className = "", transparent = false, ...props }: GlassCardProps) => {
  const baseClass = transparent ? "glass-card-transparent" : "glass-card";
  return (
    <div
      className={`${baseClass} rounded-3xl border border-white/60 p-6 shadow-glow transition-all duration-500 ${className}`}
      {...props}
    />
  );
};

export default GlassCard;
