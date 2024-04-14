import { Pressable, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../util/Colors";
export default function EventTypeBtn({ mode }: { mode: string }) {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.text}>{mode}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor:Colors.primari300
  },
  text: {
    color: "white",
    fontWeight:'bold'
  },
});
