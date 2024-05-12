import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
  Region,
} from "react-native-maps";
import {
  BACKEND_LINK,
  TIMISOARA,
  TIMISOARA_POLIGON,
  TIMISOARA_POLIGON2,
} from "../util/constants";
import { Colors } from "../util/Colors";
import AddCommentBtn from "../components/UI/AddCommentBtn";
import AddReclamatieBtn from "../components/reclamatiiComponents/AddReclamatieModal";
import AddReclamatieModal from "../components/reclamatiiComponents/AddReclamatieModal";
import MarkerInfo from "../components/reclamatiiComponents/MarkerInfo";
import axios from "axios";
type Plangeri = {
  id: string;
  accountName: string;
  accountId: string;
  title: string;
  description: string;
  status: string;
  latitude: number;
  longitude: number;
};
export default function ReclamatiiScreen() {
  const [plangeri, setPlangeri] = useState<Array<Plangeri>>([
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
    }
    fetchPlangeri();
  }, []);

  console.log(plangeri);

  const mapRef = useRef<MapView>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
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
  const testOrigin = {
    latitude: 45.748098,
    longitude: 21.227099,
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

        {plangeri.map((item) => (
          <Marker  coordinate={{ latitude: item.latitude, longitude: item.longitude }} key={item.id}> 
            <Callout>
              <MarkerInfo
                id={item.id}
                description={item.description}
                status={item.status}
                title={item.title}
                key={item.id}
              />
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.addBtnView}>
        <AddCommentBtn onPress={setShowModal} name="add-circle" />
      </View>
      <AddReclamatieModal visible={showModal} onShowModal={setShowModal} />
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
  addBtnView: {
    marginBottom: -70,
  },
});
