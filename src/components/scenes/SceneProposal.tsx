import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import MotionButton from "../ui/MotionButton";

type SceneProposalProps = {
  title: string;
  message: string;
  audioUrl: string;
  yesText: string;
  noText: string;
  successMessage: string;
  onAccept: () => void;
  isCompact?: boolean;
};

const SceneProposal = ({
  title,
  message,
  audioUrl,
  yesText,
  noText,
  successMessage,
  onAccept,
  isCompact,
}: SceneProposalProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [swap, setSwap] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);

  useEffect(() => {
    const attemptPlay = async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
      } catch {
        setAudioBlocked(true);
      }
    };
    attemptPlay();
  }, [audioUrl]);

  return (
    <motion.div
      className="mx-auto flex w-full max-w-3xl flex-col gap-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <GlassCard className={`mx-auto w-full min-h-[520px] ${isCompact ? "p-4" : "p-8"}`}>
        <div className="flex flex-col gap-4 text-center">
          <h2 className="font-display text-3xl text-ink">{title}</h2>
          <p className="text-lg text-ink/70">{message}</p>
          <audio ref={audioRef} src={audioUrl} autoPlay />
          {audioBlocked ? (
            <button
              onClick={() => audioRef.current?.play()}
              className="text-xs uppercase tracking-[0.3em] text-ink/60"
            >
              Tap to play the song
            </button>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4" role="group">
            <motion.div layout className={swap ? "order-2" : "order-1"}>
              <MotionButton onClick={onAccept}>{yesText}</MotionButton>
            </motion.div>
            <motion.div layout className={swap ? "order-1" : "order-2"}>
              <MotionButton
                variant="secondary"
                onMouseEnter={() => setSwap((prev) => !prev)}
                onFocus={() => setSwap((prev) => !prev)}
              >
                {swap ? yesText : noText}
              </MotionButton>
            </motion.div>
          </div>
          <p className="text-sm text-ink/60">{successMessage}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default SceneProposal;
