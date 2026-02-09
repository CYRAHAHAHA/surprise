import SceneController from "./components/SceneController";
import { appConfig } from "./data/config";
import { SfxProvider } from "./hooks/useSfx";

const App = () => {
  return (
    <div className="min-h-screen px-4 py-10 md:px-10">
      <SfxProvider sfx={appConfig.sfx}>
        <SceneController />
      </SfxProvider>
    </div>
  );
};

export default App;
