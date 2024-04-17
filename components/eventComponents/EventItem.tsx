import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import timestampToDate from "../../util/methods";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../util/Colors";
type EventProps ={
    image:string,
    data:number,
    titlu:string
}
export default function EventItem({image,data,titlu}:EventProps) {
  const imageUri = `data:image/jpeg;base64,${image}`;
  return (
    <Pressable style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri:imageUri }} style={styles.image}/>
      </View>
      <View style={styles.infoContainer}>
        <View  style={{ marginRight: 70 }}>
          <Text>{timestampToDate(data)}</Text>
          <Text>{titlu}</Text>
        </View>
        <View style={styles.intePlus}>
        <View>
            <Ionicons name="add" size={24} color={"gray"} />
          </View>
          <View>
            <Text>Interesat</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    container:{
        borderRadius:10,
        alignItems:'center',
        marginVertical:30,
        
    },

    imageContainer:{
        width:320,
        height:200,
        
    },
    image:{
        height:'100%',
        width:"100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    infoContainer:{
        flexDirection:'row',
        height:40,
        width:320,
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:Colors.gray500,
        maxWidth:'100%',
        paddingHorizontal:25.5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    intePlus:{
        flexDirection:'row',
        
    }
})