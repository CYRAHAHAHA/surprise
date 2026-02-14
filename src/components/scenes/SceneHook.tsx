import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import MotionButton from "../ui/MotionButton";
import { assetUrl } from "../../utils/assetUrl";

type SceneHookProps = {
  title: string;
  message: string;
  videoUrl?: string;
  videoUrls?: string[];
  primaryCta: string;
  secondaryCta: string;
  onContinue: () => void;
  isCompact?: boolean;
};

const SceneHook = ({
  title,
  message,
  videoUrl,
  videoUrls,
  primaryCta,
  secondaryCta,
  onContinue,
  isCompact,
}: SceneHookProps) => {
  const sources = videoUrls && videoUrls.length ? videoUrls : videoUrl ? [videoUrl] : [];
  return (
    <motion.div
      className="mx-auto flex w-full max-w-3xl flex-col gap-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <GlassCard className={`mx-auto w-full min-h-[520px] ${isCompact ? "p-4" : "p-8"}`}>
        <div className="flex flex-col gap-4">
          <div
            className={`grid gap-3 ${
              sources.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
            }`}
          >
            {sources.map((src) => (
              <div
                key={src}
                className="overflow-hidden rounded-3xl border border-white/60"
              >
                <video
                  className={`w-full object-cover ${
                    isCompact ? "h-44 md:h-52" : "h-56 md:h-72"
                  }`}
                  src={assetUrl(src)}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            ))}
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
