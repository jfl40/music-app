import TracksListItem from "./TrackListItem";
import { FlatListProps, FlatList, View, Text } from "react-native";
import { utilsStyles } from "@/styles";
import { Track } from "react-native-track-player";
import useAudioStore from "@/store/audioStore";
import { Image } from "expo-image";
import { unknownTrackImageUri } from "@/constants/images";
import { useQueue } from "@/store/queueStore";
import { useRef } from "react";
import { QueueControls } from "./QueueControls";

export type TracksListProps = Partial<FlatListProps<Track>> & {
  id: string;
  tracks: Track[];
  hideQueueControls?: boolean;
};

const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginVertical: 10, marginLeft: 60 }}
  />
);

const TracksList = ({
  id,
  tracks,
  hideQueueControls = false,
  ...FlatListProps
}: TracksListProps) => {
  const queueOffset = useRef(0);
  const resetQueue = useAudioStore((state) => state.resetQueue);
  const addQueue = useAudioStore((state) => state.addToQueue);
  const playQueue = useAudioStore((state) => state.playQueue);
  const { activeQueueId, setActiveQueueId } = useQueue();

  const handleTrackSelect = async (selectedTrack: Track) => {
    const trackIndex = tracks.findIndex(
      (track) => selectedTrack.url === track.url
    );
    if (trackIndex === -1) return;

    const isChangingQueue = id !== activeQueueId;

    if (isChangingQueue) {
      const beforeTracks = tracks.slice(0, trackIndex);
      const afterTracks = tracks.slice(trackIndex + 1);

      resetQueue();

      addQueue(selectedTrack);
      addQueue(afterTracks);
      addQueue(beforeTracks);

      playQueue();

      queueOffset.current = trackIndex;
      setActiveQueueId(id);
    } else {
      const nextTrackIndex =
        trackIndex - queueOffset.current < 0
          ? tracks.length + trackIndex - queueOffset.current
          : trackIndex - queueOffset.current;

      playQueue(nextTrackIndex);
    }
  };

  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ListHeaderComponent={
        !hideQueueControls ? (
          <QueueControls tracks={tracks} style={{ paddingBottom: 20 }} />
        ) : undefined
      }
      ListFooterComponent={ItemDivider}
      ItemSeparatorComponent={ItemDivider}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No songs found</Text>
          <Image
            source={{ uri: unknownTrackImageUri }}
            style={utilsStyles.emptyContentImage}
          />
        </View>
      }
      renderItem={({ item: track }) => (
        <TracksListItem track={track} onTrackSelect={handleTrackSelect} />
      )}
      {...FlatListProps}
    />
  );
};

export default TracksList;
