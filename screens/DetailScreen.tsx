import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RootStackPrams } from "../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, BACKEND_LINK, TIMISOARA } from "../util/constants";
import timestampToDate, { formatTime } from "../util/methods";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../util/Colors";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";

import CommentsContainer from "../components/eventComponents/CommentsContainer";
import AddCommentBtn from "../components/UI/AddCommentBtn";
import AddCommentsModal from "../components/UI/AddCommentsModal";
import { AuthContext } from "../store/auth-context";

type Props = StackScreenProps<RootStackPrams, "DetailPage">;

export default function DetailScreen({ route }: Props) {
  const authCtx = useContext(AuthContext);
  const [values, setValues] = useState({
    titlu: "",
    tip: "",
    dataTimp: 0,
    adresa: "",
    oras: "",
    descriere: "",
    coordonate: [0.0, 0.0],
    comentarii: [],
    creatorEmail: "",
    id: "",
  });
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [showModal, setShowModal] = useState(false);
  const [renderComents, setRenderComments] = useState(0);
  const [comment, setComment] = useState("");
  async function handleSubmit() {
    const date = new Date();
    const commentToSend = {
      eventId: values.id,
      author: authCtx.userInfo?.nume,
      authorId: authCtx.userInfo?.id,
      date: date.getTime(),
      message: comment,
    };
    try {
      console.log(commentToSend);
      await axios.post(
        BACKEND_LINK + "/addComent",
        commentToSend
      );
      
    } catch (err) {
      console.log(err);
    }finally{
      setRenderComments((prevState) => prevState + 1)
      setShowModal(false);
    }
  }
  useEffect(() => {
    async function getEvent() {
      const requestData = { eventId: route.params.id };
      const response = await axios.get(BACKEND_LINK + "/getEventById", {
        params: requestData,
      });

      setValues(response.data);
    }
    getEvent();
  }, [renderComents]);
  const coords = {
    latitude: values.coordonate[0],
    longitude: values.coordonate[1],
  };
  const testOrigin = {
    latitude: 45.748098,
    longitude: 21.227099,
  };
  console.log(coords);
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  async function verifyPermissions() {
    if (locationPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert("Permisiuni insuficiente", "Trebuie sa accepti permisiunile");
      return false;
    }
    return true;
  }

  useEffect(() => {
    async function getLocationHandler() {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        return;
      }
      const location = await getCurrentPositionAsync();
      const latitude = parseFloat(location.coords.latitude.toFixed(7));
      const longitude = parseFloat(location.coords.longitude.toFixed(7));
      setLocation({ latitude, longitude });
    }
    getLocationHandler();
  }, []);

  function showModalHandler(bol: boolean) {
    setShowModal(bol);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `${BACKEND_LINK}/eventImages/${values.id}.jpg`,
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{values.titlu}</Text>
        <Text style={styles.adresa}>{values.adresa}</Text>
        <View style={styles.dateTimeContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="calendar-outline"
              color={Colors.gray300}
              size={20}
              style={{ padding: 10 }}
            />
            <Text>{timestampToDate(values.dataTimp)}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="time-outline"
              color={Colors.gray300}
              size={20}
              style={{ padding: 10 }}
            />
            <Text>{formatTime(values.dataTimp)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <ScrollView>
          <View style={styles.descriereContainer}>
            <Text style={styles.descriereText}>{values.descriere}</Text>
          </View>
          <View style={styles.mapView}>
            <MapView
              style={styles.map}
              initialRegion={TIMISOARA}
              provider={PROVIDER_GOOGLE}
            >
              <Marker coordinate={coords} />
              <Marker coordinate={location} />
              <MapViewDirections
                origin={location}
                destination={coords}
                apikey={API_KEY}
              />
            </MapView>
          </View>
          <CommentsContainer comments={values.comentarii} />
        </ScrollView>
        <AddCommentBtn onPress={showModalHandler} />
        <AddCommentsModal
          isVisible={showModal}
          onPress={showModalHandler}
          onSetComment={setComment}
          onSubmitHandler={handleSubmit}
         
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 200,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  infoContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  adresa: {
    fontSize: 15,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsContainer: {
    height: 600,
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  descriereContainer: {
    marginVertical: 20,
    backgroundColor: Colors.gray500,
    borderRadius: 8,
  },

  descriereText: {
    padding: 10,
  },
  mapView: {
    height: 200,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderRadius: 8,
  },
  map: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
  },
});
