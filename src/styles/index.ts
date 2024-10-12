import { colours, fontSize } from "../constants/tokens";
import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.background,
  },
  text: {
    fontSize: fontSize.base,
    color: colours.text,
  },
});

export const utilsStyles = StyleSheet.create({});
