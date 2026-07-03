import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import api from "../../src/api/api";

export default function DailyDevotionalCard() {
  const [devotional, setDevotional] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevotional();
  }, []);

  const fetchDevotional = async () => {
    try {
      const response = await api.get("/devotionals/");

      if (response.data.length > 0) {
        setDevotional(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        style={{
          marginVertical: 20,
        }}
      />
    );
  }

  if (!devotional) return null;

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 18,
        padding: 18,
        marginBottom: 18,
        elevation: 3,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#001f5b",
        }}
      >
        📖 Daily Devotional
      </Text>

      <Text
        style={{
          marginTop: 10,
          fontWeight: "700",
          fontSize: 17,
        }}
      >
        {devotional.title}
      </Text>

      <Text
        style={{
          color: "#777",
          marginTop: 6,
        }}
      >
        {devotional.scripture}
      </Text>

      <Text
        numberOfLines={3}
        style={{
          marginTop: 10,
          lineHeight: 22,
          color: "#555",
        }}
      >
        {devotional.content}
      </Text>

      <Pressable
        onPress={() =>
          router.push({
            pathname: "/devotional-details",
            params: {
              id: devotional.id.toString(),
            },
          })
        }
        style={{
          marginTop: 18,
          backgroundColor: "#001f5b",
          padding: 12,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Read Full Devotional
        </Text>
      </Pressable>
    </View>
  );
}