import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CustomBtnProps = {
  title: string;
  color: string;
  onPress: () => void;
};

export default function CustomOutlineBtn({
  title,
  color,
  onPress,
}: CustomBtnProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "white" : color,
          borderColor: color,
          borderWidth: 2,
          alignSelf: "center",
          justifyContent: "center",
          height: 40,
          marginBottom: 15,
          width: 200,
          borderRadius: 7,
          margin: 6,
        },
      ]}
    >
      <Text style={[styles.text, { color: pressed ? color : "white" }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",

    textAlign: "center",
  },
});
