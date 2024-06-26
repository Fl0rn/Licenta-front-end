import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
type AuthFormProps = {
  onRegisterValuesHandler: (enteredValue: string, name: string) => void;
  validity: {
    nume: boolean | null;
    cnp: boolean | null;
    email: boolean | null;
    oras: boolean | null;
    parola: boolean | null;
  };
};

export default function AuthForm({
  onRegisterValuesHandler,
  validity,
}: AuthFormProps) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          validity.nume === null && styles.invalidField,
        ]}
      >
        <MaterialIcons
          name="account-box"
          size={24}
          color="black"
          style={styles.icon}
        />
        <TextInput
          placeholder="Nume"
          onChangeText={(enteredValue) =>
            onRegisterValuesHandler(enteredValue, "nume")
          }
        />
      </View>
      <View>
        {validity.nume === null && (
          <Text style={styles.invalidText}>Introduce-ti-va numele</Text>
        )}
      </View>
      <View
        style={[
          styles.inputContainer,
          (validity.email === null || validity.email === false) &&
            styles.invalidField,
        ]}
      >
        <MaterialIcons
          name="email"
          size={24}
          color="black"
          style={styles.icon}
        />

        <TextInput
          placeholder="Email"
          onChangeText={(enteredValue) =>
            onRegisterValuesHandler(enteredValue, "email")
          }
        />
      </View>
      <View>
        {validity.email === false && (
          <Text style={styles.invalidText}>Emailul nu este valid</Text>
        )}
        {validity.email === null && (
          <Text style={styles.invalidText}>Introduce-ti-va emailul</Text>
        )}
      </View>
      <View
        style={[
          styles.inputContainer,
          (validity.cnp === null || validity.cnp === false) &&
            styles.invalidField,
        ]}
      >
        <MaterialIcons
          name="email"
          size={24}
          color="black"
          style={styles.icon}
        />
        <TextInput
          placeholder="CNP"
          onChangeText={(enteredValue) =>
            onRegisterValuesHandler(enteredValue, "cnp")
          }
        />
      </View>
      <View>
        {validity.cnp === null && (
          <Text style={styles.invalidText}>Introduce-ti-va CNP-ul</Text>
        )}
        {validity.cnp === false && (
          <Text style={styles.invalidText}>Emailul nu este valid</Text>
        )}
      </View>
      <View
        style={[
          styles.inputContainer,
          validity.oras === null && styles.invalidField,
        ]}
      >
        <MaterialIcons
          name="place"
          size={24}
          color="black"
          style={styles.icon}
        />
        <TextInput
          placeholder="Oras"
          onChangeText={(enteredValue) =>
            onRegisterValuesHandler(enteredValue, "oras")
          }
        />
      </View>
      <View>
        {validity.oras === null && (
          <Text style={styles.invalidText}>Introduce-ti-va orasul</Text>
        )}
      </View>
      <View
        style={[
          styles.inputContainer,
          validity.parola === null && styles.invalidField,
        ]}
      >
        <MaterialIcons
          name="lock"
          size={24}
          color="black"
          style={styles.icon}
        />
        <TextInput
          placeholder="Parola"
          onChangeText={(enteredValue) =>
            onRegisterValuesHandler(enteredValue, "parola")
          }
        />
      </View>
      <View>
        {validity.parola === null && (
          <Text style={styles.invalidText}>Introduce-ti-va parola</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    width: 190,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    maxWidth: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
  invalidField: {
    backgroundColor: "#F89A9A",
  },
  invalidText: {
    color: "#FFFF",
    fontWeight: "bold",
  },
});
