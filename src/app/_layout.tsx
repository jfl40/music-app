import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import useAudioStore from "@/store/audioStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { colours } from "@/constants/tokens";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const { configureAudioMode } = useAudioStore();

  useEffect(() => {
    configureAudioMode();
    SplashScreen.hideAsync();
  }, [configureAudioMode]);

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigation />
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="player"
        options={{
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "vertical",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(modals)/addToPlaylist"
        options={{
          presentation: "modal",
          headerStyle: {
            backgroundColor: colours.background,
          },
          headerTitle: "Add to playlist",
          headerTitleStyle: {
            color: colours.text,
          },
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default App;
