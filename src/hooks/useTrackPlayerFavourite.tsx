import useAudioStore from "@/store/audioStore";
import { useFavourites } from "@/store/library";
import { useCallback } from "react";

export const useTrackPlayerFavourite = () => {
  const activeTrack = useAudioStore((state) => state.currentTrack);

  const { favourites, toggleTrackFavourite } = useFavourites();

  const isFavourite =
    favourites.find((track) => track.url === activeTrack?.url)?.rating === 1;

  const toggleFavourite = useCallback(() => {
    // Didn't find reason to update state of audioStore tracks in queue as all favourite data comes from library store

    if (activeTrack) {
      toggleTrackFavourite(activeTrack);
    }
  }, [toggleTrackFavourite, activeTrack]);

  return { isFavourite, toggleFavourite };
};
