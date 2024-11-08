import { Stack } from "expo-router";
import { View } from "react-native";
import { defaultStyles } from "@/styles";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { colours } from "@/constants/tokens";

export default function ArtistsScreenLayout() {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ ...StackScreenWithSearchBar, headerTitle: "Artists" }}
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
