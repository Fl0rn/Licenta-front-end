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
import { Colors } from "../util/Colors";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AddEventState } from "../components/eventComponents/AddEventForm";
import timestampToDate from "../util/methods";
import { AuthContext } from "../store/auth-context";
import { RootStackPrams } from "../stack/AppContext";
import { configureProps } from "react-native-reanimated/lib/typescript/ConfigHelper";
export interface Event {
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
  participanti: string[];
  coordonate: number[];
}
type Props = StackNavigationProp<RootStackPrams, "EventScreen">;
export default function EvemtsSreen() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation<StackNavigationProp<RootStackPrams>>();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [recomendend, setIsRecomended] = useState(false);
  function hadlePress() {
    navigation.replace("AddEvent");
  }
  const [events, setEvents] = useState<Event[]>([]);
  const [copyEvents, setCopyEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  useEffect(() => {
    getAllEvents();
  }, []);
  async function getAllEvents() {
    try {
      const response = await axios.get(BACKEND_LINK + "/getAllEvents");

      setEvents(response.data);
      setCopyEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }
  async function handleChangeSearch(text: string) {
    setSearchQuery(text);
  }
  async function getSearchedEvents() {
    try {
      const response = await axios.get(BACKEND_LINK + "/getSearchedEvents", {
        params: { searchQuery },
      });

      setEvents(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getSearchedEvents();
  }, [searchQuery]);
  async function handlePickCategories(type: string) {
    if (type === "Urmatoare") {
      console.log(type);
      navigation.navigate("UpcomingPage");
    } else if (type === "Recomandate") {
      if (!recomendend) {
        const response = await axios.get(
          BACKEND_LINK + `/getRecomandedEvents?userId=${authCtx.userInfo?.id}`
        );
        setEvents(response.data);
        setIsRecomended(true)
      }else{
        setEvents(copyEvents)
        setIsRecomended(false)
      }
    } else {
      if (selectedFilters.includes(type)) {
        let filters = selectedFilters.filter((category) => category !== type);
        setSelectedFilters(filters);
      } else {
        setSelectedFilters((prevState) => [...prevState, type]);
      }
    }
  }
  function filterItems() {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = events.filter((event) => event.tip === selectedCategory);
        return temp;
      });

      setEvents(tempItems.flat());
    } else {
      setEvents([...copyEvents]);
    }
  }
  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.title}>Evenimente</Text>
          </View>
          <View>
            {authCtx.userInfo?.acountType! > 0 && (
              <IconBtn
                iconName="add-circle"
                size={46}
                color={Colors.primary500}
                onPress={hadlePress}
              />
            )}
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
            <TextInput
              placeholder="Cautare"
              style={styles.input}
              onChangeText={handleChangeSearch}
            />
          </View>
        </View>

        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ButtonTypes.map((mode) => (
              <EventTypeBtn
                key={mode}
                mode={mode}
                onPress={() => handlePickCategories(mode)}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={{ height: 500 }}>
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <EventItem
              image={`${BACKEND_LINK}/eventImages/${item.id}.jpg`}
              data={item.dataTimp}
              titlu={item.titlu}
              id={item.id}
              onPressToNavigate={(id) =>
                navigation.navigate("DetailPage", { id: id })
              }
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
    paddingTop: 50,
    backgroundColor: Colors.secondary300,
    flex: 1,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: Colors.primary500,
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
