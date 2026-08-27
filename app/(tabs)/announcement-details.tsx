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

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function AnnouncementDetails() {
  const { id, title, body, image } = useLocalSearchParams();

  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [announcement, setAnnouncement] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetchAnnouncement();
    }
  }, [id]);

  const fetchAnnouncement = async () => {
    try {
      const response = await api.get(`/announcements/${id}/`);

      setAnnouncement(response.data);
      setComments(response.data.comments || []);
    } catch (error) {
      console.log("Announcement details error:", error);
    }
  };

  const handleComment = async () => {
    if (!comment.trim() || posting) return;

    try {
      setPosting(true);

      const token = await AsyncStorage.getItem("access");

      await api.post(
        "/comments/create/",
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

      setComment("");

      await fetchAnnouncement();
    } catch (error) {
      console.log("Comment error:", error);
    } finally {
      setPosting(false);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 100,
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* BACK */}
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => ({
          alignSelf: "flex-start",
          opacity: pressed ? 0.6 : 1,
        })}
      >
        <Text
          style={{
            color: isDark ? "#60a5fa" : "#0d1b4c",
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          ← Back
        </Text>
      </Pressable>

      {/* IMAGE */}
      {(announcement?.image || image) && (
        <Image
          source={{
            uri: (announcement?.image || image) as string,
          }}
          resizeMode="contain"
          style={{
            width: "100%",
            height: 260,
            borderRadius: 16,
            marginBottom: 20,
            backgroundColor: theme.card,
          }}
        />
      )}

      {/* TITLE */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: theme.text,
          marginBottom: 10,
        }}
      >
        {announcement?.title || title}
      </Text>

      {/* CHURCH NAME */}
      <Text
        style={{
          color: theme.secondaryText,
          marginBottom: 20,
        }}
      >
        RCCG HalleluYah Parish
      </Text>

      {/* BODY */}
      <Text
        style={{
          fontSize: 16,
          lineHeight: 26,
          color: theme.text,
          marginBottom: 30,
        }}
      >
        {announcement?.content || announcement?.body || body}
      </Text>

      {/* COMMENTS TITLE */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: theme.text,
          marginBottom: 20,
        }}
      >
        Comments
      </Text>

      {/* COMMENTS */}
      {comments.length > 0 ? (
        comments.map((item: any, index: number) => (
          <View
            key={item.id ?? index}
            style={{
              backgroundColor: theme.card,
              padding: 14,
              borderRadius: 12,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                marginBottom: 5,
                color: theme.text,
              }}
            >
              {item.author}
            </Text>

            <Text
              style={{
                color: theme.secondaryText,
                lineHeight: 21,
              }}
            >
              {item.content}
            </Text>
          </View>
        ))
      ) : (
        <Text
          style={{
            color: theme.secondaryText,
            marginBottom: 15,
          }}
        >
          No comments yet. Be the first to comment.
        </Text>
      )}

      {/* COMMENT INPUT */}
      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Write a comment..."
        placeholderTextColor={theme.mutedText}
        multiline
        editable={!posting}
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 14,
          padding: 16,
          minHeight: 120,
          textAlignVertical: "top",
          marginTop: 20,
          marginBottom: 20,
          fontSize: 16,
        }}
      />

      {/* POST BUTTON */}
      <Pressable
        onPress={handleComment}
        disabled={posting || !comment.trim()}
        style={({ pressed }) => ({
          backgroundColor:
            posting || !comment.trim()
              ? theme.mutedText
              : pressed
                ? isDark
                  ? "#1d4ed8"
                  : "#00327f"
                : isDark
                  ? "#2563eb"
                  : "#001f5b",

          paddingVertical: 16,
          borderRadius: 14,
          alignItems: "center",
          opacity: posting || !comment.trim() ? 0.7 : 1,
        })}
      >
        <Text
          style={{
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {posting ? "Posting..." : "Post Comment"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
