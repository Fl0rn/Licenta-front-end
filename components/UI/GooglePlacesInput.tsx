import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_KEY } from "../../util/constants";
import { StyleSheet } from "react-native";
import { Colors } from "../../util/Colors";

function GooglePlacesInput({
  onHandleInput,
}: {
  onHandleInput: (value: string | number | [number, number], name: string) => void;
}) {
  return (
    <GooglePlacesAutocomplete
      GooglePlacesDetailsQuery={{ fields: "geometry" }}
      placeholder="Adresa"
      onPress={(data, details = null) => {
        if (details) {
          console.log(details);
          onHandleInput(data.description, "adresa");
          const coords: [number, number] = [0, 0];
          coords[0] = details.geometry?.location.lat ?? 0;
          coords[1] = details.geometry?.location.lng ?? 0;
          onHandleInput(coords, "coordonate");
        }
      }}
      query={{
        key: API_KEY,
        language: "en",
      }}
      fetchDetails={true}
      styles={{
        container: { position: "absolute", top: 0, left: 0, right: 0 },
        listView: { zIndex: 9999 },
        textInputContainer: styles.textInputContainer,
        textInput: styles.textInput,
      }}
      textInputProps={{
        placeholderTextColor: "white",
      }}
      onFail={(error) => console.error(error)}
    />
  );
}

export default GooglePlacesInput;

const styles = StyleSheet.create({
  placesAutocompleteContainer: {
    zIndex: 99,
    width: 100,
    flex: 0.5,
  },
  textInputContainer: {
    width: 320,
  },
  textInput: {
    height: 38,
    color: "white",
    fontSize: 16,
    backgroundColor: Colors.secondary500,
    width: 340,
  },
});