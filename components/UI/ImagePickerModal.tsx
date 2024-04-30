import React from "react";
import { Alert, Button, Modal, StyleSheet, Text, View } from "react-native";
import IconBtn from "./IconBttn";
import { Colors } from "../../util/Colors";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
} from "expo-image-picker";
export default function ImagePickerModal({
  visible,
  onPressHandler,
  onImagePrevHandler,
}: {
  visible: boolean;
  onPressHandler: (bool: boolean) => void;
  onImagePrevHandler: (uri: string) => void;
}) {
  const [cameraPermissionInfo, reqPermission] = useCameraPermissions();
  async function verifyPermissions() {
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await reqPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert("Permisiuni insuficiente", "Trebuie sa accepti permisionile");
      return false;
    }
    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    onImagePrevHandler(image.assets![0].uri);
  }
  async function pickImageHandler() {
    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    onImagePrevHandler(image.assets![0].uri);
  }
  return (
    <Modal
      visible={visible}
      onRequestClose={() => onPressHandler(false)}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Alege o imagine</Text>
          <View style={styles.optionContainerBig}>
            <View style={styles.optionContainer}>
              <IconBtn
                color={Colors.primari300}
                size={30}
                onPress={takeImageHandler}
                iconName="camera-outline"
              />
              <View>
                <Text>Camera</Text>
              </View>
            </View>
            <View style={styles.optionContainer}>
              <IconBtn
                color={Colors.primari300}
                size={30}
                onPress={pickImageHandler}
                iconName="folder-outline"
              />
              <View>
                <Text>Fisier</Text>
              </View>
            </View>
          </View>
          <Button title="Inchide" onPress={() => onPressHandler(false)} />
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: Colors.gray500,
    borderRadius: 10,
    padding: 20,
    width: 300,
    maxHeight: 400,
  },
  optionContainerBig: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginVertical: 20,
  },
  optionContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
});
