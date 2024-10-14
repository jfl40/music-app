import unknownArtistImageMobile from "@/assets/images/unknownArtist.png";
import unknownTrackImageMobile from "@/assets/images/unknownTrack.png";
import { Image, Platform } from "react-native";

// Web asset paths
const unknownArtistImageWeb = "assets/images/unknownArtist.png";
const unknownTrackImageWeb = "assets/images/unknownTrack.png";

export const unknownTrackImageUri =
  Platform.OS === "web"
    ? unknownTrackImageWeb
    : Image.resolveAssetSource(unknownTrackImageMobile).uri;

export const unknownArtistImageUri =
  Platform.OS === "web"
    ? unknownArtistImageWeb
    : Image.resolveAssetSource(unknownArtistImageMobile).uri;
