import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import { ActivityIndicator, Pressable, Text, View } from "react-native";

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
        color="#8B5CF6"
      />
    );
  }

  if (!devotional) return null;

  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 22,
        padding: 18,
        marginHorizontal: 20,
        marginTop: 18,
        marginBottom: 4,
        elevation: 4,
      }}
    >
      {/* TOP ROW */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            backgroundColor: "#ede9fe",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Ionicons name="book-outline" size={24} color="#7c3aed" />
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#001f5b",
            }}
          >
            Daily Devotional
          </Text>

          <Text
            style={{
              fontSize: 12,
              color: "#8b5cf6",
              fontWeight: "700",
              marginTop: 2,
            }}
          >
            TODAY'S WORD
          </Text>
        </View>
      </View>

      {/* TITLE */}
      <Text
        style={{
          fontSize: 19,
          fontWeight: "700",
          color: "#111827",
          lineHeight: 26,
        }}
      >
        {devotional.title}
      </Text>

      {/* SCRIPTURE */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Ionicons name="bookmark-outline" size={17} color="#7c3aed" />

        <Text
          style={{
            color: "#6b7280",
            marginLeft: 6,
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          {devotional.scripture}
        </Text>
      </View>

      {/* CONTENT */}
      <Text
        numberOfLines={3}
        style={{
          marginTop: 12,
          lineHeight: 22,
          color: "#64748b",
          fontSize: 14,
        }}
      >
        {devotional.content}
      </Text>

      {/* ACTION */}
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
          marginTop: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f5f3ff",
          paddingVertical: 12,
          paddingHorizontal: 14,
          borderRadius: 14,
        }}
      >
        <Text
          style={{
            color: "#6d28d9",
            fontWeight: "700",
            fontSize: 14,
          }}
        >
          Read Full Devotional
        </Text>

        <Ionicons name="arrow-forward" size={18} color="#6d28d9" />
      </Pressable>
    </View>
  );
}
