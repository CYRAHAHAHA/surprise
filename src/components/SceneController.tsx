import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ScenePassword from "./scenes/ScenePassword";
import SceneHook from "./scenes/SceneHook";
import SceneQuestion from "./scenes/SceneQuestion";
import SceneProposal from "./scenes/SceneProposal";
import SceneSnapshot from "./scenes/SceneSnapshot";
import { appConfig } from "../data/config";

type SceneKey = "password" | "hook" | "question" | "proposal" | "snapshot";

type Answer = {
  id: number;
  selected: string;
  correct: boolean;
};

const SceneController = () => {
  const [scene, setScene] = useState<SceneKey>("password");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handlePasswordSuccess = () => setScene("hook");
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

  const sceneVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-10 left-10 h-32 w-32 rounded-full bg-softpink/40 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-24 h-48 w-48 rounded-full bg-lavender/70 blur-3xl" />
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

      {scene === "question" || scene === "proposal" ? (
        <div className="mt-10 flex justify-center gap-2 text-xs text-ink/50">
          {appConfig.questions.map((question) => (
            <span
              key={question.id}
              className={`h-2 w-2 rounded-full ${
                currentQuestion >= question.id - 1
                  ? "bg-rose"
                  : "bg-white/70"
              }`}
            />
          ))}
        </div>
      ) : null}
      {(() => {
        const statusText =
          scene === "snapshot"
            ? "Your answers are saved in your heart."
            : answers.length
              ? `${answers.filter((ans) => ans.correct).length}/${
                  appConfig.questions.length
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
