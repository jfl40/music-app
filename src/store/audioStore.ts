import { create } from "zustand";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Track } from "react-native-track-player";

interface AudioState {
  isPlaying: boolean;
  sound: Audio.Sound | null;
  currentTrack: Track | null;
  queue: Track[];
  currentTrackIndex: number;
  position: number;
  duration: number;

  playTrack: (track: Track) => Promise<void>;
  playQueue: (tracks: Track[], startIndex?: number) => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  pauseTrack: () => Promise<void>;
  resumeTrack: () => Promise<void>;
  stopTrack: () => Promise<void>;
  configureAudioMode: () => Promise<void>;
}

const useAudioStore = create<AudioState>()((set, get) => ({
  isPlaying: false,
  sound: null,
  currentTrack: null,
  queue: [],
  currentTrackIndex: 0,
  position: 0,
  duration: 0,

  playTrack: async (track: Track) => {
    const currentSound = get().sound;
    if (currentSound) {
      await currentSound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: track.url,
    });

    set({ sound: newSound, currentTrack: track });
    await newSound.playAsync();
    set({ isPlaying: true });

    newSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
      if (status.isLoaded) {
        set({
          position: status.positionMillis,
          duration: status.durationMillis,
        });
      }
    });
  },

  playQueue: async (tracks: Track[], startIndex = 0) => {
    set({ queue: tracks, currentTrackIndex: startIndex });
    const trackToPlay = tracks[startIndex];
    if (trackToPlay) {
      await get().playTrack(trackToPlay);
    }
  },

  nextTrack: async () => {
    const queue = get().queue;
    const nextIndex = get().currentTrackIndex + 1;

    if (nextIndex < queue.length) {
      set({ currentTrackIndex: nextIndex });
      const nextTrack = queue[nextIndex];
      await get().playTrack(nextTrack);
    }
  },

  previousTrack: async () => {
    const queue = get().queue;
    const prevIndex = get().currentTrackIndex - 1;

    if (prevIndex >= 0) {
      set({ currentTrackIndex: prevIndex });
      const prevTrack = queue[prevIndex];
      await get().playTrack(prevTrack);
    }
  },

  resumeTrack: async () => {
    const sound = get().sound;
    if (sound) {
      await sound.playAsync();
      set({ isPlaying: true });
    }
  },

  pauseTrack: async () => {
    const sound = get().sound;
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
