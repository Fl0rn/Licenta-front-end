import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
type TextIconBtn = {
    iconSize:number,
    iconColor:string,
    text:string,
    height:number,
    width:number,
    iconName:any,
    backgroundColor:string,
}
export default function TextIconBtn({iconColor,iconSize,text,height,width,iconName,backgroundColor}:TextIconBtn){
    return <Pressable>
        <View style={[{height:height,width:width,backgroundColor:backgroundColor},styles.container]}>
            <Ionicons name={iconName} size={iconSize} color={iconColor}/>
            <Text style={styles.text}>{text}</Text>
        </View>
    </Pressable>
}
const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10 
    },
    text:{
        color:'white'
    }

})