import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../util/Colors";
type AddCommProps ={
    onPress: (visible:true)=>void
    name:"maps-ugc"| "add-circle",
}
export default function AddCommentBtn({onPress,name}:AddCommProps){
    return<View style={styles.addComContainer}>
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => {
             onPress(true)
            }}
          >
            
            <View style={styles.addCom}>
              <MaterialIcons name={name} size={30} color="white" />
            </View>
          </Pressable>
        </View>
}
const styles = StyleSheet.create({
    addComContainer:{
        position: "absolute",
        bottom: 130,
        right: 20,
        zIndex: 99,
      },
      addCom: {
        backgroundColor: Colors.primari300,
        height: 70,
        width: 70,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
      },
      pressed: {
        opacity: 0.7,
      },
})