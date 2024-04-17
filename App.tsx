import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import EvemtsSreen from "./screens/EventScreen";
import AuthScreen from "./screens/AuthScreen";
import ReclamatiiScreen from "./screens/ReclamatiiScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AppLoading from "expo-app-loading";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogoutBtn from "./components/UI/LogoutBtn";
import AddEventScreen from "./screens/AddEventSreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { Colors } from "./util/Colors";
const Stack = createStackNavigator<RootStackPrams>();
const BtnTap = createBottomTabNavigator();
export type RootStackPrams = {
  BtnTaps: undefined;
  AuthScreen: undefined;
  Authentication: undefined;
  AddEvent: undefined;
};

function BtnTaps() {
  const authCtx = useContext(AuthContext);
  function handlerLogout() {
    authCtx.logout();
  }
  return (
    <BtnTap.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <BtnTap.Screen
        name="EventScreen"
        component={EvemtsSreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name="calendar" 
              size={24} 
              color={focused ? Colors.primari300 : color} 
            />
          ),
          tabBarActiveTintColor:Colors.primari300
        }}
      />
      <BtnTap.Screen
        name="ReclamatiiScreen"
        component={ReclamatiiScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name="map" 
              size={24} 
              color={focused ? Colors.primari300 : color} 
            />
          ),
          tabBarActiveTintColor:Colors.primari300
        }}
      />
      <BtnTap.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name="person" 
              size={24} 
              color={focused ? Colors.primari300 : color} 
            />
          ),
        }}
      />
    </BtnTap.Navigator>
  );
}

function AuthenticationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <AppContent />
    </AuthContextProvider>
  );
}

function AppContent() {
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
