import { Button, Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../util/Colors";
import CustomOutlineBtn from "../components/UI/CustomOutlineBtn";
import IconBtn from "../components/UI/IconBttn";
import { useContext, useEffect, useState } from "react";
import ImagePickerModal from "../components/UI/ImagePickerModal";
import { AuthContext } from "../store/auth-context";
import axios from "axios";
import { BACKEND_LINK } from "../util/constants";
import { convertImageToBase64 } from "../util/methods";
type UpdatePhoto = {
  userEmail: string;
  base64Photo: string;
};
export function ProfileScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rerenderKey, setRerenderKey] = useState(0);
  const authCtx = useContext(AuthContext);

  async function previewImageHandler(uri: string) {
    try {
      const bytesImage = await convertImageToBase64(uri);
      const values: UpdatePhoto = {
        userEmail: authCtx.userInfo!.email,
        base64Photo: bytesImage,
      };
      await axios.put(BACKEND_LINK + "/updateProfilePicture", values);
      setRerenderKey((prevKey) => prevKey + 1);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  }

  function modalVisibleHandler(bool: boolean) {
    setIsModalVisible(bool);
  }

  
  return (
    <View key={rerenderKey} style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.circleContainer}>
          <Image
            source={{
              uri: `http://192.168.0.127:3000/profileImages/${authCtx.userInfo?.email}.jpg`,
            }}
            style={styles.image}
          />
          <View style={styles.addImageIcon}>
            <IconBtn
              iconName="camera-outline"
              color={Colors.primari300}
              size={24}
              onPress={() => setIsModalVisible(true)}
            />
          </View>
        </View>
      </View>
      <Text style={styles.acountTypeText}>{authCtx.userInfo?.nume}</Text>
      <ImagePickerModal
        visible={isModalVisible}
        onImagePrevHandler={previewImageHandler}
        onPressHandler={modalVisibleHandler}
      />
      <View style={styles.bigInfoContainer}>
        <View
          style={[
            styles.infoView,
            { borderTopColor: Colors.gray300, borderTopWidth: 0.5 },
          ]}
        >
          <Ionicons
            name="mail-outline"
            color={Colors.gray300}
            size={24}
            style={styles.icons}
          />

          <Text style={styles.infoText}>{authCtx.userInfo?.email}</Text>
        </View>
        <View style={styles.infoView}>
          <Ionicons
            name="location-outline"
            color={Colors.gray300}
            size={24}
            style={styles.icons}
          />
          <Text style={styles.infoText}>{authCtx.userInfo?.oras}</Text>
        </View>
        <View style={styles.infoView}>
          <Ionicons
            name="calendar-outline"
            color={Colors.gray300}
            size={24}
            style={styles.icons}
          />
          <Text style={styles.infoText}>6 Octombrie 2002</Text>
        </View>
        <View style={styles.infoView}>
          <Ionicons
            name="person-outline"
            color={Colors.gray300}
            size={24}
            style={styles.icons}
          />
          <Text style={styles.infoText}>Utilizator</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.logout}>
          <CustomOutlineBtn
            color={Colors.primari300}
            title="Logout"
            onPress={() => {
              authCtx.logout();
            }}
          />
        </View>
        <Button title="Cont Creator" color={Colors.primari300} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topContainer: {
    backgroundColor: Colors.primari300,
    height: 230,
    paddingTop: 50,
    alignItems: "center",
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
  },
  circleContainer: {
    backgroundColor: "white",
    borderRadius: 70,
    height: 130,
    width: 130,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    marginTop: 80,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 150,
  },
  addImageIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  acountTypeText: {
    textAlign: "center",
    marginTop: 40,
    fontWeight: "bold",
    fontSize: 20,
  },
  bigInfoContainer: {
    marginTop: 40,
  },
  infoView: {
    borderBottomColor: Colors.gray300,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    height: 60,
    alignItems: "center",
  },
  icons: {
    marginLeft: 30,
  },
  infoText: {
    flex: 1,
    textAlign: "center",
    marginRight: 60,

    fontSize: 17,
  },
  buttonsContainer: {
    marginTop: 40,
  },
  logout: {
    justifyContent: "center",
  },
});
