import useSound from "use-sound";
import { ASSETS } from "../constants/assets";
import { useGameStore } from "../store/useGameStore";

export const useGameSounds = () => {
  const isMuted = useGameStore((state) => state.isMuted);

  const [playClick] = useSound(ASSETS.SOUNDS.CLICK, { soundEnabled: !isMuted });
  const [playWin] = useSound(ASSETS.SOUNDS.WIN, { soundEnabled: !isMuted });
  const [playLose] = useSound(ASSETS.SOUNDS.LOSE, { soundEnabled: !isMuted });

  return {
    playClick,
    playWin,
    playLose,
  };
};
