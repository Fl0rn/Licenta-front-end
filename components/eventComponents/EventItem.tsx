import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import timestampToDate from "../../util/methods";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../util/Colors";
import { useNavigation } from "@react-navigation/native";
type EventProps ={
    image:string,
    data:number,
    titlu:string,
    id:string
    onPressToNavigate: (id:string) => void
}
export default function EventItem({image,data,titlu,onPressToNavigate,id}:EventProps) {
  const navigation = useNavigation()
  function handlePress(){
    
  }

  return (
    <TouchableOpacity style={styles.container} onPress={()=>onPressToNavigate(id)}>
      <View style={styles.imageContainer}>
        <Image source={{uri:image}} style={styles.image}/>
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
    </TouchableOpacity>
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