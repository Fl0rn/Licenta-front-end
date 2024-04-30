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
import ProfileHeader from "../components/profileComponents/ProfileHeader";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackPrams } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
type UpdatePhoto = {
  userId: string;
  base64Photo: string;
};

export function ProfileScreen(){
  const navigation = useNavigation<StackNavigationProp<RootStackPrams>>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rerenderKey, setRerenderKey] = useState(0);
  const authCtx = useContext(AuthContext);
  const userInfo = authCtx.userInfo;
  console.log(userInfo);
  async function previewImageHandler(uri: string) {
    try {
      const bytesImage = await convertImageToBase64(uri);
      const values: UpdatePhoto = {
        userId: authCtx.userInfo!.id,
        base64Photo: bytesImage,
      };
     console.log(values.userId,typeof(values.userId))
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
      <ProfileHeader showModlalHandler={ setIsModalVisible}/>
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
        <Button title="Cont Creator" color={Colors.primari300} onPress={()=>navigation.navigate("AcceptRequestScreen")}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
