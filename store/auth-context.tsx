import { ReactNode, createContext, useEffect, useState } from "react";
import { UserFormState } from "../screens/AuthScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  userInfo: UserFormState | null;
  isAuthenticated: boolean;
  authenticate: (userInfo: UserFormState) => void;
  logout: () => void;
};
type UserModel ={
  nume: string;
  email: string;
  cnp: string;
  oras: string;
  parola: string;
  hasProfilePicture: string;
}
export const AuthContext = createContext<AuthContextType>({
  userInfo: null,
  isAuthenticated: false,
  authenticate: (userInfo: UserFormState) => {},
  logout: () => {},
});

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<UserFormState | null>(null);

  

  function authenticate(userInfo: UserFormState) {
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
