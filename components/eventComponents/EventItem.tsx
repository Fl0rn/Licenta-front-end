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
  return (
    <TouchableOpacity style={styles.container} onPress={()=>onPressToNavigate(id)}>
      <View style={styles.imageContainer}>
        <Image source={{uri:image}} style={styles.image}/>
      </View>
      <View style={styles.infoContainer}>
        <View  style={{ marginRight: 70 }}>
          <Text style={styles.title}>{titlu}</Text>
          <Text style={styles.date}>{timestampToDate(data)}</Text>
        </View>
        <View style={styles.intePlus}>
        <View style={styles.interestedView}>
            <Ionicons name="add" size={24} color={"white"} />
         
            <Text style={styles.insterested}>Interesat</Text>
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

        height:45,
        width:320,
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:Colors.secondary500,
        maxWidth:'100%',
        paddingHorizontal:25.5,
        paddingVertical:10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    intePlus:{
        flexDirection:'row',
        
    },
    title:{
      color:Colors.primary500,
      fontSize:18,
      fontWeight:'600',
    },
    date:{color:Colors.gray500,

    },
    interestedView:{
      flexDirection:'row',
      alignItems:'center'
    },
    insterested:{
      color:'white',
      fontWeight:'600'
    }
})