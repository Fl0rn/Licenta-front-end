import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../util/Colors";
import IconBtn from "../UI/IconBttn";
import ImagePickerModal from "../UI/ImagePickerModal";
import { useContext, useState } from "react";
import { convertImageToBase64} from "../../util/methods";
import { verifyPermissions } from "../../util/permissions";
import { Ionicons } from "@expo/vector-icons";
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import axios from "axios";
import { BACKEND_LINK } from "../../util/constants";
import { AuthContext } from "../../store/auth-context";

import { LatLng } from "react-native-maps";
import { insertPlangeri } from "../../util/database";
import { Plangeri } from "./UserCreatorPage";
type AddReclamatieModalProps = {
  visible: boolean;
  onShowModal: (val: boolean) => void;
  addPlangere: (val: Plangeri) => void;
  coordsFormPressingScreen: LatLng | null;
  setCoordsFormPressingScreen:(val:LatLng | null) => void
  }
type ReclamatiiType = {
  image: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
};
export type ReclamatiiToSend = {
  image: string;
  accountName: string;
  accountId: string;
  title: string;
  description: string;
  status: string;
 
  latitude: number;
  longitude: number;
};
type LoadingType = {
  status: "no-location" | "fetching" | "finished";
};
export default function AddReclamatieModal({
  visible,
  onShowModal,
  addPlangere,
  coordsFormPressingScreen,
  setCoordsFormPressingScreen
}: AddReclamatieModalProps) {
  const authCtx = useContext(AuthContext);
  const [imagePickerModal, setImagePickerModal] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState<LoadingType>({
    status: "no-location",
  });
  const [values, setValues] = useState<ReclamatiiType>({
    image: "",
    title: "",
    description: "",
    latitude: 0,
    longitude: 0,
  });
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  function handelValues(name: string, newValue: string | number) {
    setValues((prevState) => ({ ...prevState, [name]: newValue }));
  }
  async function previewImageHandler(uri: string) {
    setImagePreview(uri);
    setImagePickerModal(false);
    const base64Img = await convertImageToBase64(uri);
    handelValues("image", base64Img);
  }
  async function verifyPermissions() {
    if (locationPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert("Permisiuni insuficiente", "Trebuie sa accepti permisiunile");
      return false;
    }
    return true;
  }
  async function getLocationHandler() {
    setLoading({ status: "fetching" });
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    handelValues("latitude", parseFloat(location.coords.latitude.toFixed(7)));
    handelValues("longitude", parseFloat(location.coords.longitude.toFixed(7)));

    setLoading({ status: "finished" });
  }
  async function handleSubmit() {

      if(coordsFormPressingScreen){
        values.latitude = coordsFormPressingScreen.latitude
        values.longitude = coordsFormPressingScreen.longitude 
      }
      
      const plangereToSend: ReclamatiiToSend = {
        ...values,
      accountId: authCtx.userInfo?.id!,
      accountName: authCtx.userInfo?.nume!,
      status: "in lucru",
    };
    try {
      const response = await axios.post(
        BACKEND_LINK + "/addNewPlangere",
        plangereToSend
      );
      if (response.status === 200) {
        onShowModal(false);
      }
      console.log(response.data);
      const newPlangeri: Plangeri = response.data;
      addPlangere(newPlangeri);
    } catch (err) {
      console.log(err);
    } finally {
      setCoordsFormPressingScreen(null)
    }
  }
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Adauga o reclamatie</Text>
          <View style={styles.imageContainer}>
            <Image
              source={
                imagePreview
                  ? { uri: imagePreview }
                  : require("../../util/photos/download.jpg")
              }
              style={styles.image}
            />
          </View>
          <ImagePickerModal
            visible={imagePickerModal}
            onPressHandler={setImagePickerModal}
            onImagePrevHandler={previewImageHandler}
          />
          <Button
            title="Adauga imagine"
            onPress={() => setImagePickerModal(true)}
          />
          <View>
            <TextInput
              style={styles.textInput}
              onChangeText={(enteredValue) =>
                handelValues("title", enteredValue)
              }
              placeholder="Titlu"
              placeholderTextColor={Colors.gray300}
            />
          </View>
          <View>
            <TextInput
              multiline
              blurOnSubmit
              style={[styles.textInput, { height: 100 }]}
              onChangeText={(enteredText) =>
                handelValues("description", enteredText)
              }
              placeholder="Descriere"
              placeholderTextColor={Colors.gray300}
            />
          </View>
          {!coordsFormPressingScreen && (
            <View style={styles.locationView}>
              <Text style={styles.locatieText}>Locatia mea</Text>
              {loading.status === "no-location" && (
                <IconBtn
                  color="black"
                  iconName="locate-outline"
                  size={30}
                  onPress={getLocationHandler}
                />
              )}
              {loading.status === "fetching" && <ActivityIndicator />}
              {loading.status === "finished" && (
                <Ionicons name="checkmark" size={24} color="green" />
              )}
            </View>
          )}
          <Button title="Adauga" onPress={handleSubmit} />
          <Button title="Anulare" onPress={() => onShowModal(false)} />
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
    width: "80%",
    height: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.primari300,
    paddingBottom: 10,
  },
  imageContainer: {
    width: "90%",
    height: "30%",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  textInput: {
    backgroundColor: Colors.gray700,
    padding: 10,
    margin: 10,
    borderRadius: 8,
    width: "90%",
    alignSelf: "center",
  },

  locationView: {
    flexDirection: "row",
    margin: 30,
    alignItems: "center",
    alignSelf: "center",
  },
  locatieText: {
    padding: 10,
    fontSize: 17,
  },
});
