import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BACKEND_LINK, StatusButtons } from "../../util/constants";
import { Plangeri } from "./UserCreatorPage";
import { Colors } from "../../util/Colors";
import timestampToDate, {
  formatTime,
  getPlangeriStatusColor,
  timestampToDateShort,
} from "../../util/methods";
import CustomOutlineBtn from "../UI/CustomOutlineBtn";

export type TownHallPlangeri = {
  date: number;
  adress: string;
} & Plangeri;

type ReclamatiiItemProp = {
  plangereObj: TownHallPlangeri;
  onShowModal: (val: boolean, id: string) => void;
};
export default function ReclamatiiItem({
  plangereObj,
  onShowModal,
}: ReclamatiiItemProp) {
  return (
    <TouchableOpacity onPress={() => onShowModal(true, plangereObj.id)}>
      <View style={styles.container}>
        <View style={styles.bigInfoView}>
          <View style={styles.headerView}>
            <Text style={styles.title}>{plangereObj.title}</Text>
            <Text style={[{ color: getPlangeriStatusColor(plangereObj.status) },styles.status]}>
              {plangereObj.status}
            </Text>
          </View>
          <View style={styles.infoView}>
            <Ionicons
              name="calendar"
              size={20}
              color={Colors.primari300}
              style={styles.icon}
            />
            <Text style={styles.text}>
              {timestampToDateShort(plangereObj.date)}
            </Text>
          </View>
          <View style={styles.infoView}>
            <Ionicons
              name="location"
              size={20}
              color={Colors.primari300}
              style={styles.icon}
            />
            <Text ellipsizeMode="tail" numberOfLines={2} style={styles.text}>
              {plangereObj.adress}
            </Text>
          </View>
        </View>
        <Image
          source={{
            uri: `${BACKEND_LINK}/plangeriImages/${plangereObj.id}.jpg`,
          }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
    color: Colors.primari300,
    paddingLeft: 10,
  },
  status:{
    fontWeight:'600',
    fontSize:16
  },
  text: {
    color: Colors.gray300,
    fontSize: 15,
    flexShrink: 1,
    fontWeight: "400",
  },
  icon: {
    padding: 5,
  },
  bigInfoView: {
    width: "70%",
    padding: 7,
  },
  infoView: {
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "30%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
