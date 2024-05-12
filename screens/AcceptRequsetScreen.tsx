import { FlatList, StyleSheet, View } from "react-native";
import ProfileHeader from "../components/profileComponents/ProfileHeader";
import { BACKEND_LINK, REQUESTS } from "../util/constants";
import RequestItem from "../components/profileComponents/requestComponents/RequestItem";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../store/auth-context";
import CustomOutlineBtn from "../components/UI/CustomOutlineBtn";
import { Colors } from "../util/Colors";
type RequestModel = {
  acountName: string;
  acountId: string;
  city: string;
};
export default function AcceptRequestScreen() {
  const [requests, setRequests] = useState([
    {
      acountId: "",
      acountName: "",
      city: "",
      date: 0,
      requestId: "",
      status: "",
    },
  ]);

  const authCtx = useContext(AuthContext);
  useEffect(() => {
    try {
      async function fetchRequests() {
        const response = await axios.get(BACKEND_LINK + "/getAllRequest", {
          params: { accountId: authCtx.userInfo?.id },
        });
        setRequests(response.data);
      }
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  }, []);
  async function newRequestHandler() {
    const data = {
      acountId: authCtx.userInfo?.id,
      acountName: authCtx.userInfo?.nume,
      city: authCtx.userInfo?.oras,
    };
    try {
      const response = await axios.post(BACKEND_LINK + "/addNewRequest", data);
      console.log("Request successfully added.", response.data);
      setRequests((prevState) => [...prevState, response.data]);
    } catch (error) {
      console.error("Error adding request:", error);
    }
  }
  return (
    <View>
      <ProfileHeader showModlalHandler={() => {}} />
      <View style={styles.flatListView}>
        <CustomOutlineBtn
          color={Colors.primari300}
          title="Aplica cont creator"
          onPress={newRequestHandler}
        />
        <FlatList
          data={requests}
          renderItem={({ item }) => (
            <RequestItem
              name={item.acountName}
              date={item.date}
              id={item.acountId}
              status={item.status}
            />
          )}
          keyExtractor={(item) => item.acountId} 
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  flatListView: {
    marginTop: 60,
  },
});
