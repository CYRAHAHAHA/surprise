import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { BackgroundConfig } from "../data/config";

export type SceneType = "password" | "intro" | "question" | "proposal" | "snapshot" | "default";

type BackgroundContextValue = {
    currentBackground: string;
    setScene: (scene: SceneType) => void;
    setCustomBackground: (url: string | undefined) => void;
    backgrounds: BackgroundConfig | null;
};

const BackgroundContext = createContext<BackgroundContextValue>({
    currentBackground: "",
    setScene: () => { },
    setCustomBackground: () => { },
    backgrounds: null,
});

export const BackgroundProvider = ({
    backgrounds,
    children,
}: {
    backgrounds: BackgroundConfig;
    children: React.ReactNode;
}) => {
    const [currentScene, setCurrentScene] = useState<SceneType>("password");
    const [customBackground, setCustomBackgroundState] = useState<string | undefined>(undefined);

    const getBackgroundForScene = useCallback(
        (scene: SceneType): string => {
            const sceneMap: Record<SceneType, keyof BackgroundConfig> = {
                password: "passwordScene",
                intro: "introScene",
                question: "questionScene",
                proposal: "proposalScene",
                snapshot: "snapshotScene",
                default: "default",
            };
            return backgrounds[sceneMap[scene]] || backgrounds.default;
        },
        [backgrounds]
    );

    // Use custom background if set, otherwise use scene background
    const currentBackground = customBackground || getBackgroundForScene(currentScene);

    const setScene = useCallback((scene: SceneType) => {
        setCurrentScene(scene);
        // Clear custom background when changing scenes (unless it's the question scene)
        if (scene !== "question") {
            setCustomBackgroundState(undefined);
        }
    }, []);

    const setCustomBackground = useCallback((url: string | undefined) => {
        setCustomBackgroundState(url);
    }, []);

    return (
        <BackgroundContext.Provider value={{ currentBackground, setScene, setCustomBackground, backgrounds }}>
            {children}
        </BackgroundContext.Provider>
    );
};

export const useBackground = () => useContext(BackgroundContext);

// Component that renders the actual background
export const BackgroundImage = () => {
    const { currentBackground } = useBackground();
    const [displayedBackground, setDisplayedBackground] = useState<string>("");
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (!currentBackground) return;
        if (currentBackground === displayedBackground) return;

        // Preload the new image before transitioning
        const img = new Image();
        img.onload = () => {
            setIsTransitioning(true);
            // Small delay to allow fade out
            setTimeout(() => {
                setDisplayedBackground(currentBackground);
                setIsTransitioning(false);
            }, 300);
        };
        img.onerror = () => {
            // On error, just set it anyway (will show nothing)
            setDisplayedBackground(currentBackground);
        };
        img.src = currentBackground;
    }, [currentBackground, displayedBackground]);

    if (!displayedBackground) return null;

    return (
        <div className="fixed inset-0 -z-10 p-3 md:p-4">
            <div
                className="relative h-full w-full overflow-hidden rounded-2xl"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
                    style={{
                        backgroundImage: `url(${displayedBackground})`,
                        opacity: isTransitioning ? 0.7 : 1,
                    }}
                />
                {/* Subtle overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40" />
            </div>
        </div>
    );
};
