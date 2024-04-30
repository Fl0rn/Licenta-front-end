import { Image, StyleSheet, View } from "react-native";
import IconBtn from "../UI/IconBttn";

import { BACKEND_LINK } from "../../util/constants";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { Colors } from "../../util/Colors";
type ProfileHeaderProps ={
    showModlalHandler:(value:boolean) => void
}
export default function ProfileHeader({showModlalHandler}:ProfileHeaderProps){
    const authCtx = useContext(AuthContext)
    return <View style={styles.topContainer}>
    <View style={styles.circleContainer}>
      <Image
        source={{
          uri: `${BACKEND_LINK}/profileImages/${authCtx.userInfo?.id}.jpg`,
        }}
        style={styles.image}
      />
      <View style={styles.addImageIcon}>
        <IconBtn
          iconName="camera-outline"
          color={Colors.primari300}
          size={24}
          onPress={() => showModlalHandler(true)}
        />
      </View>
    </View>
  </View>
}
const styles = StyleSheet.create({
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
})