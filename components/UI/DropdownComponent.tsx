import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from "@expo/vector-icons";
import { Colors } from '../../util/Colors';

const data = [
  { label: 'Divertisment', value: '1' },
  { label: 'Cultural', value: '2' },
  { label: 'StreetFood', value: '3' },
  { label: 'Targuri', value: '4' },
  { label: 'Concerte', value: '5' },
  { label: 'Conferinte', value: '6' },
];

const orase = [
  { label: 'Timisoara', value: '1' },
  { label: 'Oradea', value: '2' },
  { label: 'Cluj', value: '3' },
  { label: 'Bucuresti', value: '4' },
  { label: 'Constanta', value: '5' },
];

const status = [
  { label: 'In lucru', value: '1' },
  { label: 'Neabordata', value: '2' },
  { label: 'Finalizata', value: '3' },
];

type DropdownComponentProps = {
  label: string,
  mode: string,
  width: number,
  height: number,
  icon: "location-outline" | "body-outline" | "hammer-outline",
  onHandleInput: (value: string | number | [number, number], name: string) => void,
};

const DropdownComponent = ({
  label = '',
  mode = '',
  icon = 'location-outline',
  onHandleInput = () => {},
  width = 200,
  height = 50
}: DropdownComponentProps) => {
  const [value, setValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, { color: 'white', backgroundColor: Colors.secondary300 }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  const getDropdownData = () => {
    if (mode === "eventtype") {
      return data;
    } else if (mode === "city") {
      return orase;
    } else if (mode === "Status") {
      return status;
    } else {
      return [];
    }
  };

  const handleInput = (label: string) => {
    if (mode === "city") {
      onHandleInput(label, "oras");
    } else if (mode === "Status") {
      onHandleInput(label, "status");
    } else {
      onHandleInput(label, "tip");
    }
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, { width: width, height: height }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={getDropdownData()}
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
          handleInput(item.label);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Ionicons
            style={styles.icon}
            color="white"
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
    backgroundColor: Colors.secondary300,
    padding: 10,
  },
  dropdown: {
    borderColor: Colors.primari300,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: Colors.secondary300,
    left: 22,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'white',
  },
});