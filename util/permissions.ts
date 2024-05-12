import { PermissionStatus, useForegroundPermissions } from "expo-location";
import { Alert } from "react-native";

const [locationPermissionInfo, requestPermission] =
useForegroundPermissions();
export async function verifyPermissions() {
if (locationPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
  const permissionResponse = await requestPermission();
  return permissionResponse.granted;
}
if (locationPermissionInfo?.status === PermissionStatus.DENIED) {
  Alert.alert("Permisiuni insuficiente", "Trebuie sa accepti permisiunile");
  return false;
}
return true;
}