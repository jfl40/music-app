import { Artist, TrackWithPlaylist } from "@/helpers/types";
import { create } from "zustand";
import library from "@/assets/data/library.json";
import { Track } from "react-native-track-player";
import { useMemo } from "react";

interface LibraryState {
  tracks: TrackWithPlaylist[];
  toggleTrackFavourite: (track: Track) => void;
  addToPlaylist: (track: TrackWithPlaylist, playlistName: string) => void;
}

export const useLibraryStore = create<LibraryState>()((set) => ({
  tracks: library,
  toggleTrackFavourite: () => {},
  addToPlaylist: () => {},
}));

export const useTracks = () => useLibraryStore((state) => state.tracks);

export const useFavourites = () => {
  const tracks = useLibraryStore((state) => state.tracks);
  const toggleTrackFavourite = useLibraryStore(
    (state) => state.toggleTrackFavourite
  );

  const favourites = useMemo(
    () => tracks.filter((track) => track.rating === 1),
    [tracks]
  );

  return { favourites, toggleTrackFavourite };
};

export const useArtists = () => {
  const tracks = useLibraryStore((state) => state.tracks);

  return useMemo(() => {
    return tracks.reduce((acc, track) => {
      const existingArtist = acc.find((artist) => artist.name === track.artist);
      if (existingArtist) {
        existingArtist.tracks.push(track);
      } else {
        acc.push({
          name: track.artist ?? "Unknown",
          tracks: [track],
        });
      }

      return acc;
    }, [] as Artist[]);
  }, [tracks]);
};
