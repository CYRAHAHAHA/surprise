import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import SceneHook from "./SceneHook";
import SceneQuestion from "./SceneQuestion";
import SceneProposal from "./SceneProposal";
import { AppConfig, Question } from "../../data/config";
import { assetUrl } from "../../utils/assetUrl";

type SnapshotItem =
  | { key: string; type: "intro" }
  | { key: string; type: "question"; question: Question }
  | { key: string; type: "proposal" };

type SceneSnapshotProps = {
  config: AppConfig;
};

const SceneSnapshot = ({ config }: SceneSnapshotProps) => {
  const [active, setActive] = useState<SnapshotItem | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
                {row.map((item) => {
                  // Determine the background image for this card
                  const getBackgroundImage = () => {
                    if (item.type === "intro") {
                      return config.backgrounds.introScene;
                    } else if (item.type === "proposal") {
                      return config.backgrounds.proposalScene;
                    } else if (item.type === "question") {
                      return item.question.backdrop || config.backgrounds.questionScene;
                    }
                    return config.backgrounds.default;
                  };

                  return (
                    <button
                      key={item.key}
                      onClick={() => setActive(item)}
                      className="group relative flex min-h-[120px] flex-col justify-between overflow-hidden rounded-3xl border border-white/40 p-4 text-left transition hover:scale-[1.02]"
                      style={{
                        backgroundImage: `url(${assetUrl(getBackgroundImage())})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {/* Semi-transparent overlay for text readability */}
                      <div className="absolute inset-0 bg-white/40" />

                      {/* Photo preview icon — top-right */}
                      <div
                        role="button"
                        tabIndex={0}
                        title="View montage"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewImage(assetUrl(getBackgroundImage()));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                            setPreviewImage(assetUrl(getBackgroundImage()));
                          }
                        }}
                        className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-ink/60 shadow-sm transition hover:bg-white hover:text-ink hover:scale-110"
                      >
                        {/* Camera / image icon (SVG) */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path fillRule="evenodd" d="M1 8a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 8.07 3h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 16.07 6H17a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8Zm9 3a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" clipRule="evenodd" />
                        </svg>
                      </div>

                      {/* Content on top of overlay */}
                      <div className="relative z-10 flex h-full flex-col justify-between">
                        <div className="text-xs uppercase tracking-[0.3em] text-ink/70 drop-shadow-sm">
                          {item.type === "intro"
                            ? "Intro"
                            : item.type === "proposal"
                              ? "Finale"
                              : `Q${item.question.id}`}
                        </div>
                        <div className="mt-4 text-sm font-semibold text-ink drop-shadow-sm">
                          {item.type === "intro"
                            ? config.intro.title
                            : item.type === "proposal"
                              ? config.proposal.message
                              : item.question.text}
                        </div>
                        <span className="mt-2 text-xs font-medium text-rose drop-shadow-sm">Tap to replay</span>
                      </div>
                    </button>
                  );
                })}
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
                  videoUrls={config.intro.videoUrls}
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

      {/* Full-screen montage preview modal */}
      <AnimatePresence>
        {previewImage ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-[90vw]"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-10 right-0 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink shadow-md transition hover:bg-white"
              >
                ✕ Close
              </button>
              <img
                src={previewImage}
                alt="Montage preview"
                className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default SceneSnapshot;
