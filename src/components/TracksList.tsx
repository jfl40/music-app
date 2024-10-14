import library from "@/assets/data/library.json";
import TracksListItem from "./TrackListItem";
import { FlatListProps, FlatList, View } from "react-native";
import { utilsStyles } from "@/styles";

export type TracksListProps = Partial<FlatListProps<unknown>> & {
  tracks: any[];
};

const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginVertical: 10, marginLeft: 60 }}
  />
);

const TracksList = ({ tracks, ...FlatListProps }: TracksListProps) => (
  <FlatList
    data={tracks}
    contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
    ListFooterComponent={ItemDivider}
    ItemSeparatorComponent={ItemDivider}
    renderItem={({ item: track }) => (
      <TracksListItem
        track={{
          ...track,
          image: track.artwork,
        }}
      />
    )}
    {...FlatListProps}
  />
);

export default TracksList;
