import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_KEY } from '../../util/constants';
import { StyleSheet } from 'react-native';
import { Colors } from '../../util/Colors';

function GooglePlacesInput({ onHandleInput }: { onHandleInput: (value: string | Date, name: string) => void }) {
  return   <GooglePlacesAutocomplete
  placeholder="Search"
  onPress={(data, details = null) => onHandleInput(data.description,"adresa")}
  query={{
    key: API_KEY,
    language: "en",
  }}
  styles={{
    container: { position: "absolute", top: 0, left: 0, right: 0 }, 
    listView: { zIndex: 9999 },
    textInputContainer: styles.textInputContainer,
    textInput: styles.textInput,
  }}
  onFail={(error) => console.error(error)}
/>
};

export default GooglePlacesInput;
const styles = StyleSheet.create({
    placesAutocompleteContainer: {
        zIndex:99,
        marginBottom: 20,
        flex:0.5
      },
      textInputContainer: {
       
        width:300
      },
      textInput: {
        
        height: 38,
        color: 'black',
        fontSize: 16,
        backgroundColor:Colors.gray500,
        width:320,
      },
})