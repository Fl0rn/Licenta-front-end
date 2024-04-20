import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { RootStackPrams } from "../App";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, BACKEND_LINK, TIMISOARA } from "../util/constants";
import timestampToDate, { formatTime } from "../util/methods";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../util/Colors";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { PermissionStatus, getCurrentPositionAsync, useForegroundPermissions } from "expo-location";
type Props = StackScreenProps<RootStackPrams, "DetailPage">;

export default function DetailScreen({ route }: Props) {
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
  const [location,setLocation] = useState({latitude:0,longitude:0})
  useEffect(() => {
    async function getEvent() {
      const requestData = { eventId: route.params.id };
      const response = await axios.get(BACKEND_LINK + "/getEventById", {
        params: requestData,
      });

      setValues(response.data);
    }
    getEvent();
  }, []);
  const coords = {
    latitude:values.coordonate[0],
    longitude: values.coordonate[1],
  };
  const testOrigin = {
    latitude:45.748098,
    longitude: 21.227099,
  }

   const [locationPermissionInfo, requestPermission] = useForegroundPermissions()
   async function verifyPermissions() {
    if (locationPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert("Permisiuni insuficiente", "Trebuie sa accepti permisiunile");
      return false
    }
    return true
  }


    async function getLocationHandler(){
       const hasPermission = await verifyPermissions()
       if(!hasPermission){
           return;
       }
      const location = await getCurrentPositionAsync();
       setLocation({latitude: location.coords.latitude, longitude:location.coords.latitude})
    }
    getLocationHandler();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `http://192.168.0.127:3000/eventImages/${values.id}.jpg`,
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
        <View style={styles.descriereContainer}>
          <Text style={styles.descriereText}>{values.descriere}</Text>
        </View>
        <View style={styles.mapView}>
            <MapView style={styles.map} initialRegion={TIMISOARA}>
                <Marker coordinate={coords} />
                <MapViewDirections  origin={location} destination={coords} apikey={API_KEY}/>
            </MapView>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  imageContainer: {
    flex: 4,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  infoContainer: {
    flex: 2,
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
    flex: 8,
     margin: 20,
},
  descriereContainer: {
   marginVertical:20,
    backgroundColor:Colors.gray500,
    borderRadius:8
  },
  descriereText:{
    padding:10,
  },
  mapView:{
    height:200,
    width:"100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  map:{
    height:"100%",
    width:'100%',
    borderRadius:8,
    

  }
});
