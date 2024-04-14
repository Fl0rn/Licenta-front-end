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
import { API_KEY } from "../../util/constants";
import axios from "axios";
type AddEventState = {
  imagine: string;
  titlu: string;
  tip: string;
  dataTimp: Date;
  adresa: string;
  oras: string;
  descriere: string;
  coordonate: [number, number];
};
export default function AddEventForm() {
  const [date, setDate] = useState<Date>(new Date());
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | false>(false);

  const [values, setValues] = useState<AddEventState>({
    imagine: "",
    titlu: "",
    tip: "",
    dataTimp: new Date(),
    adresa: "",
    oras: "",
    descriere: "",
    coordonate: [0.0, 0.0],
  });

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    valuesHandler(currentDate, "dataTimp");
  };
  function previewImageHandler(uri: string) {
    setImagePreview(uri);
    valuesHandler(uri, "image");
    setIsModalVisible(false);
  }
  function modalVisibleHandler(bool: boolean) {
    setIsModalVisible(bool);
  }
  function valuesHandler(value: string | Date, name: string) {
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function handleSubmitForm() {
    axios.post("http://192.168.0.127:3000/login", values);
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
          <Text style={styles.label}>Titlu</Text>
          <TextInput
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
          <View style={styles.dateTime}>
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
        <View style={{ height: 70, zIndex: 2, elevation: 2 }}>
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
        <CustomOutlineBtn
          color={Colors.primari300}
          title="Adauga eveniment"
          onPress={handleSubmitForm}
        />
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
  },

  imageContainer: {
    width: 300,
    height: 150,
    marginTop: 80,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  inputContainer: {
    width: 300,
    marginBottom: 5,
  },
  label: {
    marginBottom: 10,
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
    justifyContent: "space-between",
    width: 300,
    marginBottom: 20,
  },
  dateTimeText: {
    marginBottom: 5,
  },
  dateTime: {
    marginRight: 130,
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
    marginBottom: 20,
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
});
