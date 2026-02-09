import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import SceneHook from "./SceneHook";
import SceneQuestion from "./SceneQuestion";
import SceneProposal from "./SceneProposal";
import { AppConfig, Question } from "../../data/config";

type SnapshotItem =
  | { key: string; type: "intro" }
  | { key: string; type: "question"; question: Question }
  | { key: string; type: "proposal" };

type SceneSnapshotProps = {
  config: AppConfig;
};

const SceneSnapshot = ({ config }: SceneSnapshotProps) => {
  const [active, setActive] = useState<SnapshotItem | null>(null);

  const items = useMemo<SnapshotItem[]>(
    () => [
      { key: "intro", type: "intro" },
      ...config.questions.map((question) => ({
        key: `q-${question.id}`,
        type: "question" as const,
        question,
      })),
      { key: "proposal", type: "proposal" },
    ],
    [config.questions]
  );

  const rowLayout = [4, 3, 3, 4];
  const rows = useMemo(() => {
    const built: SnapshotItem[][] = [];
    let cursor = 0;
    rowLayout.forEach((count) => {
      built.push(items.slice(cursor, cursor + count));
      cursor += count;
    });
    return built;
  }, [items]);

  return (
    <motion.div
      className="mx-auto flex w-full max-w-6xl flex-col gap-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <GlassCard className="p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-display text-3xl text-ink">
              {config.snapshot.title}
            </h2>
            <p className="text-sm text-ink/70">{config.snapshot.subtitle}</p>
          </div>
          <div className="flex flex-col gap-3">
            {rows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))`,
                }}
              >
                {row.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActive(item)}
                    className="group flex min-h-[120px] flex-col justify-between rounded-3xl border border-white/60 bg-white/60 p-4 text-left transition hover:scale-[1.01]"
                  >
                    <div className="text-xs uppercase tracking-[0.3em] text-ink/50">
                      {item.type === "intro"
                        ? "Intro"
                        : item.type === "proposal"
                          ? "Finale"
                          : `Q${item.question.id}`}
                    </div>
                    <div className="mt-4 text-sm font-semibold text-ink">
                      {item.type === "intro"
                        ? config.intro.title
                        : item.type === "proposal"
                          ? config.proposal.message
                          : item.question.text}
                    </div>
                    <span className="mt-2 text-xs text-rose/80">Tap to replay</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-5xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute -top-12 right-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink"
              >
                Back to Grid
              </button>
              {active.type === "intro" ? (
                <SceneHook
                  title={config.intro.title}
                  message={config.intro.message}
                  videoUrl={config.intro.videoUrl}
                  primaryCta={config.intro.primaryCta}
                  secondaryCta={config.intro.secondaryCta}
                  onContinue={() => setActive(null)}
                  isCompact
                />
              ) : null}
              {active.type === "proposal" ? (
                <SceneProposal
                  title={config.proposal.title}
                  message={config.proposal.message}
                  audioUrl={config.proposal.audioUrl}
                  yesText={config.proposal.yesText}
                  noText={config.proposal.noText}
                  successMessage={config.proposal.successMessage}
                  onAccept={() => setActive(null)}
                  isCompact
                />
              ) : null}
              {active.type === "question" ? (
                <SceneQuestion
                  question={active.question}
                  index={active.question.id - 1}
                  total={config.questions.length}
                  nextLabel="Back to Grid"
                  onNext={() => setActive(null)}
                  copy={config.questionScene}
                  isCompact
                />
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default SceneSnapshot;
