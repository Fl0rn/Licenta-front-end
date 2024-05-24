import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EvemtsSreen from "../screens/EventScreen";
import {Ionicons} from '@expo/vector-icons'
import { Colors } from "../util/Colors";
import ReclamatiiScreen from "../screens/ReclamatiiScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
export type RootBtnTaps ={
    EventScreen:undefined,
    ReclamatiiScreen:undefined,
    ProfileScreen:undefined
  }
const BtnTap = createBottomTabNavigator<RootBtnTaps>();
export default function BtnTaps() {
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