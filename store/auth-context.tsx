import { ReactNode, createContext, useEffect, useState } from "react";
import { UserFormState } from "../screens/AuthScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  userInfo: UserModel | null;
  isAuthenticated: boolean;
  authenticate: (userInfo: UserModel) => void;
  logout: () => void;
};
export type UserModel ={
  id:string,
  nume: string;
  email: string;
  cnp: string;
  oras: string;
  parola: string;
 
}
export const AuthContext = createContext<AuthContextType>({
  userInfo: null,
  isAuthenticated: false,
  authenticate: (userInfo: UserModel) => {},
  logout: () => {},
});

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<UserModel | null>(null);

  

  function authenticate(userInfo: UserModel) {
    setAuth(userInfo);
    const userInfoJson = JSON.stringify(userInfo);
    AsyncStorage.setItem("info", userInfoJson);
  }

  function logout() {
    setAuth(null);
  }

  const values: AuthContextType = {
    userInfo: auth,
    isAuthenticated: !!auth,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
