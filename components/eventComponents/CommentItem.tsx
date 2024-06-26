import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { BACKEND_LINK } from "../../util/constants";
import timestampToDate from "../../util/methods";
import { Colors } from "../../util/Colors";

type CommentsProps = {
  authorEmail: string;
  author: string;
  date: number;
  message: string;
};

export default function CommentItem({
  authorEmail,
  author,
  date,
  message,
}: CommentsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: `${BACKEND_LINK}/profileImages/${authorEmail}.jpg` }}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.dateTitleContainer}>
          <Text style={styles.numeAutor}>{author}</Text>
          <Text style={styles.date}>{timestampToDate(date)}</Text>
        </View>
        <Text style={styles.mesaj}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: Colors.secondary500,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    height: 50,
    width: 50,
    marginRight: 15,
    marginLeft: 5,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 25,
  },
  contentContainer: {
    flex: 1,
  },
  dateTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
  date:{
    marginRight:40
  },
  numeAutor: {
    fontWeight: "bold",
    fontSize: 20,
    color: Colors.gray500,
  },
  mesaj: {
    color: "white",
  },
});