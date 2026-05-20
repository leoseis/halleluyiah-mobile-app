import { router, useLocalSearchParams } from "expo-router";

import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

export default function AnnouncementDetails() {
  const { title, body, image } = useLocalSearchParams();
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
          announcement: 19,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

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
    setComments([]);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: 20,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#001f5b",
                fontWeight: "600",
              }}
            >
              ← Back
            </Text>
          </Pressable>

          {image && (
            <Image
              source={{
                uri: image as string,
              }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 240,
                borderRadius: 18,
                marginBottom: 22,
              }}
            />
          )}

          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#0d1b4c",
              marginBottom: 10,
            }}
          >
            {title}
          </Text>

          <Text
            style={{
              color: "#777",
              marginBottom: 20,
              fontSize: 14,
            }}
          >
            RCCG HalleluYah Parish
          </Text>

          <Text
            style={{
              fontSize: 17,
              lineHeight: 30,
              color: "#444",
            }}
          >
            {body}

            <View
              style={{
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginBottom: 20,
                  color: "#0d1b4c",
                }}
              >
                Comments
              </Text>

              {comments.map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "white",
                    padding: 16,
                    borderRadius: 14,
                    marginBottom: 14,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginBottom: 6,
                      color: "#0d1b4c",
                    }}
                  >
                    {item.author}
                  </Text>

                  <Text
                    style={{
                      color: "#444",
                      lineHeight: 22,
                    }}
                  >
                    {item.content}
                  </Text>
                </View>
              ))}

              <TextInput
                placeholder="Write a comment..."
                value={comment}
                onChangeText={setComment}
                multiline
                style={{
                  backgroundColor: "white",
                  borderRadius: 14,
                  padding: 16,
                  minHeight: 100,
                  textAlignVertical: "top",
                  marginTop: 10,
                }}
              />

              <Pressable
                onPress={handleComment}
                style={{
                  backgroundColor: "#001f5b",
                  paddingVertical: 14,
                  borderRadius: 14,
                  marginTop: 16,
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
            </View>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
