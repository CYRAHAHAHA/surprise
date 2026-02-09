import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import MotionButton from "../ui/MotionButton";
import { useSfx } from "../../hooks/useSfx";

type ScenePasswordCopy = {
  title: string;
  subtitle: string;
  label: string;
  placeholder: string;
  buttonText: string;
  errorText: string;
};

type ScenePasswordProps = {
  password: string;
  copy: ScenePasswordCopy;
  onSuccess: () => void;
  onSecret?: () => void;
};

const ScenePassword = ({
  password,
  copy,
  onSuccess,
  onSecret,
}: ScenePasswordProps) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [secretTriggered, setSecretTriggered] = useState(false);
  const { play } = useSfx();

  useEffect(() => {
    if (secretTriggered) return;
    if (value.trim().toLowerCase() === "kellygoh") {
      setSecretTriggered(true);
      setError("");
      onSecret?.();
    }
  }, [value, secretTriggered, onSecret]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value.trim().toLowerCase() === password.toLowerCase()) {
      setError("");
      play("success");
      onSuccess();
    } else {
      setError(copy.errorText);
      play("incorrect");
    }
  };

  return (
    <motion.div
      className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <GlassCard className="mx-auto w-full min-h-[520px]">
        <h1 className="mb-2 font-display text-3xl text-ink">{copy.title}</h1>
        <p className="mb-6 text-sm text-ink/70">{copy.subtitle}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-left text-xs uppercase tracking-[0.3em] text-ink/50">
            {copy.label}
          </label>
          <input
            type="password"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-base font-semibold text-ink shadow-sm outline-none focus:border-rose focus:ring-2 focus:ring-rose/50"
            placeholder={copy.placeholder}
          />
          {error ? <p className="text-sm text-rose">{error}</p> : null}
          <MotionButton type="submit" className="mt-2">
            {copy.buttonText}
          </MotionButton>
        </form>
      </GlassCard>
    </motion.div>
  );
};

export default ScenePassword;
