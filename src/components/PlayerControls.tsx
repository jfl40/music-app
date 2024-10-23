import { colours } from "@/constants/tokens";
import useAudioStore from "@/store/audioStore";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type PlayerControlsProps = {
  style?: ViewStyle;
};

type PlayerButtonsProps = {
  style?: ViewStyle;
  iconSize?: number;
};

export const PlayPauseButton = ({ style, iconSize }: PlayerButtonsProps) => {
  const playing = useAudioStore((state) => state.isPlaying);
  const pause = useAudioStore.getState().pauseTrack;
  const play = useAudioStore.getState().resumeTrack;

  return (
    <View style={[{ height: iconSize }, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => (playing ? pause() : play())}
      >
        <FontAwesome
          name={playing ? "pause" : "play"}
          size={iconSize}
          color={colours.text}
        />
      </TouchableOpacity>
    </View>
  );
};

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonsProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={useAudioStore.getState().nextTrack}
    >
      <FontAwesome6 name="forward" size={iconSize} color={colours.text} />
    </TouchableOpacity>
  );
};

export const SkipToPrevButton = ({ iconSize = 30 }: PlayerButtonsProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={useAudioStore.getState().previousTrack}
    >
      <FontAwesome6 name="backward" size={iconSize} color={colours.text} />
    </TouchableOpacity>
  );
};
