import { ScrollView, View } from "react-native";
import { defaultStyles } from "@/styles";
import TracksList from "@/components/TracksList";
import { screenPadding } from "@/constants/tokens";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useMemo } from "react";
import { trackTitleFilter } from "@/helpers/filter";
import { useTracks } from "@/store/library";
import { generateTrackListId } from "@/helpers/miscellaneous";

export default function SongScreen() {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Search songs",
    },
  });

  const tracks = useTracks();

  const filteredTracks = useMemo(() => {
    if (!search) return tracks;

    return tracks.filter(trackTitleFilter(search));
  }, [search, tracks]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <TracksList
          id={generateTrackListId("songs", search)}
          tracks={filteredTracks}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}
