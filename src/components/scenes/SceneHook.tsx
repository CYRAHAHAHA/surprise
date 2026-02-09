import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import MotionButton from "../ui/MotionButton";

type SceneHookProps = {
  title: string;
  message: string;
  videoUrl: string;
  primaryCta: string;
  secondaryCta: string;
  onContinue: () => void;
  isCompact?: boolean;
};

const SceneHook = ({
  title,
  message,
  videoUrl,
  primaryCta,
  secondaryCta,
  onContinue,
  isCompact,
}: SceneHookProps) => {
  return (
    <motion.div
      className="mx-auto flex w-full max-w-3xl flex-col gap-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <GlassCard className={isCompact ? "p-4" : "p-8"}>
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-3xl border border-white/60">
            <video
              className={`w-full object-cover ${isCompact ? "h-44 md:h-52" : "h-56 md:h-72"}`}
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <div>
            <h2 className="font-display text-3xl text-ink">{title}</h2>
            <p className="mt-2 text-base text-ink/70">{message}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MotionButton onClick={onContinue}>{primaryCta}</MotionButton>
            <MotionButton variant="ghost" disabled>
              {secondaryCta}
            </MotionButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default SceneHook;
