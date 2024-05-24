import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
  Region,
} from "react-native-maps";
import { BACKEND_LINK, TIMISOARA, TIMISOARA_POLIGON, TIMISOARA_POLIGON2 } from "../../util/constants";
import IconBtn from "../UI/IconBttn";
import { Colors } from "../../util/Colors";
import MarkerInfo from "./MarkerInfo";
import AddCommentBtn from "../UI/AddCommentBtn";
import AddReclamatieModal from "./AddReclamatieModal";
import { getPlangeriStatusColor } from "../../util/methods";
import LegendaModal from "./LegendaModal";

export type Plangeri = {
  id: string;
  accountName: string;
  accountId: string;
  title: string;
  description: string;
  status: string;
  latitude: number;
  longitude: number;
};
export default function UserCreatorPage() {
  const [markerCoords, setMarkerCoords] = useState<LatLng | null>(null);
  
  const handlePress = (event: LongPressEvent): void => {
    const coords = event.nativeEvent.coordinate;
    const trimmedCoords: LatLng = {
      latitude: parseFloat(coords.latitude.toFixed(6)),
      longitude: parseFloat(coords.longitude.toFixed(6)),
    };
    setMarkerCoords(trimmedCoords);
    console.log(trimmedCoords);
  };
  const [plangeri, setPlangeri] = useState<Plangeri[]>([
    {
      accountId: "",
      accountName: "",
      description: "",
      id: "",
      latitude: 0,
      longitude: 0,
      status: "",
      title: "",
    },
  ]);
  useEffect(() => {
    async function fetchPlangeri() {
      const response = await axios.get(BACKEND_LINK + "/getAllPlangeri");
      setPlangeri(response.data);
      console.log("plangeri",response.data)
    }
    fetchPlangeri();
  }, []);

  console.log(plangeri);

  const mapRef = useRef<MapView>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [legendaModal,setLegendaModal] = useState(false)
  const handleRegionChange = (newRegion: Region) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = TIMISOARA;
    const { latitude: newLat, longitude: newLng } = newRegion;

    if (
      newLat > latitude + latitudeDelta / 2 ||
      newLat < latitude - latitudeDelta / 2 ||
      newLng > longitude + longitudeDelta / 2 ||
      newLng < longitude - longitudeDelta / 2
    ) {
      mapRef.current?.animateToRegion(TIMISOARA, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.mapView}
        initialRegion={TIMISOARA}
        // maxDelta={0.1}
        //provider={PROVIDER_GOOGLE}
        //onRegionChange={handleRegionChange}
        mapType="mutedStandard"
        onLongPress={handlePress}
        onDoublePress={()=>setMarkerCoords(null)}
       
      >
        <Polygon
          coordinates={TIMISOARA_POLIGON}
          strokeColor="rgba(0, 0, 0, 0)"
          fillColor="rgba(0, 0, 0, 0.5)"
        />

        <Polygon
          coordinates={TIMISOARA_POLIGON2}
          strokeColor="rgba(0, 0, 0, 0)"
          fillColor="rgba(0, 0, 0, 0.5)"
        />
        {markerCoords && <Marker coordinate={markerCoords} >
            <Callout>
              <View style={styles.callout}>
              <IconBtn color={Colors.primari300} size={35} iconName="add-circle" onPress={()=>{setShowModal(true)}}/>
              </View>
            </Callout>
          </Marker>}
        {plangeri.map((item, index) => (
          <Marker
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            key={`${item.id}-${index}`}
            pinColor={getPlangeriStatusColor(item.status)}
          >
            <Callout>
              <MarkerInfo
                id={item.id}
                description={item.description}
                status={item.status}
                title={item.title}
                key={`${item.id}-${index}`}
              />
            </Callout>
          </Marker>
        ))}

      </MapView>
      <View style={[styles.infoBtnView,{marginRight:15}]}>
        <AddCommentBtn name ="info" onPress={()=>setLegendaModal(true)} height={40} width={40} backgroundColor={Colors.primari300} iconColor="white" iconSize={40}/>
      </View>
      <View style={styles.addBtnView}>
        <AddCommentBtn onPress={setShowModal} name="add-circle" height={70} width={70} backgroundColor={Colors.primari300} iconColor="white" iconSize={30}/>
      </View>
      <AddReclamatieModal
        visible={showModal}
        onShowModal={setShowModal}
        addPlangere={(newPlangeri) =>
          setPlangeri((prevPlangeri) => [...prevPlangeri, newPlangeri])
        }
        coordsFormPressingScreen = {markerCoords}
        setCoordsFormPressingScreen = {setMarkerCoords}
      />
      <LegendaModal visible={legendaModal} setModalVisible={setLegendaModal}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
  callout:{
    height:50,
    width:50,
    alignItems:'center',
    justifyContent:'center',
  },
  addBtnView: {
    marginBottom: -70,
  },
  infoBtnView:{
    marginBottom:90
  }
});
