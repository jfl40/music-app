import { ScrollView, View } from "react-native";
import { defaultStyles } from "@/styles";
import TracksList from "@/components/TracksList";
import { screenPadding } from "@/constants/tokens";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import library from "@/assets/data/library.json";
import { useMemo } from "react";
import { trackTitleFilter } from "@/helpers/filter";

export default function SongScreen() {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Search songs",
    },
  });

  const filteredTracks = useMemo(() => {
    if (!search) return library;

    return library.filter(trackTitleFilter(search));
  }, [search]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <TracksList tracks={filteredTracks} scrollEnabled={false} />
      </ScrollView>
    </View>
  );
}
