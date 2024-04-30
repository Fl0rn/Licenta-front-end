import { ScrollView, Text, View } from "react-native";

export default function ReclamatiiScreen(){
    return (
        <View style={{flex:1, backgroundColor:'black'}}>
            <View style={{flex:2, backgroundColor:'blue'}}></View>
            <View style={{flex:1, backgroundColor:'green'}}></View>
            <View style={{flex:6, backgroundColor:'pink'}}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={{flexGrow: 1, backgroundColor:'yellow'}}></View>
                    <View style={{flexGrow: 1, backgroundColor:'orange'}}></View>
                    <View style={{flexGrow: 1, backgroundColor:'red'}}></View>
                    <View style={{flexGrow: 12, backgroundColor:'purple'}}></View>
                </ScrollView>
            </View>
        </View>
    );
}
