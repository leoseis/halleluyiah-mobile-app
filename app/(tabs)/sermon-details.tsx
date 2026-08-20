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

export default function SermonDetails() {
  const { id } = useLocalSearchParams();

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
      console.log(error);
      Alert.alert("Error", "Unable to load sermon.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#001f5b" />
      </View>
    );
  }

  if (!sermon) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Sermon not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      {/* Thumbnail */}
      <Image
        source={{ uri: sermon.thumbnail }}
        style={{
          width: "100%",
          height: 250,
        }}
        resizeMode="cover"
      />

      <View
        style={{
          padding: 20,
        }}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#0d1b4c",
            marginBottom: 12,
          }}
        >
          {sermon.title}
        </Text>

        {/* Pastor */}
        <Text
          style={{
            fontSize: 18,
            color: "#555",
            marginBottom: 8,
          }}
        >
          🎤 {sermon.pastor}
        </Text>

        {/* Scripture */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#2e7d32",
            marginBottom: 20,
          }}
        >
          📖 {sermon.scripture}
        </Text>

        {/* Description */}
        <Text
          style={{
            fontSize: 16,
            lineHeight: 26,
            color: "#444",
            marginBottom: 30,
          }}
        >
          {sermon.description}
        </Text>

        {/* Watch Button */}
        {sermon.youtube_link ? (
          <Pressable
            onPress={() => Linking.openURL(sermon.youtube_link)}
            style={{
              backgroundColor: "#001f5b",
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              ▶ Watch Sermon
            </Text>
          </Pressable>
        ) : null}

        {/* Listen Audio */}
        {sermon.audio_file ? (
          <Pressable
            onPress={() => Linking.openURL(sermon.audio_file)}
            style={{
              backgroundColor: "#2E7D32",
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              🎧 Listen Audio
            </Text>
          </Pressable>
        ) : null}

        {/* PDF Notes */}
        {sermon.pdf_notes ? (
          <Pressable
            onPress={() => Linking.openURL(sermon.pdf_notes)}
            style={{
              backgroundColor: "#8B0000",
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
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
