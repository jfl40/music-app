import { colours } from "@/constants/tokens";
import useAudioStore from "@/store/audioStore";
import { defaultStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Track } from "react-native-track-player";

type QueueControlsProps = {
  tracks: Track[];
} & ViewProps;

export const QueueControls = ({
  tracks,
  style,
  ...viewProps
}: QueueControlsProps) => {
  const playQueue = useAudioStore((state) => state.playQueue);
  const addQueue = useAudioStore((state) => state.addToQueue);
  const resetQueue = useAudioStore((state) => state.resetQueue);
  const handlePlay = async () => {
    resetQueue();
    addQueue(tracks);
    playQueue();
  };

  const handleShufflePlay = async () => {
    const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);

    resetQueue();
    addQueue(shuffledTracks);
    playQueue();
  };

  return (
    <View
      style={[{ flexDirection: "row", columnGap: 16 }, style]}
      {...viewProps}
    >
      {/* Play button */}
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={handlePlay}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Ionicons name="play" size={22} color={colours.primary} />

          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>

      {/* Shuffle button */}
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={handleShufflePlay}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Ionicons name={"shuffle-sharp"} size={24} color={colours.primary} />

          <Text style={styles.buttonText}>Shuffle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: "rgba(47, 47, 47, 0.5)",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
  },
  buttonText: {
    ...defaultStyles.text,
    color: colours.primary,
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
});
