import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { dummyComments } from "../../util/constants";
import CommentItem from "./CommentItem";
import { Colors } from "../../util/Colors";
type Comments = {
  authorId: string;
  author: string;
  date: number;
  message: string;
}
type CommentContainerProps = {
  comments: Array<Comments>
  
}
export default function CommentsContainer({comments} :CommentContainerProps) {
  
  return (
    <View style={styles.container} >
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Comentarii</Text>
        <View style={styles.lengthContainer}>
          <Text style={styles.length}>{comments.length}</Text>
        </View>
        
      </View>
      {comments.map((item, index) => (
        <CommentItem
          key={index.toString()}
          author={item.author}
          authorEmail={item.authorId}
          date={item.date}
          message={item.message}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 20,
  },
  lengthContainer: {
    backgroundColor: Colors.primari300,
    padding: 8,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginLeft: 10,
  },
  length: {
    color: "white",
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  
  },
});
