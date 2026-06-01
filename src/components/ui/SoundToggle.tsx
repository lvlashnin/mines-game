import { useGameStore } from "../../store/useGameStore";
import { ASSETS } from "../../constants/assets";
import { useGameSounds } from "../../hooks/useGameSounds";

export const SoundToggle = () => {
  const isMuted = useGameStore((state) => state.isMuted);
  const toggleMute = useGameStore((state) => state.toggleMute);
  const { playClick } = useGameSounds();

  const handleToggle = () => {
    toggleMute();
    playClick();
  };

  return (
    <button
      onClick={handleToggle}
      className="absolute top-4 right-4 md:top-6 md:right-8 z-50 flex items-center justify-center p-2.5 sm:p-3 rounded-full bg-game-panel/80 hover:bg-game-panel border border-white/10 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group"
      aria-label={isMuted ? "Unmute sound" : "Mute sound"}
    >
      <img
        src={isMuted ? ASSETS.SOUND_ICONS.OFF : ASSETS.SOUND_ICONS.ON}
        alt={isMuted ? "Sound Off" : "Sound On"}
        className="w-5 h-5 sm:w-6 sm:h-6 opacity-70 group-hover:opacity-100 transition-opacity"
      />
    </button>
  );
};
