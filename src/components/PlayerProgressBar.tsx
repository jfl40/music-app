import { StyleSheet, Text, View, ViewProps } from "react-native";
import Slider from "@react-native-community/slider";
import useAudioStore from "@/store/audioStore";
import { formatSecondsToMinutes } from "@/helpers/miscellaneous";
import { colours, fontSize } from "@/constants/tokens";
import { useState } from "react";
import { defaultStyles } from "@/styles";

export const PlayerProgressBar = ({ style }: ViewProps) => {
  const position = useAudioStore((state) => state.position);
  const duration = useAudioStore((state) => state.duration);

  const [isSliding, setIsSliding] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const progress = isSliding
    ? sliderValue
    : duration > 0
    ? position / duration
    : 0;

  const trackElapsedTime = formatSecondsToMinutes(position / 1000);
  const trackRemainingTime = formatSecondsToMinutes(
    (duration - position) / 1000
  );

  return (
    <View style={style}>
      <Slider
        value={progress}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={colours.minimumTrackTintColor}
        maximumTrackTintColor={colours.maximumTrackTintColor}
        onSlidingStart={() => setIsSliding(true)}
        onValueChange={(value) => {
          setSliderValue(value);
        }}
        onSlidingComplete={(value) => {
          setIsSliding(false);
          useAudioStore.getState().sound?.setPositionAsync(value * duration);
        }}
      />

      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>
        <Text style={styles.timeText}>
          {"-"}
          {trackRemainingTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 20,
  },
  timeText: {
    ...defaultStyles.text,
    color: colours.text,
    opacity: 0.75,
    fontSize: fontSize.xs,
    letterSpacing: 0.7,
    fontWeight: "500",
  },
});
