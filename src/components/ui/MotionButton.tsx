import { motion, type HTMLMotionProps } from "framer-motion";
import { useSfx } from "../../hooks/useSfx";

type MotionButtonProps = HTMLMotionProps<"button"> & {
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

const MotionButton = (props: MotionButtonProps) => {
  const {
    variant = "primary",
    className = "",
    onClick,
    disabled,
    ...rest
  } = props;
  const { play } = useSfx();
  const handleClick: MotionButtonProps["onClick"] = (event) => {
    if (!disabled) {
      play("click");
    }
    onClick?.(event);
  };
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition ${
        variants[variant]
      } ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    />
  );
};

export default MotionButton;
