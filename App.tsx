import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { AppContent } from "./stack/AppContext";
import { Platform } from 'react-native'
import Geocoder from 'react-native-geocoding';
import schema from "./util/model/schema";
import migrations from "./util/model/migrations";
import { useEffect } from "react";
import { init } from "./util/database";
import { API_KEY } from "./util/constants";


export default function App() {
 
useEffect(()=>{
   init();
},[])

  return (
    <AuthContextProvider>
      <AppContent />
    </AuthContextProvider>
  );
}
