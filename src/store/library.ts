import { Artist, Playlist, TrackWithPlaylist } from "@/helpers/types";
import { create } from "zustand";
import library from "@/assets/data/library.json";
import { Track } from "react-native-track-player";
import { useMemo } from "react";
import { unknownTrackImageUri } from "@/constants/images";

interface LibraryState {
  tracks: TrackWithPlaylist[];
  toggleTrackFavourite: (track: Track) => void;
  addToPlaylist: (track: TrackWithPlaylist, playlistName: string) => void;
}

export const useLibraryStore = create<LibraryState>()((set) => ({
  tracks: library,
  toggleTrackFavourite: (track) =>
    set((state) => ({
      tracks: state.tracks.map((currentTrack) => {
        if (currentTrack.url === track.url) {
          return {
            ...currentTrack,
            rating: currentTrack.rating === 1 ? 0 : 1,
          };
        }
        return currentTrack;
      }),
    })),

  addToPlaylist: (track, playlistName) => {
    set((state) => ({
      tracks: state.tracks.map((currentTrack) => {
        if (currentTrack.url === track.url) {
          return {
            ...currentTrack,
            playlist: [...(currentTrack.playlist ?? []), playlistName],
          };
        }
        return currentTrack;
      }),
    }));
  },
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

export const usePlaylists = () => {
  const tracks = useLibraryStore((state) => state.tracks);

  const playlists = useMemo(() => {
    return tracks.reduce((acc, track) => {
      track.playlist?.forEach((playlistName) => {
        const existingPlaylist = acc.find(
          (playlist) => playlist.name === playlistName
        );

        if (existingPlaylist) {
          existingPlaylist.tracks.push(track);
        } else {
          acc.push({
            name: playlistName,
            tracks: [track],
            artworkPreview: track.artwork ?? unknownTrackImageUri,
          });
        }
      });

      return acc;
    }, [] as Playlist[]);
  }, [tracks]);

  const addToPlaylist = useLibraryStore((state) => state.addToPlaylist);
  return { playlists, addToPlaylist };
};
