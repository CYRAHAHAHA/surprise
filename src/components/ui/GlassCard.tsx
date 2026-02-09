import { HTMLAttributes } from "react";

const GlassCard = ({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`glass-card rounded-3xl border border-white/60 p-6 shadow-glow ${className}`}
      {...props}
    />
  );
};

export default GlassCard;
