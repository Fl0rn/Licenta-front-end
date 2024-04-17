import React, { useState } from "react";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DropdownComponent from "../UI/DropdownComponent";
import { Colors } from "../../util/Colors";
import DateTimePickerComponent from "../UI/DateTimePicker";
import ImagePickerModal from "../UI/ImagePickerModal";
import GooglePlacesInput from "../UI/GooglePlacesInput";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import CustomOutlineBtn from "../UI/CustomOutlineBtn";
import { API_KEY, BACKEND_LINK } from "../../util/constants";
import * as FileSystem from "expo-file-system";
import Geocoder from 'react-native-geocoding';
import axios from "axios";
export type AddEventState = {
  imagine: string;
  titlu: string;
  tip: string;
  dataTimp: number;
  adresa: string;
  oras: string;
  descriere: string;
  coordonate: [number, number];
};
type ValueTypes = string | number | [number, number];
export default function AddEventForm() {
  Geocoder.init(API_KEY);
  const [date, setDate] = useState<Date>(new Date());
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | false>(false);

 
  const [values, setValues] = useState<AddEventState>({
    imagine: "",
    titlu: "",
    tip: "",
    dataTimp: 0,
    adresa: "",
    oras: "",
    descriere: "",
    coordonate: [0.0, 0.0],
  });

  const convertImageToBase64 = async (uri: string) => {
    try {
      const base64String = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64String;
    } catch (error) {
      console.error("Failed to convert image to base64:", error);
      throw error;
    }
  };

  async function previewImageHandler(uri: string) {
    setImagePreview(uri);
    const base64Img = await convertImageToBase64(uri);
    valuesHandler(base64Img, "imagine");
    setIsModalVisible(false);
  }
  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    const newDate = new Date(currentDate).getTime()
    valuesHandler(newDate, "dataTimp");
  };
  function modalVisibleHandler(bool: boolean) {
    setIsModalVisible(bool);
  }
  function valuesHandler(value:ValueTypes, name: string) {
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  Geocoder.from(values.adresa)
  .then(json => {
    const location = json.results[0].geometry.location;
    const coord: [number, number] = [location.lat, location.lng];
    valuesHandler(coord, "coordonate");
  })
  

  function handleSubmitForm() {
    axios.post(BACKEND_LINK + "/addNewEvent", values);
    //console.log(values)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={{ zIndex: 1 }}>
        <View style={styles.imageContainer}>
          <Image
            source={
              imagePreview
                ? { uri: imagePreview }
                : require("../../util/photos/download.jpg")
            }
            style={styles.image}
          />
        </View>

        <Button
          title="Adauga imagine"
          onPress={() => setIsModalVisible(true)}
        />
        <ImagePickerModal
          visible={isModalVisible}
          onPressHandler={modalVisibleHandler}
          onImagePrevHandler={previewImageHandler}
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Titlu"
            style={styles.input}
            onChangeText={(enteredText) => valuesHandler(enteredText, "titlu")}
          />
        </View>

        <DropdownComponent
          mode="eventtype"
          label="Categorie eveniment"
          icon="body-outline"
          onHandleInput={valuesHandler}
        />

        <View style={styles.dateTimeContainer}>
          <View style={[styles.dateTime, { marginRight: 150 }]}>
            <Text style={styles.dateTimeText}>Data</Text>
            <DateTimePickerComponent
              mode="date"
              date={date}
              onChange={onChange}
            />
          </View>

          <View>
            <Text style={styles.dateTimeText}>Ora</Text>
            <DateTimePickerComponent
              mode="time"
              date={date}
              onChange={onChange}
            />
          </View>
        </View>
        <View style={{ height: 50, zIndex: 2, elevation: 2, marginLeft: 20 }}>
          <GooglePlacesInput onHandleInput={valuesHandler} />
        </View>

        <DropdownComponent
          mode="city"
          label="Oras"
          icon="location-outline"
          onHandleInput={valuesHandler}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descriere</Text>
            <TextInput
              style={styles.description}
              multiline
              onChangeText={(enteredText) =>
                valuesHandler(enteredText, "descriere")
              }
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.submitBtn}>
          <CustomOutlineBtn
            color={Colors.primari300}
            title="Adauga eveniment"
            onPress={handleSubmitForm}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 80,
    paddingBottom: 60,
  },
  imageContainer: {
    width: 340,
    height: 150,
    marginBottom: 20,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  inputContainer: {
    width: 340,
    marginBottom: 20,
    alignSelf: "center",
  },
  label: {
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: Colors.gray700,
    borderRadius: 10,
  },
  dateTimeContainer: {
    flexDirection: "row",

    width: 335,
    
    alignSelf: "center",
  },
  dateTime: {
    flex: 1,
  },
  dateTimeText: {
    marginBottom: 5,
  },
  description: {
    width: "100%",
    height: 120,
    padding: 12,
    backgroundColor: Colors.gray700,
    borderRadius: 10,
    textAlignVertical: "top",
  },
  placesAutocompleteContainer: {
    width: 300,
    marginBottom: 10,
    alignSelf: "center",
  },
  textInputContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 38,
    color: "#5d5d5d",
    fontSize: 16,
  },
  submitBtn:{
    marginBottom:20,
  }
});
