import { StackScreenWithSearchBar } from "@/src/constants/layout";
import { defaultStyles } from "@/src/styles";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function FavouritesScreenLayout() {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ ...StackScreenWithSearchBar, headerTitle: "Favourites" }}
        />
      </Stack>
    </View>
  );
}