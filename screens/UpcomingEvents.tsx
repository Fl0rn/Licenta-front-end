import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import IconTextBtn from "../components/UI/IconTextBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_LINK } from "../util/constants";
import { Colors } from "../util/Colors";
import EventItem from "../components/eventComponents/EventItem";
import { Event } from "./EventScreen";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackPrams } from "../stack/Non-authenticated";


function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  return `${day < 10 ? '0' : ''}${day} ${month}`;
}

export function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isActive, setIsActive] = useState(0);
  const navigation = useNavigation<StackNavigationProp<RootStackPrams>>();

  
  const today = new Date();
  today.setHours(0, 0, 0, 0);


  const days = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date.getTime();
  });

  async function getAllEvents() {
    try {
      const response = await axios.get(BACKEND_LINK + "/getAllEvents");
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }

  useEffect(() => {
    getAllEvents();
  }, []);

  function handleSelect(timestamp: number, number: number) {
    setFilteredEvents(events.filter(event => event.dataTimp >= timestamp && event.dataTimp < timestamp + 86400000)); // Filter events for the specific day
    setIsActive(number);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Urmeaza</Text>
      <View style={styles.btnContainer}>
        <ScrollView horizontal>
          {days.map((day, index) => (
            <IconTextBtn
              key={index}
              isActive={isActive === index + 1}
              name="calendar"
              color={Colors.primari300}
              size={20}
              date={formatTimestamp(day)}
              handleSelect={() => handleSelect(day, index + 1)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={{ height: 500 }}>
        <FlatList
          data={filteredEvents}
          renderItem={({ item }) => (
            <EventItem
              image={`${BACKEND_LINK}/eventImages/${item.id}.jpg`}
              data={item.dataTimp}
              titlu={item.titlu}
              id={item.id}
              onPressToNavigate={(id) => navigation.navigate("DetailPage", { id })}
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
  title: {
    color: Colors.primary500,
    fontSize: 28,
    margin: 10,
  },
  btnContainer: {
    flexDirection: "row",
  },
});