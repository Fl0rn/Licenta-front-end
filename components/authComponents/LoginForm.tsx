import { StyleSheet, TextInput, View,Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 

type LoginFormProps = {
  onLoginValuesHandler: (enteredValue: string, name: string) => void;
  loginValidity:{
    email:string,
    parola:string,
  }
};

export default function LoginForm({ onLoginValuesHandler,loginValidity }: LoginFormProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer ,loginValidity.email !== "" && styles.invalidField]}>
        <MaterialIcons name="email" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="Email"
          onChangeText={(enteredValue) =>
            onLoginValuesHandler(enteredValue, "email")
          }
          style={styles.input}
        />
      </View>
      {loginValidity.email !== "" && <Text style={styles.invalidText}>{loginValidity.email}</Text>}
      <View style={[styles.inputContainer, loginValidity.parola !=="" && styles.invalidField]}>
        <MaterialIcons name="lock" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="Parola"
          onChangeText={(enteredValue) =>
            onLoginValuesHandler(enteredValue, "parola")
          }
          style={styles.input}
        />
      </View>
      {loginValidity.parola !== "" && <Text style={styles.invalidText}>{loginValidity.parola}</Text>}

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center'
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    width:190,
    paddingVertical:5
    
  },
  input: {
    flex: 1, 
    paddingHorizontal: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
  invalidField:{
    backgroundColor:"#F89A9A",
  },
  invalidText:{
    color:'#FFFF',
    fontWeight:'bold',
  }
});
