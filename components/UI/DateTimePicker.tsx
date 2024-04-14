import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DateTimePicker, { Event as DateTimePickerEvent } from "@react-native-community/datetimepicker";

type DateTimePickerComponentProps = {
    mode: "date" | "time";
    date: Date;
    onChange: (event: any, selectedDate?: Date | undefined) => void;
  };

function DateTimePickerComponent({mode,date,onChange}:DateTimePickerComponentProps) {
 

  
  return (
    <View style={styles.container}>
      <DateTimePicker
        value={date}
        mode={mode}
        is24Hour={true}
        onChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
  },
  errText: {
    color: "red",
    fontSize: 15,
    marginTop: 2,
  },
});

export default DateTimePickerComponent;
