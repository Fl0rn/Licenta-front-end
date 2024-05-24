import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { getAllPlangeri, getPlangereId } from "../http";

import ReclamatiiItem, { TownHallPlangeri } from "./ReclamatiiItem";
import { Colors } from "../../util/Colors";
import { StatusButtons } from "../../util/constants";
import CustomOutlineBtn from "../UI/CustomOutlineBtn";
import DetailPlangeriModal from "./DetailPlangeriModal";

type TownHallPlangeriReq = {
  _id: string;
} & TownHallPlangeri;

export default function TownHallPage() {
  const [showModal, setShowModal] = useState(false);
  const [forcedRerender,setForceRerender] = useState(0)
  const [plangeri, setPlangeri] = useState<TownHallPlangeri[]>([
    {
      accountId: "",
      accountName: "",
      description: "",
      id: "",
      latitude: 0,
      longitude: 0,
      status: "",
      title: "",
      adress: "",
      date: 0,
    },
  ]);
  const [plangere, setPlangere] = useState<TownHallPlangeri>({
    accountId: "",
    accountName: "",
    description: "",
    id: "",
    latitude: 0,
    longitude: 0,
    status: "",
    title: "",
    adress: "",
    date: 0,
  });
  async function fetchPlangeri() {
    const response = await getAllPlangeri();
    setPlangeri(response);
  }
  useEffect(() => {
    fetchPlangeri();
  }, [forcedRerender]);
  async function showModalHandler(modal: boolean, id: string) {
    setShowModal(modal);

    const response = await getPlangereId(id);
    setPlangere(response);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plangeri</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.buttonsView}>
          {StatusButtons.map((status) => (
            <CustomOutlineBtn
              color={Colors.primari300}
              title={status}
              onPress={() => {}}
              key={status}
            />
          ))}
        </View>
      </ScrollView>
      <FlatList
        data={plangeri}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ReclamatiiItem plangereObj={item} onShowModal={showModalHandler} />
        )}
      />
      <DetailPlangeriModal
        visible={showModal}
        plangere={plangere}
        onCloseModal={setShowModal}
        rerender={setForceRerender}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignContent: "center",
  },
  buttonsView: {
    flexDirection: "row",
  },
  title: {
    color: Colors.primari300,
    fontSize: 28,
    margin: 10,
  },
});
