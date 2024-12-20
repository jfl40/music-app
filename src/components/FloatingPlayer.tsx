import { unknownTrackImageUri } from "@/constants/images";
import useAudioStore from "@/store/audioStore";
import { defaultStyles } from "@/styles";
import { Image } from "expo-image";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from "react-native";
import { PlayPauseButton, SkipToNextButton } from "@/components/PlayerControls";
import { useLastActiveTrack } from "@/hooks/useLastActiveTrack";
import { MovingText } from "./MovingText";
import { useRouter } from "expo-router";

const StopPropagationWrapper = ({ children }) => (
  <TouchableWithoutFeedback onPress={(event) => event.stopPropagation()}>
    <View>{children}</View>
  </TouchableWithoutFeedback>
);
export const FloatingPlayer = ({ style }: ViewProps) => {
  const router = useRouter();
  const activeTrack = useAudioStore((state) => state.currentTrack);
  const lastActiveTrack = useLastActiveTrack();
  const displayedTrack = activeTrack ?? lastActiveTrack;

  const handlePress = () => {
    router.navigate("/player");
  };

  if (!displayedTrack) return null;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      style={[styles.container, style]}
    >
      <Image
        source={{
          uri: displayedTrack.artwork ?? unknownTrackImageUri,
        }}
        style={styles.trackArtworkImage}
      />

      <View style={styles.trackTitleContainer}>
        <MovingText
          style={styles.trackTitle}
          text={displayedTrack.title ?? ""}
          animationThreshold={25}
        />
      </View>

      <View style={styles.trackControlsContainer}>
        <StopPropagationWrapper>
          <PlayPauseButton iconSize={24} />
        </StopPropagationWrapper>

        <StopPropagationWrapper>
          <SkipToNextButton iconSize={24} />
        </StopPropagationWrapper>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    padding: 8,
    borderRadius: 12,
    paddingVertical: 10,
  },
  trackArtworkImage: {
    borderRadius: 8,
    width: 40,
    height: 40,
  },
  trackTitle: {
    ...defaultStyles.text,
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 10,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
    marginLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});
