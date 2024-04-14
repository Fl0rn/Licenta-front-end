import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { DUMMY_EVENT } from "../util/constants";
import { Ionicons } from "@expo/vector-icons";
import { ButtonTypes } from "../util/constants";
import EventTypeBtn from "../components/UI/EventTypeBtn";
import EventItem from "../components/eventComponents/EventItem";
import IconBtn from "../components/UI/IconBttn";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackPrams } from "../App";
import { Colors } from "../util/Colors";

export default function EvemtsSreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackPrams>>()
function hadlePress(){
  navigation.navigate("AddEvent");
}
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.title}>Evenimente </Text>
        </View>
        <View>
          <IconBtn iconName="add-circle" size={46} color={Colors.primari300}  onPress={hadlePress}/>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.smallInputContainer}>
          <Ionicons name="search" color={"black"} size={24} style={{marginRight:10}} />
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

      <FlatList
        data={DUMMY_EVENT}
        renderItem={({ item }) => (
          <EventItem image={item.image} data={item.data} titlu={item.titlu} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container :{
    marginTop:50,
  },
    topContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    title:{
        color:Colors.primari300,
        fontSize:28,
        margin:10
    },
  inputContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal:30,
    marginVertical:30,
    padding:15,
    borderRadius:10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  smallInputContainer:{
    flexDirection:'row'
  },
  input: {
    
    width: 200,
  },
});
