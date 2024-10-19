import { create } from "zustand";
import { Audio, AVPlaybackStatus } from "expo-av";

interface AudioState {
  isPlaying: boolean;
  sound: Audio.Sound | null;
  currentTrack: string | null;

  playTrack: (url: string) => Promise<void>;
  pauseTrack: () => Promise<void>;
  resumeTrack: () => Promise<void>;
  stopTrack: () => Promise<void>;
  configureAudioMode: () => Promise<void>;
}

const useAudioStore = create<AudioState>()((set, get) => ({
  isPlaying: false,
  sound: null,
  currentTrack: null,

  playTrack: async (uri: string) => {
    const { sound: currentSound } = get();
    if (currentSound) {
      await currentSound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri });
    set({ sound: newSound, currentTrack: uri, isPlaying: true });

    newSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
      if (status.isLoaded && status.didJustFinish) {
        set({ isPlaying: false });
      }
    });
  },

  resumeTrack: async () => {
    const { sound } = get();
    if (sound) {
      await sound.playAsync();
      set({ isPlaying: true });
    }
  },

  pauseTrack: async () => {
    const { sound } = get();
    if (sound) {
      await sound.pauseAsync();
      set({ isPlaying: false });
    }
  },

  stopTrack: async () => {
    const currentSound = get().sound;
    if (currentSound) {
      await currentSound.stopAsync();
      set({ isPlaying: false, currentTrack: null, sound: null });
    }
  },

  configureAudioMode: async () => {
    try {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        playThroughEarpieceAndroid: true,
      });
    } catch (error) {
      console.error("Error configuring the audio player: ", error);
    }
  },
}));

export default useAudioStore;
