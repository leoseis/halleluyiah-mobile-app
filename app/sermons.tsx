import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

import { getSermons } from "../src/api/sermons";

export default function SermonsScreen() {
  const [sermons, setSermons] = useState<any[]>([]);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSermons();
  }, []);

  const loadSermons = async () => {
    try {
      const data = await getSermons();
      setSermons(data);
    } catch (err: any) {
      console.log("SERMON ERROR:", err);

      setError(
        err?.response
          ? `Server error: ${err.response.status}`
          : err?.message || "Failed to load sermons",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
        }}
      >
        <Text
          style={{
            color: "red",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          {error}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={sermons}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/sermon-details",
              params: {
                id: item.id,
              },
            })
          }
          style={{
            backgroundColor: "#fff",
            margin: 15,
            borderRadius: 15,
            overflow: "hidden",
            elevation: 3,
          }}
        >
          <Image
            source={{
              uri: item.thumbnail,
            }}
            style={{
              height: 220,
              width: "100%",
            }}
          />

          <View
            style={{
              padding: 18,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#001f5b",
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                marginTop: 8,
                color: "#666",
              }}
            >
              👤 {item.pastor}
            </Text>

            <Text
              style={{
                marginTop: 5,
                color: "#666",
              }}
            >
              📖 {item.scripture}
            </Text>

            <Text
              numberOfLines={3}
              style={{
                marginTop: 10,
                color: "#555",
              }}
            >
              {item.description}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}
