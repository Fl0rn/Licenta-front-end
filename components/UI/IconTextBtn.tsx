import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatTimestamp, getMonthAbbreviation } from "../../util/methods";
import { Colors } from "../../util/Colors";
type IconTextBtnProps = {
  name: any;
  size: number;
  color: string;
  date: string;
  isActive: boolean;
  handleSelect: () => void;
};
export default function IconTextBtn({
  name,
  size,
  color,
  date,
  isActive,
  handleSelect,
}: IconTextBtnProps) {
  return (
    <Pressable
      style={[styles.container, isActive && styles.isActiveContainer]}
      onPress={handleSelect}
    >
      <Ionicons name={name} size={size} color={isActive ? "white" : color} />
      <Text style={[styles.text, styles.isActiveText]}>
        {date}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:10,
    margin: 10,
    padding: 10,
    height: 60,
    width: 80,
  },

  text: {
    color: Colors.primari300,
  },
  isActiveContainer: {
    backgroundColor: Colors.primari300,
  },
  isActiveText: {
    color: "white",
  },
});
