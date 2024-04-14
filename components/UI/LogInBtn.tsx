import { Pressable, StyleSheet, Text, View } from "react-native";

export default function LoginBtn({
  mode,
  onPress,
}: {
  mode: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{mode}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: "#729cbd",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 7,
    margin:6,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
