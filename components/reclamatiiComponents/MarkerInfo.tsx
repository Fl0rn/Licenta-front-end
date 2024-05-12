import { Image, StyleSheet, Text, View } from "react-native";
import { BACKEND_LINK } from "../../util/constants";
type MarkerInfoProps = {
    title:string,
    status:string,
    id:string,
    description:string
}
export default function MarkerInfo({title,status,id,description}:MarkerInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.text }>{title}</Text>
        <Text>{status}</Text>
      </View>
      <View style={styles.detailsView}>
        <Text style={styles.description}>
          {description}
        </Text>

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
  },
  titleView: {
    flexDirection: "row",
    marginBottom: 8,
    justifyContent: "space-around",
  },
  text: { fontWeight: "bold" },
  description: {
    width: "50%",
  },
  detailsView: {
    flexDirection: "row",
    width: "100%",
  },
});
