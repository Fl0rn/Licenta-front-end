import { Button, StyleSheet, Text, View } from "react-native";
import AuthForm from "../components/authComponents/AuthForm";
import LoginBtn from "../components/UI/LogInBtn";
import { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { storeUser } from "../components/http";
import LoginForm from "../components/authComponents/LoginForm";
import { AuthContext, UserModel } from "../store/auth-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../util/Colors";
import { BACKEND_LINK } from "../util/constants";
export type UserFormState = {
  nume: string;
  email: string;
  cnp: string;
  oras: string;
  parola: string;
};
type UserLoginState = {
  email: string;
  parola: string;
};
type ValidityInfo = {
  nume: boolean | null;
  email: boolean | null;
  cnp: boolean | null;
  oras: boolean | null;
  parola: boolean | null;
};
export default function AuthScreen() {
  const authCtx = useContext(AuthContext);
  const [isLogin, setIslogin] = useState<boolean>(false);
  const [registerValues, setRegisterValues] = useState<UserFormState>({
    nume: "",
    email: "",
    cnp: "",
    oras: "",
    parola: "",
  });
  const [loginValues, setLoginValues] = useState<UserLoginState>({
    email: "",
    parola: "",
  });
  
  const [validityInfo, setValidityInfo] = useState<ValidityInfo>({
    nume: true,
    email: true,
    cnp: true,
    oras: true,
    parola: true,
  });

  const [validityLogin, setValidityLogin] = useState<UserLoginState>({
    email:"",
    parola:"",
  })
  const loginInfo: UserLoginState = loginValues;
  function loginValuesHandler(enteredValue: string, name: string) {
    setLoginValues((prevState) => ({
      ...prevState,
      [name]: enteredValue,
    }));
  }
  const authInfo: UserFormState = registerValues;
  function registerValuesHandler(enteredValue: string, name: string) {
    setRegisterValues((prevState) => ({
      ...prevState,
      [name]: enteredValue,
    }));
  }

  async function handleRegisterPress(registerValues: UserFormState) {
   
    console.log(registerValues)
   
    let validityInfoCopy = { ...validityInfo };
    validityInfoCopy = { 
      email:true,
      cnp:true,
      nume:true,
      oras:true,
      parola:true,
    }
    if (!registerValues.email.includes("@") || registerValues.email.length < 6) {
      validityInfoCopy.email = false;
    }
    

    if (registerValues.cnp.length !== 10) {
      validityInfoCopy.cnp = false;
    }

    if (registerValues.cnp === "") {
      validityInfoCopy.cnp = null;
    }
    if (registerValues.nume === "") {
      validityInfoCopy.nume = null;
    }
    if (registerValues.email === "" ) {
      validityInfoCopy.email = null;
    }
    if (registerValues.oras === "") {
      validityInfoCopy.oras = null;
    }
    if (registerValues.parola === "") {
      validityInfoCopy.parola = null;
    }

    setValidityInfo(validityInfoCopy);
    console.log(validityInfo);

    if (
      validityInfoCopy.cnp &&
      validityInfoCopy.email &&
      validityInfoCopy.nume !== null &&
      validityInfoCopy.oras !== null &&
      validityInfoCopy.parola !== null
    ) {
      const userSaved = await axios.post(BACKEND_LINK +"/addUser", authInfo);
      
      const userToStore = {...userSaved.data,id:userSaved.data._id}
      console.log(userToStore)
      authCtx.authenticate(userToStore);
    }
  }

  async function handleLoginPress(loginInfo: UserLoginState) {
    
    try {
      const response = await axios.post(
          BACKEND_LINK + "/login",
        loginInfo
      );
      
        const infoToStore :UserModel ={
         id:response.data._id,
         nume: response.data.nume,
         email:response.data.email,
         cnp:response.data.cnp,
         oras: response.data.oras,
         parola: response.data.parola

        } 
          
        console.log(infoToStore)

    
      authCtx.authenticate(infoToStore);
    }catch (error) {
      console.error("Error:", error);
      setValidityLogin({
        email:"",
        parola:"",
      })
      if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data || error.message;
          const words = errorMessage.split(" "); 
          const lastWord = words[words.length - 1]; 
  
        
          if (lastWord.toLowerCase() === "email") {
            setValidityLogin((prevState)=>({
                ...prevState,
                [lastWord.toLowerCase()]:errorMessage,
             }))
              
          } if(lastWord.toLowerCase() === "parola") {
            setValidityLogin((prevState)=>({
              ...prevState,
              [lastWord.toLowerCase()]:errorMessage,
           }))
          }
      }
  }
  
  }

  function handleSwitchMode() {
    if (isLogin) {
      setIslogin(false);
    } else {
      setIslogin(true);
    }
  }

  return (
    <LinearGradient
      colors={Colors.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.15, 0.5, 0.8]}
      style={styles.container}
    >
      <View style={styles.infoContainer}>
        {isLogin ? (
          <Text style={styles.text}>Register</Text>
        ) : (
          <Text style={styles.text}>LogIn</Text>
        )}
        {isLogin ? (
          <AuthForm
            onRegisterValuesHandler={registerValuesHandler}
            validity={validityInfo}
          />
        ) : (
          <LoginForm onLoginValuesHandler={loginValuesHandler} loginValidity ={validityLogin}  />
        )}
        <View style={styles.btnContainer}>
          <LoginBtn
            mode={isLogin ? "Register" : "Login"}
            onPress={
              isLogin
                ? () => handleRegisterPress(registerValues)
                : () => handleLoginPress(loginInfo)
            }
          />
          <Button
            title={isLogin ? "Go to login" : "Go to register"}
            onPress={handleSwitchMode}
            color={"#69DBEA"}
          />
          <Button title="Forgot Password?" color={"#69DBEA"}/>
        </View>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(192, 192, 192, 0.2)",
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    padding: 20,
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
});
