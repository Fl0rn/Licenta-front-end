import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { Text } from "react-native";
import UserCreatorPage from "../components/reclamatiiComponents/UserCreatorPage";
import TownHallPage from "../components/reclamatiiComponents/TownHallPage";

export default function ReclamatiiScreen() {
  const authCtx = useContext(AuthContext);
  return authCtx.userInfo?.acountType == 2 ? (
   <TownHallPage />
  ) : (
    <UserCreatorPage />
  );
}
