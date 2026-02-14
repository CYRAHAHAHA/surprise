import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import MotionButton from "../ui/MotionButton";
import { Question } from "../../data/config";
import { randomBetween } from "../../utils/random";
import { useSfx } from "../../hooks/useSfx";
import { assetUrl } from "../../utils/assetUrl";

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
  const bubbleBoundsRef = useRef<HTMLDivElement | null>(null);
  const { play } = useSfx();

  const activeCopy = question.sceneCopy ?? copy;

  // Play transition sound when clicking "Next Question"
  const handleNext = () => {
    play("transition");
    onNext();
  };

  const bubbles = useMemo<Bubble[]>(
    () => {
      if (!question.memories.length) {
        return [];
      }
      const containerWidth = 700;
      const containerHeight = 450;
      const bubbleDiameter = 112;
      const bubbleRadius = bubbleDiameter / 2;
      const minX = (bubbleRadius / containerWidth) * 100;
      const maxX = 100 - minX;
      const minY = (bubbleRadius / containerHeight) * 100;
      const maxY = 100 - minY;
      const minDistance = (bubbleDiameter / containerWidth) * 100 * 1.15;
      const scaleY = 700 / 450;
      const targetCenterX = 30;
      const targetCenterY = 30;
      const maxDriftX = 140;
      const maxDriftY = 140;
      const maxTangential = 140;
      const clamp = (value: number, min: number, max: number) =>
        Math.min(Math.max(value, min), max);

      const rows = 3;
      const cols = 4;
      const centers: Array<{ x: number; y: number }> = [];
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          centers.push({
            x: minX + ((c + 0.5) / cols) * (maxX - minX),
            y: minY + ((r + 0.5) / rows) * (maxY - minY),
          });
        }
      }
      const points = question.memories.map((_, idx) => {
        const center = centers[idx % centers.length];
        return {
          x: clamp(center.x + randomBetween(-14, 14), minX, maxX),
          y: clamp(center.y + randomBetween(-12, 12), minY, maxY),
        };
      });

      for (let iter = 0; iter < 90; iter += 1) {
        let moved = false;
        for (let i = 0; i < points.length; i += 1) {
          for (let j = i + 1; j < points.length; j += 1) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const dist = Math.sqrt(dx * dx + (dy * scaleY) * (dy * scaleY));
            if (dist > 0 && dist < minDistance) {
              const push = (minDistance - dist) / 2;
              const nx = dx / dist;
              const ny = (dy * scaleY) / dist;
              points[i].x += nx * push;
              points[i].y += (ny / scaleY) * push;
              points[j].x -= nx * push;
              points[j].y -= (ny / scaleY) * push;
              moved = true;
            } else if (dist === 0) {
              const angle = Math.random() * Math.PI * 2;
              const nudge = minDistance * 0.05;
              points[i].x += Math.cos(angle) * nudge;
              points[i].y += Math.sin(angle) * nudge;
              points[j].x -= Math.cos(angle) * nudge;
              points[j].y -= Math.sin(angle) * nudge;
              moved = true;
            }
          }
        }
        if (!moved) {
          break;
        }
        for (const point of points) {
          point.x = clamp(point.x, minX, maxX);
          point.y = clamp(point.y, minY, maxY);
        }
      }

      for (let iter = 0; iter < 3; iter += 1) {
        const avgX =
          points.reduce((sum, point) => sum + point.x, 0) / points.length;
        const avgY =
          points.reduce((sum, point) => sum + point.y, 0) / points.length;
        const shiftX = targetCenterX - avgX;
        const shiftY = targetCenterY - avgY;
        for (const point of points) {
          point.x = clamp(point.x + shiftX, minX, maxX);
          point.y = clamp(point.y + shiftY, minY, maxY);
        }
      }

      return points.map((point) => {
        const startX = clamp(point.x, minX, maxX);
        const startY = clamp(point.y, minY, maxY);
        const leftPx = ((startX - minX) / 100) * containerWidth;
        const rightPx = ((maxX - startX) / 100) * containerWidth;
        const topPx = ((startY - minY) / 100) * containerHeight;
        const bottomPx = ((maxY - startY) / 100) * containerHeight;
        const dxPx = ((startX - targetCenterX) / 100) * containerWidth;
        const dyPx = ((startY - targetCenterY) / 100) * containerHeight;
        const vecLen = Math.hypot(dxPx, dyPx) || 1;
        const unitX = dxPx / vecLen;
        const unitY = dyPx / vecLen;
        const allowOutX = dxPx >= 0 ? rightPx : leftPx;
        const allowOutY = dyPx >= 0 ? bottomPx : topPx;
        const allowInX = dxPx >= 0 ? leftPx : rightPx;
        const allowInY = dyPx >= 0 ? topPx : bottomPx;
        const outLimitX =
          Math.abs(unitX) > 0.001 ? allowOutX / Math.abs(unitX) : Number.POSITIVE_INFINITY;
        const outLimitY =
          Math.abs(unitY) > 0.001 ? allowOutY / Math.abs(unitY) : Number.POSITIVE_INFINITY;
        const inLimitX =
          Math.abs(unitX) > 0.001 ? allowInX / Math.abs(unitX) : Number.POSITIVE_INFINITY;
        const inLimitY =
          Math.abs(unitY) > 0.001 ? allowInY / Math.abs(unitY) : Number.POSITIVE_INFINITY;
        const outLimit = Math.min(outLimitX, outLimitY, maxDriftX, maxDriftY);
        const inLimit = Math.min(inLimitX, inLimitY, maxDriftX, maxDriftY);
        const radialFloor = outLimit < 20 ? -inLimit * 0.7 : -inLimit * 0.3;
        const radialMag = randomBetween(radialFloor, outLimit);

        const perpX = -unitY;
        const perpY = unitX;
        const tangentialLimitX =
          Math.abs(perpX) > 0.001
            ? (perpX >= 0 ? rightPx : leftPx) / Math.abs(perpX)
            : Number.POSITIVE_INFINITY;
        const tangentialLimitY =
          Math.abs(perpY) > 0.001
            ? (perpY >= 0 ? bottomPx : topPx) / Math.abs(perpY)
            : Number.POSITIVE_INFINITY;
        const tangentialLimit = Math.min(tangentialLimitX, tangentialLimitY, maxTangential);
        const tangentialMag = randomBetween(-tangentialLimit, tangentialLimit);

        let driftX = unitX * radialMag + perpX * tangentialMag;
        let driftY = unitY * radialMag + perpY * tangentialMag;
        driftX = clamp(driftX, -leftPx, rightPx);
        driftY = clamp(driftY, -topPx, bottomPx);
        return {
          startX,
          startY,
          driftX,
          driftY,
          duration: randomBetween(12, 20),
        };
      });
    },
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
    play("click");
    setSelected(option);
    const isCorrect = option === question.answer;
    onAnswered?.(isCorrect, option);
    play(isCorrect ? "correct" : "incorrect");
    setPhase("feedback");
    const timer = window.setTimeout(() => setPhase("memories"), 900);
    setFeedbackTimer(timer);
  };

  const renderBubbleMedia = (url: string) => {
    const resolved = assetUrl(url);
    if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return (
        <video
          src={resolved}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      );
    }
    return <img src={resolved} alt="memory" className="h-full w-full object-cover" />;
  };

  return (
    <motion.div
      className="mx-auto flex w-full max-w-3xl flex-col gap-4"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <GlassCard
        className={`mx-auto w-full ${isCompact ? "p-3" : "p-5"}`}
        transparent={phase === "memories"}
      >
        {phase !== "memories" ? (
          <div className="flex flex-col gap-4">
            <div className="text-xs uppercase tracking-[0.3em] text-ink/50">
              Question {index + 1} of {total}
            </div>
            <h2 className="font-display text-xl text-ink md:text-2xl">
              {question.text}
            </h2>
            <div className="grid gap-2 md:grid-cols-2">
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
                  ? activeCopy?.correctText ?? "Perfectly right."
                  : activeCopy?.incorrectText ??
                  "Still adorable. Here's the memory."}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div
              ref={bubbleBoundsRef}
              className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-white/60 bg-white/30"
            >
              {question.memories.map((memory, idx) => (
                <motion.div
                  key={`${memory.url}-${idx}`}
                  className="absolute flex w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
                  style={{
                    left: `${bubbles[idx]?.startX ?? 50}%`,
                    top: `${bubbles[idx]?.startY ?? 50}%`,
                  }}
                  drag
                  dragConstraints={bubbleBoundsRef}
                  dragElastic={0.2}
                  dragMomentum={false}
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
                  <div className="h-24 w-24 overflow-hidden rounded-full border border-white/70 shadow-lg">
                    {renderBubbleMedia(memory.url)}
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-ink/70 text-center">
              {activeCopy?.memoryHint ??
                "Little bubbles drifting through my favorite moments."}
            </p>
            {showNext ? (
              <MotionButton onClick={handleNext}>{nextLabel}</MotionButton>
            ) : (
              <div className="text-xs uppercase tracking-[0.3em] text-ink/40 text-center">
                {activeCopy?.loadingText ?? "Collecting the next moment..."}
              </div>
            )}
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
};

export default SceneQuestion;
