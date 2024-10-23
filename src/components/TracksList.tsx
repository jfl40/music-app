import TracksListItem from "./TrackListItem";
import { FlatListProps, FlatList, View, Text } from "react-native";
import { utilsStyles } from "@/styles";
import { Track } from "react-native-track-player";
import useAudioStore from "@/store/audioStore";
import { Image } from "expo-image";
import { unknownTrackImageUri } from "@/constants/images";

export type TracksListProps = Partial<FlatListProps<Track>> & {
  tracks: Track[];
};

const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginVertical: 10, marginLeft: 60 }}
  />
);

const TracksList = ({ tracks, ...FlatListProps }: TracksListProps) => {
  const handleTrackSelect = async (track: Track) => {
    await useAudioStore.getState().playTrack(track);
  };

  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
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
