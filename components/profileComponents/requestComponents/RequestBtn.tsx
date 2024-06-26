import { Pressable, StyleSheet, Text, View } from "react-native";
type RequestBtnProps = {
  title: string;
  handleRequest: (url: string) => void;
};
export default function RequestBtn({ title, handleRequest }: RequestBtnProps) {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={
        title === "Accept"
          ? ()=>handleRequest("/acceptAccountUpgrade")
          : ()=>handleRequest("/rejectAccountUpgrade")
      }
    >
      <View
        style={[
          styles.container,
          { backgroundColor: title === "Accept" ? "green" : "red" },
        ]}
      >
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  container: {
    height: 30,
    borderRadius: 10,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  text:{
    color:'white'
  }
});
