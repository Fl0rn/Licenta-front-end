import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from "@expo/vector-icons";
import {useState} from 'react';
const data = [
  { label: 'Divertisment', value: '1' },
  { label: 'Cultural', value: '2' },
  { label: 'StreetFood', value: '3' },
  { label: 'Targuri', value: '4' },
  { label: 'Concerte', value: '5' },
  { label: 'Conferinte', value: '6' },

];
const orase=[
  { label: 'Timisoara', value: '1' },
  { label: 'Oradea', value: '2' },
  { label: 'Cluj', value: '3' },
  { label: 'Bucuresti', value: '4' },
  { label: 'Constanta', value: '5' },
]
type DropdownComponentProps ={
  label:string,
  mode:string,
  icon:"location-outline"|"body-outline"
  onHandleInput:(value: string | number | [number, number], name: string) => void; 
}
const DropdownComponent = ({label,mode,icon,onHandleInput}:DropdownComponentProps) => {
  const [value, setValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'gray' }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={mode === "eventtype"?data : orase}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? `${label}` : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onHandleInput(item.label,mode === "city" ? "oras" : "tip");
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Ionicons
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name={icon}
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  dropdown: {
    height: 50,
    width:338,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,

  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});