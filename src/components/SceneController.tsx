import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScenePassword from "./scenes/ScenePassword";
import SceneHook from "./scenes/SceneHook";
import SceneQuestion from "./scenes/SceneQuestion";
import SceneProposal from "./scenes/SceneProposal";
import SceneSnapshot from "./scenes/SceneSnapshot";
import { appConfig } from "../data/config";
import { useSfx } from "../hooks/useSfx";
import { useBackground, SceneType } from "../hooks/useBackground";
import { useBackgroundMusic } from "../hooks/useBackgroundMusic";

type SceneKey = "password" | "hook" | "question" | "proposal" | "snapshot";

// Map internal scene keys to background scene types
const sceneToBackgroundMap: Record<SceneKey, SceneType> = {
  password: "password",
  hook: "intro",
  question: "question",
  proposal: "proposal",
  snapshot: "snapshot",
};

type Answer = {
  id: number;
  selected: string;
  correct: boolean;
};

const SceneController = () => {
  const [scene, setScene] = useState<SceneKey>("password");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const { play } = useSfx();
  const { setScene: setBackgroundScene, setCustomBackground } = useBackground();
  const { play: playMusic } = useBackgroundMusic();
  const previousScene = useRef<SceneKey>("password");

  const handlePasswordSuccess = () => {
    playMusic(); // Start background music after password unlocked
    setScene("hook");
  };
  const handleSecret = () => setScene("snapshot");
  const handleIntroContinue = () => setScene("question");

  const handleAnswered = (correct: boolean, selected: string) => {
    const question = appConfig.questions[currentQuestion];
    setAnswers((prev) => {
      const existing = prev.find((ans) => ans.id === question.id);
      if (existing) {
        return prev.map((ans) =>
          ans.id === question.id ? { ...ans, correct, selected } : ans
        );
      }
      return [...prev, { id: question.id, correct, selected }];
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < appConfig.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      return;
    }
    setScene("proposal");
  };

  const handleAccept = () => setScene("snapshot");

  // Update background when scene changes
  useEffect(() => {
    setBackgroundScene(sceneToBackgroundMap[scene]);
  }, [scene, setBackgroundScene]);

  // Update custom background when question changes
  useEffect(() => {
    if (scene === "question") {
      const question = appConfig.questions[currentQuestion];
      setCustomBackground(question.backdrop);
    }
  }, [scene, currentQuestion, setCustomBackground]);

  useEffect(() => {
    if (previousScene.current !== scene) {
      play("transition");
      previousScene.current = scene;
    }
  }, [scene, play]);

  const sceneVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <div className="relative h-full flex flex-col justify-center">
      <div className="pointer-events-none absolute -top-10 left-10 h-24 w-24 rounded-full bg-softpink/40 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-16 h-32 w-32 rounded-full bg-lavender/70 blur-3xl" />
      <AnimatePresence mode="wait">
        {scene === "password" ? (
          <motion.div
            key="password"
            {...sceneVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ScenePassword
              password={appConfig.password}
              copy={appConfig.passwordScene}
              onSuccess={handlePasswordSuccess}
              onSecret={handleSecret}
            />
          </motion.div>
        ) : null}
        {scene === "hook" ? (
          <motion.div
            key="hook"
            {...sceneVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SceneHook
              title={appConfig.intro.title}
              message={appConfig.intro.message}
              videoUrl={appConfig.intro.videoUrl}
              videoUrls={appConfig.intro.videoUrls}
              primaryCta={appConfig.intro.primaryCta}
              secondaryCta={appConfig.intro.secondaryCta}
              onContinue={handleIntroContinue}
            />
          </motion.div>
        ) : null}
        {scene === "question" ? (
          <motion.div
            key={`question-${currentQuestion}`}
            {...sceneVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SceneQuestion
              question={appConfig.questions[currentQuestion]}
              index={currentQuestion}
              total={appConfig.questions.length}
              onNext={handleNextQuestion}
              onAnswered={handleAnswered}
              copy={appConfig.questionScene}
              nextLabel={
                currentQuestion === appConfig.questions.length - 1
                  ? "Final Moment"
                  : "Next Question"
              }
            />
          </motion.div>
        ) : null}
        {scene === "proposal" ? (
          <motion.div
            key="proposal"
            {...sceneVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SceneProposal
              title={appConfig.proposal.title}
              message={appConfig.proposal.message}
              audioUrl={appConfig.proposal.audioUrl}
              yesText={appConfig.proposal.yesText}
              noText={appConfig.proposal.noText}
              successMessage={appConfig.proposal.successMessage}
              onAccept={handleAccept}
            />
          </motion.div>
        ) : null}
        {scene === "snapshot" ? (
          <motion.div
            key="snapshot"
            {...sceneVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SceneSnapshot config={appConfig} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {(() => {
        const statusText =
          scene === "snapshot"
            ? "Your answers are saved in your heart."
            : answers.length
              ? `${answers.filter((ans) => ans.correct).length}/${appConfig.questions.length
              } correct so far.`
              : "";
        return statusText ? (
          <div className="mt-6 text-center text-xs text-ink/40">{statusText}</div>
        ) : null;
      })()}
    </div>
  );
};

export default SceneController;
