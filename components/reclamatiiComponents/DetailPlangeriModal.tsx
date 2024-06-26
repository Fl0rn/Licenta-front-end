import { Alert, Button, Image, Modal, StyleSheet, Text, View } from "react-native";
import { TownHallPlangeri } from "./ReclamatiiItem";
import { BACKEND_LINK, StatusButtons } from "../../util/constants";
import { Colors } from "../../util/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import DropdownComponent from "../UI/DropdownComponent";
import CustomOutlineBtn from "../UI/CustomOutlineBtn";
import { useEffect, useState } from "react";
import axios from "axios";
type DetailPlangeriModal = {
  visible: boolean;
  plangere: TownHallPlangeri;
  onCloseModal: (val: boolean) => void;
  rerender: (value: (prevState: number) => number) => void;
};
type ValueRequestTypes = {};
export default function DetailPlangeriModal({
  visible,
  plangere,
  onCloseModal,
  rerender
}: DetailPlangeriModal) {
  const [requestValues, setRequestValues] = useState({
    plangereId: "",
    status: "",
  });

  useEffect(() => {
    if (plangere.id) {
      setRequestValues((prevState) => ({
        ...prevState,
        plangereId: plangere.id,
      }));
    }
  }, [plangere]);
  function valuesHandler(value: ValueRequestTypes, name: string) {
    setRequestValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  async function handleSubmit(){
    console.log(requestValues)

    const response = await axios.post(BACKEND_LINK + "/updatePlangereStatus",requestValues)
    if(response.status === 200){
      Alert.alert("Succes!","Status modificat cu succes")
    }
      rerender(prevState => prevState +1)
    }
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>Detalii</Text>
          <View style={styles.imageDetailsView}>
            <Image
              source={{
                uri: `${BACKEND_LINK}/plangeriImages/${plangere.id}.jpg`,
              }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{plangere.title}</Text>
              <View style={styles.iconView}>
              <Ionicons
                  name="location"
                  size={20}
                  color={Colors.primari300}
                  style={styles.icon}
                />
                <Text style={styles.address}>{plangere.adress}</Text>
              </View>
              <View style={[styles.iconView, { alignItems: "center" }]}>
             <Ionicons
                  name="calendar"
                  size={20}
                  color={Colors.primari300}
                  style={styles.icon}
                />
                <Text style={styles.date}>
                  {new Date(plangere.date).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.descriptionView}>
            <Text style={styles.description}>{plangere.description}</Text>
          </View>
          <View style={styles.dropdownView}>
            <DropdownComponent
              label={plangere.status}
              icon="hammer-outline"
              mode="Status"
              onHandleInput={valuesHandler}
              height={40}
              width={150}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomOutlineBtn
              color={Colors.primari300}
              title="Salveaza"
              onPress={handleSubmit}
              height={37}
              width={150}
              disabled={false}
            />
            <Button
              title="Cancel"
              onPress={() => onCloseModal(false)}
              color={Colors.primari300}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  content: {
    width: "85%",
    backgroundColor: Colors.secondary300,
    padding: 20,
    borderRadius: 10,

  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: Colors.primari300,
  },
  imageDetailsView: {
    flexDirection: "row",
    marginBottom: 20,
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 20,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    margin:8
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color:'white'
  },
  address: {
    fontSize: 16,
    marginBottom: 10,
    color:Colors.gray700
  },
  iconView: {
    flexDirection: "row",
  },
  icon: {
    padding: 5,
  },
  date: {
    fontSize: 14,
    color: Colors.gray700,
  },
  description: {
    color: Colors.gray700,
    padding: 8,
  },
  descriptionView: {
    backgroundColor: Colors.secondary500,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 10,
  },
  dropdownView: {
    alignItems: "center",
    margin: 10,
    backgroundColor:Colors.secondary300
  },
  buttonContainer: {
    alignItems: "center",
  },
});
