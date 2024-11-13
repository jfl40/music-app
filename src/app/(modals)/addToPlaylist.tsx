import { PlaylistList } from "@/components/PlaylistList";
import { Playlist } from "@/helpers/types";
import useAudioStore from "@/store/audioStore";
import { usePlaylists, useTracks } from "@/store/library";
import { useQueue } from "@/store/queueStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Track } from "react-native-track-player";
import { useHeaderHeight } from "@react-navigation/elements";
import { StyleSheet } from "react-native";
import { defaultStyles } from "@/styles";
import { screenPadding } from "@/constants/tokens";

const AddToPlaylistModal = () => {
  const router = useRouter();
  const headerHeight = useHeaderHeight();

  const { trackUrl } = useLocalSearchParams<{ trackUrl: Track["url"] }>();
  const { activeQueueId } = useQueue();
  const addToQueue = useAudioStore((state) => state.addToQueue);

  const tracks = useTracks();

  const { playlists, addToPlaylist } = usePlaylists();

  const track = tracks.find((track) => track.url === trackUrl);

  if (!track) return null;

  const availablePlaylists = playlists.filter(
    (playlist) =>
      !playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url)
  );

  const handlePlaylistPress = (playlist: Playlist) => {
    addToPlaylist(track, playlist.name);

    router.dismiss();
    if (activeQueueId?.startsWith(playlist.name)) {
      addToQueue(track);
    }
  };

  return (
    <SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
      <PlaylistList
        playlists={availablePlaylists}
        onPlaylistPress={handlePlaylistPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
  },
});

export default AddToPlaylistModal;
