import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../util/Colors";
import { useRef, useState } from "react";
import axios from "axios";
import CustomOutlineBtn from "./CustomOutlineBtn";
type CommentsModal = {
  isVisible: boolean;
  onPress: (visible: boolean) => void;
  onSetComment: (comment: string) => void;
  onSubmitHandler: () => void;
};
export default function AddCommentsModal({
  isVisible,
  onPress,
  onSetComment,
  onSubmitHandler,
}: CommentsModal) {
  const [comment, setComment] = useState("");

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Adauga un comentariu"
            style={styles.textInput}
            placeholderTextColor="white"
            onChangeText={(event) => onSetComment(event)}
          />
          <View style={styles.btnView}>
            <CustomOutlineBtn
              title="Adauga"
              onPress={onSubmitHandler}
              color={Colors.primari300}
              width={100}
              height={35}
              disabled={false}
              
            />
            <Button
              title="Anulare"
              onPress={() => onPress(false)}
              color={Colors.primary500}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    height: "20%",
    width: "80%",
    backgroundColor: Colors.secondary300,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: Colors.primari300,
    justifyContent: "space-between",
  },
  textInput: {
    width: "100%",
    color: "black",
    borderWidth: 5,
    borderColor: Colors.primari300,

    height: 50,
    backgroundColor: Colors.secondary500,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  btnView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
