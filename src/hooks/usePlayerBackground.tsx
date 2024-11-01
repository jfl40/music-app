import Palette from "react-native-palette";
import { useEffect, useState } from "react";
import { IOSImageColors } from "react-native-image-colors/build/types";

export const usePlayerBackground = (imageUrl: string) => {
  const [imageColors, setImageColors] = useState<IOSImageColors | null>(null);

  useEffect(() => {
    Vibrant.from(imageUrl)
      .getPalette()
      .then((palette) => {
        setImageColors({
          background: palette.DarkMuted ? palette.DarkMuted.hex : "#000",
          primary: palette.Vibrant ? palette.Vibrant.hex : "#FFFFFF",
          secondary: palette.Muted ? palette.Muted.hex : "#CCCCCC",
          detail: palette.LightVibrant ? palette.LightVibrant.hex : "#FFFFFF",
          platform: "ios",
          quality: "high",
        } as IOSImageColors);
      });
  }, [imageUrl]);

  return imageColors;
};
