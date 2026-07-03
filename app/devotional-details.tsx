import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Share,
    Text,
    View,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import api from "../src/api/api";

export default function DevotionalDetailsScreen() {
  const { id } = useLocalSearchParams();

  const [devotional, setDevotional] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevotional();
  }, []);

  const fetchDevotional = async () => {
    try {
      const response = await api.get(`/devotionals/${id}/`);

      setDevotional(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const shareDevotional = async () => {
    if (!devotional) return;

    await Share.share({
      message:
        `${devotional.title}\n\n` +
        `${devotional.scripture}\n\n` +
        `${devotional.content}\n\n` +
        `Prayer:\n${devotional.prayer}`,
    });
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
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!devotional) return null;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 18,
          padding: 22,
          elevation: 4,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#001f5b",
          }}
        >
          {devotional.title}
        </Text>

        <Text
          style={{
            marginTop: 12,
            fontSize: 17,
            fontWeight: "600",
            color: "#555",
          }}
        >
          📖 {devotional.scripture}
        </Text>

        <Text
          style={{
            marginTop: 20,
            fontSize: 17,
            lineHeight: 30,
            color: "#444",
          }}
        >
          {devotional.content}
        </Text>

        <View
          style={{
            marginTop: 30,
            backgroundColor: "#eef5ff",
            padding: 18,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#001f5b",
            }}
          >
            🙏 Prayer
          </Text>

          <Text
            style={{
              marginTop: 12,
              lineHeight: 28,
              color: "#555",
            }}
          >
            {devotional.prayer}
          </Text>
        </View>

        <Pressable
          onPress={shareDevotional}
          style={{
            marginTop: 25,
            backgroundColor: "#001f5b",
            padding: 15,
            borderRadius: 10,
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
            Share Devotional
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
