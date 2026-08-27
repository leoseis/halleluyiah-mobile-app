import api from "@/src/api/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { APP_THEME } from "../../constants/appTheme";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function SermonDetails() {
  const { id } = useLocalSearchParams();

  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [sermon, setSermon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchSermon();
    }
  }, [id]);

  const fetchSermon = async () => {
    try {
      const response = await api.get(`/sermons/${id}/`);

      setSermon(response.data);
    } catch (error) {
      console.log("Sermon details error:", error);

      Alert.alert("Error", "Unable to load sermon.");
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={{
            marginTop: 10,
            color: theme.secondaryText,
          }}
        >
          Loading sermon...
        </Text>
      </View>
    );
  }

  // NOT FOUND
  if (!sermon) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: theme.background,
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          Sermon not found.
        </Text>

        <Text
          style={{
            color: theme.secondaryText,
            marginTop: 8,
            textAlign: "center",
          }}
        >
          This sermon may no longer be available.
        </Text>
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
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* THUMBNAIL */}
      {sermon.thumbnail ? (
        <Image
          source={{
            uri: sermon.thumbnail,
          }}
          style={{
            width: "100%",
            height: 250,
            backgroundColor: theme.border,
          }}
          resizeMode="cover"
        />
      ) : null}

      <View
        style={{
          padding: 20,
        }}
      >
        {/* TITLE */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: theme.text,
            marginBottom: 12,
          }}
        >
          {sermon.title}
        </Text>

        {/* PASTOR */}
        <Text
          style={{
            fontSize: 18,
            color: theme.secondaryText,
            marginBottom: 8,
          }}
        >
          🎤 {sermon.pastor}
        </Text>

        {/* SCRIPTURE */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: isDark ? "#86efac" : "#2e7d32",
            marginBottom: 20,
          }}
        >
          📖 {sermon.scripture}
        </Text>

        {/* DESCRIPTION */}
        <Text
          style={{
            fontSize: 16,
            lineHeight: 26,
            color: theme.text,
            marginBottom: 30,
          }}
        >
          {sermon.description}
        </Text>

        {/* WATCH SERMON */}
        {sermon.youtube_link ? (
          <Pressable
            onPress={() => Linking.openURL(sermon.youtube_link)}
            style={({ pressed }) => ({
              backgroundColor: pressed
                ? isDark
                  ? "#1d4ed8"
                  : "#00327f"
                : isDark
                  ? "#2563eb"
                  : "#001f5b",

              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
              marginBottom: 15,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              ▶ Watch Sermon
            </Text>
          </Pressable>
        ) : null}

        {/* LISTEN AUDIO */}
        {sermon.audio_file ? (
          <Pressable
            onPress={() => Linking.openURL(sermon.audio_file)}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#166534" : "#2E7D32",

              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
              marginBottom: 15,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              🎧 Listen Audio
            </Text>
          </Pressable>
        ) : null}

        {/* PDF NOTES */}
        {sermon.pdf_notes ? (
          <Pressable
            onPress={() => Linking.openURL(sermon.pdf_notes)}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#7f1d1d" : "#8B0000",

              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              📄 Download PDF Notes
            </Text>
          </Pressable>
        ) : null}
      </View>
    </ScrollView>
  );
}
