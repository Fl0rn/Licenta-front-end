import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { BACKEND_LINK, DUMMY_EVENT } from "../util/constants";
import { Ionicons } from "@expo/vector-icons";
import { ButtonTypes } from "../util/constants";
import EventTypeBtn from "../components/UI/EventTypeBtn";
import EventItem from "../components/eventComponents/EventItem";
import IconBtn from "../components/UI/IconBttn";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackPrams } from "../App";
import { Colors } from "../util/Colors";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AddEventState } from "../components/eventComponents/AddEventForm";
import timestampToDate from "../util/methods";
import { AuthContext } from "../store/auth-context";
interface Event {
  id: string;
  creatorId: string;
  creatorEmail: string;
  imagine: string;
  titlu: string;
  tip: string;
  dataTimp: number;
  adresa: string;
  oras: string;
  descriere: string;
  coordonate: number[];
}
type Props = StackNavigationProp<RootStackPrams,'EventScreen'>
export default function EvemtsSreen() {
  const authCtx = useContext(AuthContext)
  const navigation = useNavigation<StackNavigationProp<RootStackPrams>>();
  function hadlePress() {
    navigation.replace("AddEvent");
  }
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    
    getAllEvents();
  }, []);
  async function getAllEvents() {
    try {
      const response = await axios.get(BACKEND_LINK + "/getAllEvents");
     
      setEvents(response.data); 
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }
  return (
    <View style={styles.container}>
      <View>

      

      <View style={styles.topContainer}>
        <View >
          <Text style={styles.title}>Evenimente </Text>
        </View>
        <View>
         {authCtx.userInfo?.acountType! > 0 && <IconBtn
            iconName="add-circle"
            size={46}
            color={Colors.primari300}
            onPress={hadlePress}
          />}
        </View>
      </View>
      

      <View style={styles.inputContainer}>
        <View style={styles.smallInputContainer}>
          <Ionicons
            name="search"
            color={"black"}
            size={24}
            style={{ marginRight: 10 }}
          />
          <TextInput placeholder="Cautare" style={styles.input} />
        </View>
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {ButtonTypes.map((mode) => (
            <EventTypeBtn key={mode} mode={mode} />
          ))}
        </ScrollView>
      </View>

      </View>
      
      <View style={{height:500}}>
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <EventItem
              image={`${BACKEND_LINK}/eventImages/${item.id}.jpg`}
              data={item.dataTimp}
              titlu={item.titlu}
              id={item.id}
              onPressToNavigate={(id)=>navigation.navigate("DetailPage",{id:id})}
              
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: Colors.primari300,
    fontSize: 28,
    margin: 10,
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 30,
    marginVertical: 30,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  smallInputContainer: {
    flexDirection: "row",
  },
  input: {
    width: 200,
  },
});
