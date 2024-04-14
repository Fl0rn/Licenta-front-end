import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconBtnProps = {
    iconName: any, 
    size: number,
    color: string,
    onPress: () => void,
}

export default function IconBtn({ iconName, size, color, onPress }: IconBtnProps) {
    return (
        <Pressable onPress={onPress} style={({pressed})=>pressed && styles.pressed}>
            <Ionicons name={iconName} size={size} color={color} />
        </Pressable>
    );
}
const styles = StyleSheet.create({
    pressed:{
        opacity:0.7
    }
})