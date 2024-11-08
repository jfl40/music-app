import { trackTitleFilter } from "@/helpers/filter";
import { Artist } from "@/helpers/types";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useMemo } from "react";
import TracksList from "./TracksList";
import { generateTrackListId } from "@/helpers/miscellaneous";
import { StyleSheet, Text, View } from "react-native";
import { defaultStyles } from "@/styles";
import { fontSize } from "@/constants/tokens";
import { Image } from "expo-image";
import { unknownArtistImageUri } from "@/constants/images";
import { QueueControls } from "./QueueControls";

export const ArtistTracksList = ({ artist }: { artist: Artist }) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      hideWhenScrolling: true,
      placeholder: "Search tracks",
    },
  });

  const filteredArtistTracks = useMemo(() => {
    return artist.tracks.filter(trackTitleFilter(search));
  }, [search, artist.tracks]);

  return (
    <TracksList
      id={generateTrackListId(artist.name, search)}
      scrollEnabled={false}
      hideQueueControls={true}
      ListHeaderComponent={
        <View>
          <View style={styles.artworkImageContainer}>
            <Image
              source={{ uri: unknownArtistImageUri }}
              style={styles.artistImage}
            />
          </View>
          <Text numberOfLines={1} style={styles.artistNameText}>
            {artist.name}
          </Text>
          {search.length === 0 && (
            <QueueControls
              tracks={filteredArtistTracks}
              style={{ paddingTop: 24 }}
            />
          )}
        </View>
      }
      tracks={artist.tracks}
    />
  );
};

const styles = StyleSheet.create({
  artistHeaderContainer: {
    flex: 1,
    marginBottom: 32,
  },
  artworkImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 200,
  },
  artistImage: {
    width: "60%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 128,
  },
  artistNameText: {
    ...defaultStyles.text,
    marginTop: 22,
    textAlign: "center",
    fontSize: fontSize.lg,
    fontWeight: "800",
  },
});
