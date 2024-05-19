import { Image, StyleSheet, Text, View } from "react-native";
import { BACKEND_LINK } from "../../util/constants";
import { Colors } from "../../util/Colors";
type MarkerInfoProps = {
  title: string;
  status: string;
  id: string;
  description: string;
};
export default function MarkerInfo({
  title,
  status,
  id,
  description,
}: MarkerInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.text}>{title}</Text>
        <Text>{status}</Text>
      </View>
      <View style={styles.detailsView}>
       
        <Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">
          {description}
        </Text>
        <View style={{width:10}}/>
        <Image
          source={{
            uri: `${BACKEND_LINK}/plangeriImages/${id}.jpg`,
          }}
          style={styles.image}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 120,
    borderRadius: 10,
    padding: 4,
   
  },

  image: {
    height: "100%",
    width: "50%",
    borderRadius:8
  },
  titleView: {
    flexDirection: "row",
    marginBottom: 2,
    justifyContent: "space-around",
  },
  text: { fontWeight: "bold" },
  description: {
    width: "50%",
    backgroundColor:Colors.gray700,
    marginLeft:-5,
    padding:5,
    borderRadius:8
  },
  detailsView: {
    flexDirection: "row",
    paddingBottom: 15,
    width: "100%",
    height: "100%",
    padding:5,
    justifyContent:'space-between'

  },
});
