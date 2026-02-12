import SceneController from "./components/SceneController";
import { appConfig } from "./data/config";
import { SfxProvider } from "./hooks/useSfx";
import { BackgroundMusicProvider } from "./hooks/useBackgroundMusic";
import { BackgroundProvider, BackgroundImage } from "./hooks/useBackground";
import MusicToggle from "./components/ui/MusicToggle";

const App = () => {
  return (
    <BackgroundProvider backgrounds={appConfig.backgrounds}>
      <BackgroundMusicProvider config={appConfig.backgroundMusic}>
        <BackgroundImage />
        <div className="h-screen overflow-hidden px-3 py-6 md:px-6">
          <SfxProvider sfx={appConfig.sfx}>
            <SceneController />
          </SfxProvider>
        </div>
        <MusicToggle />
      </BackgroundMusicProvider>
    </BackgroundProvider>
  );
};

export default App;
