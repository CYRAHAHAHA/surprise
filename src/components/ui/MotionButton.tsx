import { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

type MotionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants: Record<NonNullable<MotionButtonProps["variant"]>, string> = {
  primary:
    "bg-rose text-white shadow-glow hover:shadow-xl focus-visible:ring-2 focus-visible:ring-rose",
  secondary:
    "bg-white/80 text-ink border border-white/70 hover:bg-white focus-visible:ring-2 focus-visible:ring-rose",
  ghost:
    "bg-transparent text-ink/50 border border-white/40 cursor-not-allowed opacity-60",
};

const MotionButton = ({
  variant = "primary",
  className = "",
  ...props
}: MotionButtonProps) => {
  return (
    <motion.button
      whileHover={props.disabled ? {} : { scale: 1.03 }}
      whileTap={props.disabled ? {} : { scale: 0.98 }}
      className={`rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition ${
        variants[variant]
      } ${className}`}
      {...props}
    />
  );
};

export default MotionButton;
