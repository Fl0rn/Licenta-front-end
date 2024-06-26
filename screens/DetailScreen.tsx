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

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, BACKEND_LINK, TIMISOARA } from "../util/constants";
import timestampToDate, {
  formatTime,
  getDayOfMonth,
  getDayOfWeek,
  getMonthAbbreviation,
  verifyParticipant,
} from "../util/methods";
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
import { RootStackPrams } from "../stack/Non-authenticated";
import TextIconBtn from "../components/UI/TextIconBtn";
import InterestedPeopleComponent from "../components/eventComponents/InterestedPeopleComponent";

type Props = StackScreenProps<RootStackPrams, "DetailPage">;
type ParticipantsRequest = {
  eventId: string;
  userId: string;
};
type EventState = {
  titlu: string;
  tip: string;
  dataTimp: number;
  adresa: string;
  oras: string;
  descriere: string;
  coordonate: number[];
  comentarii: any[];
  creatorEmail: string;
  participanti: string[];
  id: string;
};
export default function DetailScreen({ route }: Props) {
  const authCtx = useContext(AuthContext);
  const [values, setValues] = useState<EventState>({
    titlu: "",
    tip: "",
    dataTimp: 0,
    adresa: "",
    oras: "",
    descriere: "",
    coordonate: [0.1, 0.1],
    comentarii: [],
    creatorEmail: "",
    participanti: [],
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
      await axios.post(BACKEND_LINK + "/addComent", commentToSend);
    } catch (err) {
      console.log(err);
    } finally {
      setRenderComments((prevState) => prevState + 1);
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
  console.log(values);

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
  console.log(
    "ASDASDASDADASDAS",
    verifyParticipant(values.participanti, authCtx.userInfo?.id!)
  );
  async function handleAddParticipant() {
    const participantsRequest: ParticipantsRequest = {
      eventId: values.id,
      userId: authCtx.userInfo?.id!,
    };
    if (!verifyParticipant(values.participanti, participantsRequest.userId)) {
      const response = await axios.post(
        BACKEND_LINK + "/addParicipant",
        participantsRequest
      );
      if (response.status === 200) {
        setValues((prevState) => ({
          ...prevState,
          participanti: [...prevState.participanti, participantsRequest.userId],
        }));
      }
    } else {
      const response = await axios.post(
        BACKEND_LINK + "/deleteParticipant",
        participantsRequest
      );
      if (response.status === 200) {
        setValues((prevState) => ({
          ...prevState,
          participanti: response.data,
        }));
      }
    }
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
          <View style={styles.leftInfoView}>
            <View
              style={[
                styles.iconContainer,
                {
                  borderRightWidth: 1,
                  borderRightColor: Colors.gray500,
                  paddingRight: 30,
                  paddingLeft: 10,
                },
              ]}
            >
              <Text style={styles.mounthText}>
                {getMonthAbbreviation(values.dataTimp)}
              </Text>
              <Text style={styles.dayOfTheMounth}>
                {getDayOfMonth(values.dataTimp)}
              </Text>
            </View>

            <View style={[styles.iconContainer, { marginLeft: 30 }]}>
              <Text style={[styles.getDayOfWeek, { paddingBottom: 10 }]}>
                {getDayOfWeek(values.dataTimp)}
              </Text>
              <Text style={styles.mounthText}>
                {formatTime(values.dataTimp)}
              </Text>
            </View>
          </View>

          <TextIconBtn
            height={60}
            width={60}
            iconColor="white"
            iconSize={30}
            text={
              verifyParticipant(values.participanti, authCtx.userInfo?.id!)
                ? "Added"
                : "Add"
            }
            iconName={
              verifyParticipant(values.participanti, authCtx.userInfo?.id!)
                ? "checkmark"
                : "calendar"
            }
            backgroundColor={Colors.primari300}
            onPress={handleAddParticipant}
          />
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
              //provider={PROVIDER_GOOGLE}
              mapType="standard"
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
         <InterestedPeopleComponent participants={values.participanti}/>
        </ScrollView>
       
          <AddCommentBtn
            onPress={showModalHandler}
            name="maps-ugc"
            height={40}
            width={40}
            backgroundColor={Colors.primari300}
            iconColor="white"
            iconSize={40}
          />
        
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
    backgroundColor: Colors.secondary300,
  },
  imageContainer: {
    height: 250,
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
    color: Colors.primari300,
    padding: 7,
  },
  adresa: {
    fontSize: 15,
    color: Colors.gray500,
  },
  dateTimeContainer: {
    flexDirection: "row",
    backgroundColor: Colors.secondary500,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 17,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  iconContainer: {
    paddingRight: 15,
    alignItems: "center",
  },
  mounthText: {
    color: Colors.gray500,
  },
  leftInfoView: {
    flexDirection: "row",
  },
  getDayOfWeek: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
  },
  dayOfTheMounth: {
    color: Colors.primari300,
    fontSize: 24,
  },
  detailsContainer: {
    height: 450,
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  descriereContainer: {
    alignSelf: "center",
    marginVertical: 20,
    backgroundColor: Colors.secondary500,
    width: "92%",
    borderRadius: 8,
  },

  descriereText: {
    padding: 10,
    textAlign: "center",
    color: Colors.gray500,
  },
  mapView: {
    height: 200,
    width: "100%",
    backgroundColor: "white",
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
  addComBtn:{
    marginBottom:-20
  }
});
