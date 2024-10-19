import { unknownTrackImageUri } from "@/constants/images";
import { colours, fontSize } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Image } from "expo-image";
import { Track } from "react-native-track-player";

export type TrackListItemProps = {
  track: Track;
};

const TracksListItem = ({ track }: TrackListItemProps) => {
  const isActiveTrack = false;

  return (
    <TouchableHighlight>
      <View style={styles.trackItemContainer}>
        <View>
          <Image
            source={{
              uri: track.artwork ?? unknownTrackImageUri,
            }}
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1,
            }}
          />
        </View>
        <View style={{ width: "100%" }}>
          <Text
            numberOfLines={1}
            style={{
              ...styles.trackTitleText,
              color: isActiveTrack ? colours.primary : colours.text,
            }}
          >
            {track.title}
          </Text>
          {track.artist && (
            <Text numberOfLines={1} style={styles.trackArtistText}>
              {track.artist}
            </Text>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    paddingRight: 20,
  },
  trackArtworkImage: {
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: fontSize.sm,
    fontWeight: "600",
    maxWidth: "90%",
  },
  trackArtistText: {
    ...defaultStyles.text,
    color: colours.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
});

export default TracksListItem;
