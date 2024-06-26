import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EvemtsSreen from "../screens/EventScreen";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../util/Colors";
import ReclamatiiScreen from "../screens/ReclamatiiScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import BtnTapsIcon from "../components/UI/BtnTapsIcon";
export type RootBtnTaps = {
  EventScreen: undefined;
  ReclamatiiScreen: undefined;
  ProfileScreen: undefined;
};
const BtnTap = createBottomTabNavigator<RootBtnTaps>();
export default function BtnTaps() {
  const [pressedBtn, setPressedBtn] = useState({ events: false });
  const authCtx = useContext(AuthContext);
  function handlerLogout() {
    authCtx.logout();
  }
  return (
    <BtnTap.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      
      }}
    >
      <BtnTap.Screen
        name="EventScreen"
        component={EvemtsSreen}
        options={{
          tabBarStyle:{backgroundColor:Colors.secondary400,
            borderTopColor:Colors.secondary300,
            paddingTop:20
           },
          tabBarIcon: ({ focused, color }) => (
            focused ?  (
              <BtnTapsIcon
                iconName="calendar" 
               text="Event"
                color={color}
              />
            ):(
              <Ionicons
                name="calendar-outline"
                size={24}
                color={Colors.primari300}
              />
            ) 
          ),
          tabBarActiveTintColor: Colors.primari300,
        }}
      />
      <BtnTap.Screen
        name="ReclamatiiScreen"
        component={ReclamatiiScreen}
        options={{
          
          tabBarStyle: { position: 'absolute',paddingTop:20 },
          tabBarBackground: () => (
            <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
          ),
          tabBarIcon: ({ focused, color }) => (
            focused ?  (
              <BtnTapsIcon
                iconName="map" 
               text="Plangeri"
                color={color}
              />
            ):(
              <Ionicons
                name="map-outline"
                size={24}
                color={Colors.primari300}
              />
            ) 
          ),
          tabBarActiveTintColor: Colors.primari300,
        }}
      />
      <BtnTap.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
           tabBarStyle:{backgroundColor:Colors.secondary400,
        borderTopColor:Colors.secondary300,
        paddingTop:20
       },
          tabBarIcon: ({ focused, color }) => (
            focused ?  (
              <BtnTapsIcon
                iconName="person" 
               text="Profil"
                color={color}
              />
            ):(
              <Ionicons
                name="person-outline"
                size={24}
                color={Colors.primari300}
              />
            ) 
          ),
          tabBarActiveTintColor: Colors.primari300,

        }}
      />
    </BtnTap.Navigator>
  );
}
