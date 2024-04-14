import { Pressable } from "react-native";
import {Ionicons} from "@expo/vector-icons";
export default function LogoutBtn({onPress}:{onPress:()=>void}){
    return <Pressable onPress={onPress}>
        <Ionicons name="log-out" size={24} color={"black"}/>
    </Pressable>
}