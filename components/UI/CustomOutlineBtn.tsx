import { Pressable, StyleSheet, Text, View } from "react-native";
type CustomBtnProps = {
    title:string,
    color:string,
    onPress:()=>void
}
export default function CustomOutlineBtn({title,color,onPress}:CustomBtnProps){
  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => ([
        pressed && styles.pressed,
        { justifyContent: 'center', alignItems: 'center' }
      ])}
    >
      <View style={[styles.container, { backgroundColor: color }]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
    }
    const styles = StyleSheet.create({
      container: {
        height: 40,
        
        marginBottom:15,
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        borderRadius: 7,
        margin:6,
      },
      pressed:{
        opacity:0.7
      },
      text: {
        color: "white",
        fontWeight: "bold",
      },
    });
    