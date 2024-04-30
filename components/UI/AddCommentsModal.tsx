import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../util/Colors";
import { useRef, useState } from "react";
import axios from "axios";
type CommentsModal = {
  isVisible: boolean;
  onPress: (visible: boolean) => void;
  onSetComment:(comment:string) => void;
  onSubmitHandler:()=>void;
 
};
export default function AddCommentsModal({
  isVisible,
  onPress,
  onSetComment,
  onSubmitHandler,
 
}: CommentsModal) {
    const [comment,setComment] = useState("")
    
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Adauga un comentariu"
            style={styles.textInput}
            placeholderTextColor={Colors.gray300}
            onChangeText={(event)=>onSetComment(event)}
          />
          <View style={styles.btnView}>
            <Button title="Adauga" onPress={onSubmitHandler} />
            <Button title="Anulare" onPress={() => onPress(false)} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modal: {},
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    height: 100,
    width: 300,
    backgroundColor: Colors.gray700,
    borderRadius:10
  },
  textInput: {
    width: 300,
    color: "black",
    height: 50,
    backgroundColor: Colors.gray500,
    padding: 10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10
    
},
  btnView:{
    flexDirection:'row',
    alignSelf:'center'
  },
});
