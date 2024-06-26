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
  const [forcedRerender, setForceRerender] = useState(0);
  const [filters, setFilters] = useState<string[]>([]);
  const [plangeriCopy,setPlangeriCopy] = useState<TownHallPlangeri[]>([])
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
    setPlangeriCopy(response)
  }
  useEffect(() => {
    fetchPlangeri();
  }, [forcedRerender]);
  async function showModalHandler(modal: boolean, id: string) {
    setShowModal(modal);

    const response = await getPlangereId(id);
    setPlangere(response);
    
  }

  function handleAddFilters(status: string) {
    if (filters?.includes(status)) {
      const newFilters = filters.filter((item) => item !== status);
      setFilters(newFilters);
    } else {
      setFilters((prevState) => [...prevState, status]);
    }
  }
  
  function filterItems() {
    if (filters.length > 0) {
      let tempItems = filters.map((selectedCategory) => {
        let temp = plangeri.filter((pl) => pl.status === selectedCategory);
        return temp;
      });
      
      setPlangeri(tempItems.flat());
    } else {
      setPlangeri([...plangeriCopy]);
    }
  }

  useEffect(() => {
    filterItems();
  }, [filters]);
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plangeri</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.btnContainer}>
          <View style={styles.buttonsView}>
            {StatusButtons.map((status) => (
              <CustomOutlineBtn
                color={Colors.primari300}
                title={status}
                onPress={() => {handleAddFilters(status)}}
                key={status}
                height={40}
                width={100}
                disabled={false}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.flatList}>
        <FlatList
          data={plangeri}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ReclamatiiItem plangereObj={item} onShowModal={showModalHandler} />
          )}
        />
      </View>

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
    paddingTop: 50,
    justifyContent: "space-around",
    backgroundColor: Colors.secondary300,
  },
  btnContainer: {
    marginTop: 50,
  },
  buttonsView: {
    flexDirection: "row",
  },
  title: {
    color: Colors.primari300,
    fontSize: 28,
    margin: 10,
  },
  flatList: {
    flex: 10,
  },
});
