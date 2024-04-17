import { Button, Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../util/Colors";
import CustomOutlineBtn from "../components/UI/CustomOutlineBtn";
import IconBtn from "../components/UI/IconBttn";
import { useContext, useState } from "react";
import ImagePickerModal from "../components/UI/ImagePickerModal";
import { AuthContext } from "../store/auth-context";
export function ProfileScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | false>(false);
  function previewImageHandler(uri: string) {
    setImagePreview(uri);
    setIsModalVisible(false);
  }
  function modalVisibleHandler(bool: boolean) {
    setIsModalVisible(bool);
  }
  const authCtx = useContext(AuthContext)
  
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.circleContainer}>
          {!imagePreview ? (
            <Ionicons name="person" color="black" size={40} />
          ) : (
            <Image
              source={{ uri: imagePreview }}
              style={styles.image}
              
            />
          )}
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
            onPress={() => {authCtx.logout()}}
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
  image:{
    height:"100%",
    width:"100%",
    borderRadius:150,
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
    marginRight:60,
    
    fontSize:17

  },
  buttonsContainer: {
    marginTop: 40,
  },
  logout: {
    justifyContent: "center",
  },
});
