import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/AuthScreen";

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
  AcceptRequestScreen:undefined;
};
export function AuthenticationStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
      </Stack.Navigator>
    );
  }
  