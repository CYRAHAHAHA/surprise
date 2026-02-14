import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Howl } from "howler";
import { assetUrl } from "../utils/assetUrl";

export type SfxSounds = {
  click?: string;
  correct?: string;
  incorrect?: string;
  transition?: string;
  success?: string;
};

export type SfxConfig = {
  enabled?: boolean;
  volume?: number;
  sounds?: SfxSounds;
};

type SfxContextValue = {
  play: (key: keyof SfxSounds) => void;
  enabled: boolean;
};

const SfxContext = createContext<SfxContextValue>({
  play: () => { },
  enabled: false,
});

export const SfxProvider = ({
  sfx,
  children,
}: {
  sfx?: SfxConfig;
  children: React.ReactNode;
}) => {
  const enabled = sfx?.enabled !== false;
  const volume = sfx?.volume ?? 0.4;
  const sounds = useMemo(() => sfx?.sounds ?? {}, [sfx]);
  const howlRef = useRef<Record<string, Howl>>({});

  useEffect(() => {
    if (!enabled) return;
    const entries = Object.entries(sounds);
    const next: Record<string, Howl> = {};
    for (const [key, src] of entries) {
      if (!src) continue;
      next[key] = new Howl({
        src: [assetUrl(src)],
        volume,
        preload: true,
      });
    }
    howlRef.current = next;
    return () => {
      Object.values(next).forEach((howl) => howl.unload());
    };
  }, [enabled, sounds, volume]);

  const play = useCallback(
    (key: keyof SfxSounds) => {
      if (!enabled) return;
      const howl = howlRef.current[key as string];
      if (!howl) return;
      try {
        howl.stop();
        howl.play();
      } catch {
        // ignore autoplay restrictions
      }
    },
    [enabled]
  );

  return (
    <SfxContext.Provider value={{ play, enabled }}>
      {children}
    </SfxContext.Provider>
  );
};

export const useSfx = () => useContext(SfxContext);
