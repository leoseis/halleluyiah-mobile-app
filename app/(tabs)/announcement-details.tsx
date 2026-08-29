import { router, useLocalSearchParams } from "expo-router";

import {
  ActivityIndicator,
  Alert,
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchAnnouncement();
    }
  }, [id]);

  const fetchAnnouncement = async () => {
    try {
      console.log("ANNOUNCEMENT DETAILS: starting API request");

      setLoading(true);
      setError("");

      const response = await api.get(`/announcements/${id}/`);

      console.log("ANNOUNCEMENT DETAILS SUCCESS:", response.data);

      setAnnouncement(response.data);
      setComments(response.data.comments || []);
    } catch (error: any) {
      console.log("ANNOUNCEMENT DETAILS FAILED");
      console.log("ERROR MESSAGE:", error.message);
      console.log("ERROR STATUS:", error.response?.status);
      console.log("ERROR RESPONSE:", error.response?.data);

      setAnnouncement(null);
      setComments([]);

      if (!error.response) {
        setError(
          "Unable to connect to the server. Please check your connection and try again.",
        );
      } else if (error.response?.status === 404) {
        setError("This announcement could not be found.");
      } else if (error.response?.status >= 500) {
        setError(
          "The server is currently unable to load this announcement. Please try again later.",
        );
      } else {
        setError("Unable to load this announcement. Please try again.");
      }
    } finally {
      setLoading(false);
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
          content: comment.trim(),
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

      Alert.alert("Success", "Your comment has been posted.");
    } catch (error: any) {
      console.log("COMMENT POST FAILED");
      console.log("COMMENT ERROR MESSAGE:", error.message);
      console.log("COMMENT ERROR STATUS:", error.response?.status);

      if (!error.response) {
        Alert.alert(
          "Connection Error",
          "Unable to connect to the server. Please check your connection and try again.",
        );
      } else if (error.response?.status === 400) {
        Alert.alert(
          "Comment Failed",
          "Your comment could not be submitted. Please check it and try again.",
        );
      } else if (error.response?.status === 401) {
        Alert.alert(
          "Session Expired",
          "Please log in again before posting a comment.",
        );
      } else if (error.response?.status === 403) {
        Alert.alert(
          "Permission Denied",
          "You do not have permission to post this comment.",
        );
      } else if (error.response?.status >= 500) {
        Alert.alert(
          "Server Error",
          "The server could not process your comment. Please try again later.",
        );
      } else {
        Alert.alert(
          "Comment Failed",
          "Unable to post your comment. Please try again.",
        );
      }
    } finally {
      setPosting(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={{
            color: theme.secondaryText,
            marginTop: 12,
            fontSize: 15,
          }}
        >
          Loading announcement...
        </Text>
      </View>
    );
  }

  // ERROR
  if (error) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            fontSize: 48,
            marginBottom: 16,
          }}
        >
          📡
        </Text>

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: theme.text,
            textAlign: "center",
          }}
        >
          Unable to Load Announcement
        </Text>

        <Text
          style={{
            color: theme.secondaryText,
            textAlign: "center",
            marginTop: 10,
            lineHeight: 22,
          }}
        >
          {error}
        </Text>

        <Pressable
          onPress={fetchAnnouncement}
          style={({ pressed }) => ({
            backgroundColor: isDark ? "#2563eb" : "#001f5b",
            paddingHorizontal: 30,
            paddingVertical: 14,
            borderRadius: 12,
            marginTop: 24,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text
            style={{
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Try Again
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => ({
            marginTop: 18,
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Text
            style={{
              color: isDark ? "#60a5fa" : "#001f5b",
              fontWeight: "700",
            }}
          >
            ← Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

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
      {announcement?.image && (
        <Image
          source={{
            uri: announcement.image,
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
