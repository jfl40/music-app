import TracksList from "@/components/TracksList";
import { defaultStyles } from "@/styles";
import { ScrollView, View } from "react-native";
import { screenPadding } from "@/constants/tokens";
import { useMemo } from "react";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useFavourites } from "@/store/library";
import { trackTitleFilter } from "@/helpers/filter";

const FavouritesScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: "Search favourites",
    },
  });
  const favouriteTracks = useFavourites().favourites;

  const filteredFavouriteTracks = useMemo(() => {
    if (!search) return favouriteTracks;
    return favouriteTracks.filter(trackTitleFilter(search));
  }, [search, favouriteTracks]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TracksList scrollEnabled={false} tracks={filteredFavouriteTracks} />
      </ScrollView>
    </View>
  );
};

export default FavouritesScreen;
