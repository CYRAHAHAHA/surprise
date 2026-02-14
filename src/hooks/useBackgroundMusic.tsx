import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { Howl } from "howler";
import { assetUrl } from "../utils/assetUrl";

export type BackgroundMusicConfig = {
    enabled: boolean;
    src: string;
    volume: number;
    loop: boolean;
};

type BackgroundMusicContextValue = {
    isPlaying: boolean;
    toggle: () => void;
    play: () => void;
    pause: () => void;
    setVolume: (volume: number) => void;
};

const BackgroundMusicContext = createContext<BackgroundMusicContextValue>({
    isPlaying: false,
    toggle: () => { },
    play: () => { },
    pause: () => { },
    setVolume: () => { },
});

export const BackgroundMusicProvider = ({
    config,
    children,
}: {
    config?: BackgroundMusicConfig;
    children: React.ReactNode;
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const howlRef = useRef<Howl | null>(null);

    // Initialize Howl
    useEffect(() => {
        if (!config?.enabled || !config.src) return;

        const howl = new Howl({
            src: [assetUrl(config.src)],
            volume: config.volume ?? 0.3,
            loop: config.loop ?? true,
            preload: true,
            html5: true, // Better for long audio files
        });

        howlRef.current = howl;

        return () => {
            howl.unload();
        };
    }, [config?.enabled, config?.src, config?.volume, config?.loop]);

    // Music will be triggered manually after password unlock
    // (no auto-play on first interaction)

    const play = useCallback(() => {
        if (howlRef.current && !isPlaying) {
            howlRef.current.play();
            setIsPlaying(true);
        }
    }, [isPlaying]);

    const pause = useCallback(() => {
        if (howlRef.current && isPlaying) {
            howlRef.current.pause();
            setIsPlaying(false);
        }
    }, [isPlaying]);

    const toggle = useCallback(() => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }, [isPlaying, play, pause]);

    const setVolume = useCallback((volume: number) => {
        if (howlRef.current) {
            howlRef.current.volume(volume);
        }
    }, []);

    return (
        <BackgroundMusicContext.Provider value={{ isPlaying, toggle, play, pause, setVolume }}>
            {children}
        </BackgroundMusicContext.Provider>
    );
};

export const useBackgroundMusic = () => useContext(BackgroundMusicContext);
