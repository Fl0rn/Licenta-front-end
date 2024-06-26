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
  const [rerender, setRerender] = useState(0);
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
    async function fetchRequests() {
      if (!authCtx.userInfo?.id) {
        console.log("User ID is not available.");
        return;
      }
      try {
        console.log("userId", authCtx.userInfo?.id);
        const response = await axios.get(BACKEND_LINK + "/getAllRequest", {
          params: { accountId: authCtx.userInfo?.id },
        });
        console.log("Fetched Requests: ", response.data);
        setRequests(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchRequests();
  }, [rerender, authCtx.userInfo]);

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
    <View style={styles.container}>
      <ProfileHeader showModlalHandler={() => {}} />
      <View style={styles.flatListView}>
        {authCtx.userInfo?.acountType !== 2 && (
          <CustomOutlineBtn
            color={Colors.primari300}
            title={authCtx.userInfo?.acountType === 1? "Esti deja creator" :"Aplica cont creator"}
            onPress={newRequestHandler}
            height={40}
            width={150}
            disabled={authCtx.userInfo?.acountType === 1? true : false}
          />
        )}
        <FlatList
          data={requests}
          renderItem={({ item }) => (
            <RequestItem
              name={item.acountName}
              requestId={item.requestId}
              date={item.date}
              id={item.acountId}
              status={item.status}
              render={setRerender}
            />
          )}
          keyExtractor={(item) => item.acountId}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:Colors.secondary300
  },
  flatListView: {
    marginTop: 60,
    height:300,
  },
});
