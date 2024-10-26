import { MovingText } from "@/components/MovingText";
import { PlayerControls } from "@/components/PlayerControls";
import { PlayerProgressBar } from "@/components/PlayerProgressBar";
import { PlayerVolumeBar } from "@/components/PlayerVolumeBar";
import { unknownTrackImageUri } from "@/constants/images";
import { colours, fontSize, screenPadding } from "@/constants/tokens";
import useAudioStore from "@/store/audioStore";
import { defaultStyles, utilsStyles } from "@/styles";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PlayerScreen = () => {
  const activeTrack = useAudioStore((state) => state.currentTrack);

  const { top, bottom } = useSafeAreaInsets();

  const isFavourite = false;

  const toggleFavourite = () => {
    // TODO
  };

  if (!activeTrack) {
    return (
      <View style={[defaultStyles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color={colours.icon} />
      </View>
    );
  }

  return (
    <View style={styles.overlayContainer}>
      <DismissPlayerSymbol />
      <View style={{ flex: 1, marginTop: top + 65, marginBottom: bottom }}>
        <View style={styles.artworkImageContainer}>
          <Image
            source={{ uri: activeTrack.artwork ?? unknownTrackImageUri }}
            style={styles.artworkImage}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: "auto" }}>
            <View style={{ height: 60 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Track Title */}
                <View style={styles.trackTitleContainer}>
                  <MovingText
                    text={activeTrack.title ?? ""}
                    animationThreshold={30}
                    style={styles.trackTitleText}
                  />
                </View>

                {/* Favourite Button */}
                <FontAwesome
                  name={isFavourite ? "heart" : "heart-o"}
                  size={20}
                  color={isFavourite ? colours.primary : colours.icon}
                  style={{ marginHorizontal: 14 }}
                  onPress={toggleFavourite}
                />
              </View>

              {/* Track Artist */}
              {activeTrack.artist && (
                <Text
                  numberOfLines={1}
                  style={[
                    styles.trackArtistText,
                    {
                      marginTop: 6,
                    },
                  ]}
                >
                  {activeTrack.artist}
                </Text>
              )}
            </View>

            {/* Player controls */}
            <PlayerProgressBar style={{ marginTop: 32 }} />

            <PlayerControls style={{ marginTop: 40 }} />
          </View>

          <PlayerVolumeBar style={{ marginTop: "auto", marginBottom: 30 }} />

          {/* <View style={utilsStyles.centeredRow}>
            <PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
          </View> */}
        </View>
      </View>
    </View>
  );
};

const DismissPlayerSymbol = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        top: top + 9,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <View
        accessible={false}
        style={{
          width: 50,
          height: 8,
          borderRadius: 8,
          backgroundColor: "#fff",
          opacity: 0.7,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  artworkImageContainer: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 11.0,
    flexDirection: "row",
    justifyContent: "center",
    height: "45%",
  },
  artworkImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: 20,
    fontWeight: "700",
  },
  trackArtistText: {
    ...defaultStyles.text,
    fontSize: fontSize.base,
    opacity: 0.8,
    maxWidth: "90%",
  },
});

export default PlayerScreen;