import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BtnTaps from "./BtnTapsNavigation";
import AddEventScreen from "../screens/AddEventSreen";
import DetailScreen from "../screens/DetailScreen";
import AcceptRequestScreen from "../screens/AcceptRequsetScreen";
import { AuthenticationStack } from "./Non-authenticated";
import { UpcomingEvents } from "../screens/UpcomingEvents";
const Stack = createStackNavigator<RootStackPrams>();

export type RootStackPrams = {
  BtnTaps: undefined;
  AuthScreen: undefined;
  Authentication: undefined;
  AddEvent: undefined;
  EventScreen:undefined;
  DetailPage:{
    id:string,
  };
  UpcomingPage:undefined
  AcceptRequestScreen:undefined;
};

export function AppContent() {
    const authCtx = useContext(AuthContext);
    const [isTryingLogin, setIsTryingLogin] = useState(true);
    useEffect(() => {
      async function fetchInfo() {
        const storedInfo = await AsyncStorage.getItem("info");
        const objStored = JSON.parse(storedInfo!);
        if (storedInfo) {
          authCtx.authenticate(objStored);
        }
        setIsTryingLogin(false);
      }
      fetchInfo();
    }, []);
    if (isTryingLogin) {
      return <AppLoading />;
    }
  
    return (
      <>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            
            {!authCtx.isAuthenticated && (
              <Stack.Screen
                name="Authentication"
                component={AuthenticationStack}
                
              />
            )}
            {authCtx.isAuthenticated && <Stack.Screen name="BtnTaps" component={BtnTaps} />}
            <Stack.Screen name="AddEvent" component={AddEventScreen} />
            <Stack.Screen name="DetailPage" component={DetailScreen}/>
            <Stack.Screen name="AcceptRequestScreen" component={AcceptRequestScreen}/>
            <Stack.Screen name="UpcomingPage" component={UpcomingEvents}/>
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
  