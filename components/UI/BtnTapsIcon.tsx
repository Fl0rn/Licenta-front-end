import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../util/Colors";
type BtnTapsIconProps = {
    iconName:any;
    color:string;
    text:string
}
export default function BtnTapsIcon({iconName,color,text}:BtnTapsIconProps){
    return <View style={styles.container}>
        <Ionicons name={iconName} size={24} color={color}/>
        <Text style={styles.text}>{text}</Text>
    </View>
}
const styles = StyleSheet.create({
    container:{
        height:50,
        width:100,
        borderRadius:35,
        backgroundColor:Colors.secondary300,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        paddingLeft:5,
        color:Colors.primary500
    }
})