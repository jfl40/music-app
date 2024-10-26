// import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import useAudioStore from "@/store/audioStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const App = () => {
  // const handleTrackPlayerLoaded = useCallback(() => {
  //   SplashScreen.hideAsync();
  // }, []);

  // useSetupTrackPlayer({
  //   onLoad: handleTrackPlayerLoaded,
  // });

  const { configureAudioMode } = useAudioStore();

  useEffect(() => {
    configureAudioMode();
    SplashScreen.hideAsync();
  }, [configureAudioMode]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigation />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
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
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default App;
