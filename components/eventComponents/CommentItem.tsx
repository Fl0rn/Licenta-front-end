import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BACKEND_LINK, dummyComments } from "../../util/constants";
import timestampToDate from "../../util/methods";
type CommentsProps = {
  authorEmail: string;
  author: string;
  date: number;
  message: string;
};
export default function CommentItem({
  authorEmail,
  author,
  date,
  message,
}: CommentsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: `${BACKEND_LINK}/profileImages/${authorEmail}.jpg`}}/>
      </View>
      <View>
        <View style={styles.dateTitleContainer}>
        <Text style={styles.numeAutor}>{author}</Text>
        <Text>{timestampToDate(date)}</Text>
        </View>
        <Text style={styles.mesaj}>{message}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
       
        margin:15,
        backgroundColor:'white',
        padding:5,
        borderRadius:5,
        flexDirection:'row',
    },
    imageContainer:{
        height:50,
        width:50,
        marginRight:15,
        marginLeft:5
    },
    image:{
        height:"100%",
        width:"100%",
        borderRadius:25,
        
    },
    dateTitleContainer:{
       
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingBottom:8,
    },
    numeAutor:{
        fontWeight:'bold',
        fontSize:20
    },
    mesaj:{
        paddingBottom:10,
    }
})