import { Text, View } from "react-native";
import { defaultStyles } from "@/src/styles";

export default function SongScreen() {
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.text}>Song screen</Text>
    </View>
  );
}
