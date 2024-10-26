import { colours } from "@/constants/tokens";
import useAudioStore from "@/store/audioStore";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

export const PlayerVolumeBar = ({ style }: ViewProps) => {
  const [volume, setVolume] = useState(0.5);
  const sound = useAudioStore((state) => state.sound);

  const setSliderValue = async (value: number) => {
    if (sound) {
      await sound.setVolumeAsync(value);
    }
    setVolume(value);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="volume-low"
          size={20}
          color={colours.icon}
          style={{ opacity: 0.8 }}
        />

        <View style={styles.sliderContainer}>
          <Slider
            value={volume}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={colours.minimumTrackTintColor}
            maximumTrackTintColor={colours.maximumTrackTintColor}
            onSlidingComplete={(value) => {
              setSliderValue(value);
            }}
          />
        </View>

        <Ionicons
          name="volume-high"
          size={20}
          color={colours.icon}
          style={{ opacity: 0.8 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  sliderContainer: {
    flex: 1,
    marginHorizontal: 10, // Ensures padding for slider
  },
});
