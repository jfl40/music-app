import { unknownTrackImageUri } from "@/constants/images";
import { playlistNameFilter } from "@/helpers/filter";
import { Playlist } from "@/helpers/types";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { utilsStyles } from "@/styles";
import { Image } from "expo-image";
import { useMemo } from "react";
import { FlatList, FlatListProps, Text, View } from "react-native";
import { PlaylistListItem } from "@/components/PlaylistListItem";

type PlaylistListProps = {
  playlists: Playlist[];
  onPlaylistPress: (playlist: Playlist) => void;
} & Partial<FlatListProps<Playlist>>;

const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }}
  />
);

export const PlaylistList = ({
  playlists,
  onPlaylistPress: handlePlaylistPress,
  ...flatListProps
}: PlaylistListProps) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Search playlists",
    },
  });

  const filteredPlaylist = useMemo(() => {
    return playlists.filter(playlistNameFilter(search));
  }, [playlists, search]);

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
      ItemSeparatorComponent={ItemDivider}
      ListFooterComponent={ItemDivider}
      ListEmptyComponent={
        <View>
          <Text>No playlist found</Text>
          <Image
            source={{ uri: unknownTrackImageUri }}
            style={utilsStyles.emptyContentImage}
          />
        </View>
      }
      data={filteredPlaylist}
      renderItem={({ item: playlist }) => (
        <PlaylistListItem
          playlist={playlist}
          onPress={() => handlePlaylistPress(playlist)}
        />
      )}
      {...flatListProps}
    />
  );
};
