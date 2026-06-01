import { router } from "expo-router";

import { useEffect, useState } from "react";

import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../src/api/api";

export default function TestimoniesScreen() {
  const [testimonies, setTestimonies] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const fetchTestimonies = async () => {
    try {
      const response = await api.get("/testimonies/");

      setTestimonies(response.data);
    } catch (error) {
      console.log(error);
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
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#0d1b4c",
          marginVertical: 20,
        }}
      >
        Testimonies ✨
      </Text>

      <FlatList
        data={testimonies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/testimony-details",
                params: {
                  testimony: JSON.stringify(item),
                },
              })
            }
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 18,
              marginBottom: 18,
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#001f5b",
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                color: "#777",
                marginTop: 6,
              }}
            >
              By {item.author}
            </Text>

            <Text
              numberOfLines={3}
              style={{
                marginTop: 12,
                color: "#444",
              }}
            >
              {item.content}
            </Text>

            <Text
              style={{
                marginTop: 15,
                color: "#001f5b",
                fontWeight: "bold",
              }}
            >
              Read More →
            </Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
