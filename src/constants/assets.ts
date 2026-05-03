import soundOnIcon from '../assets/toggleSound/sound-on.svg';
import soundOffIcon from '../assets/toggleSound/sound-off.svg';

export const ASSETS = {
  ICONS: {
    GEM: "/icons/gem.png",
    MINE: "/icons/mine.png",
  },
  SOUND_ICONS: {
    ON: soundOnIcon,
    OFF: soundOffIcon,
  },
  SOUNDS: {
    CLICK: "/sounds/onClick.mp3",
    WIN: "/sounds/win.mp3",
    LOSE: "/sounds/lose.wav",
  }
} as const;
