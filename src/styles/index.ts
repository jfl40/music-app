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

export const utilsStyles = StyleSheet.create({
  centeredRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemSeparator: {
    borderColor: colours.textMuted,
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 0.3,
  },
  emptyContentText: {
    ...defaultStyles.text,
    color: colours.textMuted,
    textAlign: "center",
    marginTop: 20,
  },
  emptyContentImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 40,
    opacity: 0.5,
  },
});
