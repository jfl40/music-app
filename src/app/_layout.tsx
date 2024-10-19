// import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreen } from "expo-router";
import { useCallback, useEffect } from "react";
import useAudioStore from "@/store/audioStore";

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
      <RootNavigation />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default App;
