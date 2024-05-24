import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../util/Colors";
type AddCommProps ={
    onPress: (visible:true)=>void
    name:"maps-ugc"| "add-circle" | "info",
    height:number,
    width:number,
    backgroundColor:string,
    iconColor:string
    iconSize:number
}
export default function AddCommentBtn({onPress,name,height,width,backgroundColor,iconColor,iconSize}:AddCommProps){
    return<View style={styles.addComContainer}>
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => {
             onPress(true)
            }}
          >
            
            <View style={[styles.addCom,{backgroundColor:backgroundColor,width:width,height:height}]}>
              <MaterialIcons name={name} size={iconSize} color={iconColor} />
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
       
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
      },
      pressed: {
        opacity: 0.7,
      },
})