import { Image, StyleSheet, Text, View } from "react-native";
import { BACKEND_LINK, getStatusColor } from "../../../util/constants";
import RequestBtn from "./RequestBtn";
import timestampToDate from "../../../util/methods";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../store/auth-context";
type RequestItemProps = {
  name: string;
  id: string;
  date: number;
  status: string;
  requestId:string
  render: (value: (prevState: number) => number) => void;
};
export default function RequestItem({
  name,
  id,
  date,
  status,
  requestId,
  render,
}: RequestItemProps) {
  const authCtx = useContext(AuthContext);
  async function handleRequest(url: string) {
    try {
      const response = await axios.post(BACKEND_LINK + url, {
        townHallAccountId: authCtx.userInfo?.id,
        requestId: requestId,
      });
      console.log("Response:", response.data);
      render((prevState) => prevState + 1);
    } catch (error) {
      console.error("Error handling request:", error);
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: `${BACKEND_LINK}/profileImages/${id}.jpg`,
            }}
            style={styles.image}
          />
        </View>
        <View>
          <Text>{timestampToDate(date)}</Text>
          <Text>{name}</Text>
        </View>
      </View>
      {authCtx.userInfo?.acountType === 2 ? (
        <View style={styles.btnView}>
          <RequestBtn title="Accept" handleRequest={handleRequest} />
          <View style={{ marginVertical: 3 }} />
          <RequestBtn title="Reject" handleRequest={handleRequest} />
        </View>
      ) : (
        <Text style={{ color: getStatusColor(status), fontWeight: "bold" }}>
          {status}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    width: 320,
    backgroundColor: "white",
    height: 80,
    borderRadius: 10,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    height: 50,
    width: 50,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 25,
  },
  btnView: {
    flexDirection: "column",
    alignItems: "center",
  },
});
