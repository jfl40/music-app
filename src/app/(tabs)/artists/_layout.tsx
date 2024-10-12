import { Stack } from "expo-router";
import { View } from "react-native";
import { defaultStyles } from "@/src/styles";
import { StackScreenWithSearchBar } from "@/src/constants/layout";

export default function ArtistsScreenLayout() {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ ...StackScreenWithSearchBar, headerTitle: "Artists" }}
        />
      </Stack>
    </View>
  );
}