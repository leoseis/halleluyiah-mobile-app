import { router, useLocalSearchParams } from "expo-router";

import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

export default function AnnouncementDetails() {
  const { id, title, body, image } = useLocalSearchParams();

  console.log("Announcement ID:", id);
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState<any[]>([]);

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      const token = await AsyncStorage.getItem("access");

      await axios.post(
        "http://192.168.43.207:8000/api/comments/create/",
        {
          content: comment,
          announcement: Number(id),
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchAnnouncement();
      setComments([
        ...comments,
        {
          author: "You",
          content: comment,
        },
      ]);

      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    try {
      const response = await axios.get(
        `http://192.168.43.207:8000/api/announcements/${id}/`,
      );

      setComments(response.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 100,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Pressable onPress={() => router.back()}>
        <Text
          style={{
            color: "#0d1b4c",
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          ← Back
        </Text>
      </Pressable>

      {image && (
        <Image
          source={{ uri: image as string }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 240,
            borderRadius: 16,
            marginBottom: 20,
          }}
        />
      )}

      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#0d1b4c",
          marginBottom: 10,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color: "#666",
          marginBottom: 20,
        }}
      >
        RCCG HalleluYah Parish
      </Text>

      <Text
        style={{
          fontSize: 16,
          lineHeight: 26,
          color: "#333",
          marginBottom: 30,
        }}
      >
        {body}
      </Text>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: "#0d1b4c",
          marginBottom: 20,
        }}
      >
        Comments
      </Text>

      {comments.map((item: any, index: number) => (
        <View
          key={index}
          style={{
            backgroundColor: "#fff",
            padding: 14,
            borderRadius: 12,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            {item.author}
          </Text>

          <Text>{item.content}</Text>
        </View>
      ))}

      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Write a comment..."
        multiline
        editable={true}
        style={{
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 14,
          padding: 16,
          minHeight: 120,
          textAlignVertical: "top",
          marginTop: 20,
          marginBottom: 20,
          fontSize: 16,
        }}
      />

      <Pressable
        onPress={handleComment}
        style={{
          backgroundColor: "#001f5b",
          paddingVertical: 16,
          borderRadius: 14,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Post Comment
        </Text>
      </Pressable>
    </ScrollView>
  );
}
