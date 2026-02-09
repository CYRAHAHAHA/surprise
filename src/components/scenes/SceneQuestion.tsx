import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import MotionButton from "../ui/MotionButton";
import { Question } from "../../data/config";
import { randomBetween } from "../../utils/random";

type SceneQuestionProps = {
  question: Question;
  index: number;
  total: number;
  onNext: () => void;
  onAnswered?: (isCorrect: boolean, selected: string) => void;
  nextLabel?: string;
  isCompact?: boolean;
  copy?: {
    correctText: string;
    incorrectText: string;
    memoryHint: string;
    loadingText: string;
  };
};

type Bubble = {
  startX: number;
  startY: number;
  driftX: number;
  driftY: number;
  duration: number;
};

const SceneQuestion = ({
  question,
  index,
  total,
  onNext,
  onAnswered,
  nextLabel = "Next Question",
  isCompact,
  copy,
}: SceneQuestionProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<"question" | "feedback" | "memories">(
    "question"
  );
  const [showNext, setShowNext] = useState(false);
  const [feedbackTimer, setFeedbackTimer] = useState<number | null>(null);

  const bubbles = useMemo<Bubble[]>(
    () =>
      question.memories.map(() => ({
        startX: 50 + randomBetween(-25, 25),
        startY: 50 + randomBetween(-25, 25),
        driftX: randomBetween(-60, 60),
        driftY: randomBetween(-60, 60),
        duration: randomBetween(10, 18),
      })),
    [question.memories]
  );

  useEffect(() => {
    if (phase === "memories") {
      const timer = window.setTimeout(() => setShowNext(true), 3000);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [phase]);

  useEffect(() => {
    return () => {
      if (feedbackTimer) {
        window.clearTimeout(feedbackTimer);
      }
    };
  }, [feedbackTimer]);

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    const isCorrect = option === question.answer;
    onAnswered?.(isCorrect, option);
    setPhase("feedback");
    const timer = window.setTimeout(() => setPhase("memories"), 900);
    setFeedbackTimer(timer);
  };

  const renderBubbleMedia = (url: string) => {
    if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return (
        <video
          src={url}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      );
    }
    return <img src={url} alt="memory" className="h-full w-full object-cover" />;
  };

  return (
    <motion.div
      className="mx-auto flex w-full max-w-3xl flex-col gap-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <GlassCard className={`mx-auto w-full min-h-[520px] ${isCompact ? "p-4" : "p-8"}`}>
        {phase !== "memories" ? (
          <div className="flex flex-col gap-6">
            <div className="text-xs uppercase tracking-[0.3em] text-ink/50">
              Question {index + 1} of {total}
            </div>
            <h2 className="font-display text-2xl text-ink md:text-3xl">
              {question.text}
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {question.options.map((option) => {
                const isSelected = selected === option;
                const isCorrect = option === question.answer;
                const feedbackClass = selected
                  ? isCorrect
                    ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                    : isSelected
                      ? "border-rose bg-rose/10 text-rose"
                      : "border-white/60 bg-white/60 text-ink"
                  : "border-white/60 bg-white/60 text-ink";
                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${feedbackClass}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {phase === "feedback" ? (
              <p className="text-sm font-semibold text-ink/70">
                {selected === question.answer
                  ? copy?.correctText ?? "Perfectly right."
                  : copy?.incorrectText ?? "Still adorable. Here's the memory."}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="relative mx-auto h-[450px] w-full max-w-[700px] overflow-hidden rounded-3xl border border-white/60 bg-white/50">
              {question.memories.map((memory, idx) => (
                <motion.div
                  key={`${memory.url}-${idx}`}
                  className="absolute flex w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
                  style={{
                    left: `${bubbles[idx]?.startX ?? 50}%`,
                    top: `${bubbles[idx]?.startY ?? 50}%`,
                  }}
                  animate={{
                    x: [0, bubbles[idx]?.driftX ?? 0],
                    y: [0, bubbles[idx]?.driftY ?? 0],
                  }}
                  transition={{
                    duration: bubbles[idx]?.duration ?? 12,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <div className="h-28 w-28 overflow-hidden rounded-full border border-white/70 shadow-lg">
                    {renderBubbleMedia(memory.url)}
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-ink/70">
              {copy?.memoryHint ?? "Little bubbles drifting through my favorite moments."}
            </p>
            {showNext ? (
              <MotionButton onClick={onNext}>{nextLabel}</MotionButton>
            ) : (
              <div className="text-xs uppercase tracking-[0.3em] text-ink/40">
                {copy?.loadingText ?? "Collecting the next moment..."}
              </div>
            )}
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
};

export default SceneQuestion;
