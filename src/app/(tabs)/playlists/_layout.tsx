import { Stack } from "expo-router";
import { View } from "react-native";
import { defaultStyles } from "@/styles";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { colours } from "@/constants/tokens";

export default function PlaylistScreenLayout() {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ ...StackScreenWithSearchBar, headerTitle: "Playlists" }}
        />
        <Stack.Screen
          name="[name]"
          options={{
            headerTitle: "",
            headerBackVisible: true,
            headerStyle: {
              backgroundColor: colours.background,
            },
            headerTintColor: colours.primary,
          }}
        />
      </Stack>
    </View>
  );
}
