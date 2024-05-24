import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../util/Colors";

type LegendaModalProps = {
    visible:boolean,
    setModalVisible:(val:boolean)=>void
}
export default function LegendaModal({visible,setModalVisible}:LegendaModalProps) {
  

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback onPress={()=>setModalVisible(false)}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Legenda</Text>
            <View style={styles.legendItem}>
              <MaterialIcons name="circle" color="red" size={20} />
              <Text>Neabordata</Text>
            </View>
            <View style={styles.legendItem}>
              <MaterialIcons name="circle" color="yellow" size={20} />
              <Text>In lucru</Text>
            </View>
            <View style={styles.legendItem}>
              <MaterialIcons name="circle" color="green" size={20} />
              <Text>Finalizata</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight:20,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  content: {
    width: "60%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  title:{
    fontWeight:'600',
    fontSize:20,
    color:Colors.primari300,
    padding:10
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
});
