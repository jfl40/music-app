import useAudioStore from "@/store/audioStore";
import { useEffect, useState } from "react";
import { Track } from "react-native-track-player";

export const useLastActiveTrack = () => {
  const activeTrack = useAudioStore((state) => state.currentTrack);
  const [lastActiveTrack, setLastActiveTrack] = useState<Track | null>();

  useEffect(() => {
    if (!activeTrack) return;

    setLastActiveTrack(activeTrack);
  }, [activeTrack]);

  return lastActiveTrack;
};
