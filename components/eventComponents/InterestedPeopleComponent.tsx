import { Image, StyleSheet, Text, View } from "react-native";
import { BACKEND_LINK } from "../../util/constants";
import { Colors } from "../../util/Colors";
type InterestedPeopleProps = {
  participants: string[];
};
export default function InterestedPeopleComponent({
  participants,
}: InterestedPeopleProps) {
    const peopleCountForImages = participants.length-4
    console.log(peopleCountForImages)
  return (
    <View >
      <Text style={styles.interested}>Interesati</Text>
      <View style={styles.imagesContainer}>
        {participants.slice(0, 4).map((participant, index) => (
          <Image
            key={index}
            source={{
              uri: `${BACKEND_LINK}/profileImages/${participant}.jpg`,
            }}
            style={styles.image}
          />
        ))}
        {peopleCountForImages>0 &&<View style={[styles.image,styles.circleTextView]}>
         <Text style={styles.circleText} >+{peopleCountForImages}</Text>   
        </View>}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  interested: {
    fontSize: 20,
    color: "white",
    paddingLeft: 40,
    paddingVertical:10
  },
  imagesContainer:{
    flexDirection:'row',
    marginLeft:30
  },
  imageContainer:{
    height:60,
    width:60
  },
  image: {
    height:60,
    width:60,
    backgroundColor: "white",
    borderRadius: 30,
    marginRight:-15
  },
  circleTextView:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.primari300
  },
  circleText:{
    fontSize:20,
    fontWeight:'600',
    color:'white'
  }
});
