import { useEffect, useState } from "react";

import {
    ActivityIndicator,
    FlatList,
    Text,
    View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../src/api/api";

export default function DevotionalScreen() {
  const [devotionals, setDevotionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevotionals();
  }, []);

  const fetchDevotionals = async () => {
    try {
      const response = await api.get("/devotionals/");

      setDevotionals(response.data);
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
        Daily Devotional 📖
      </Text>

      <FlatList
        data={devotionals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 16,
              marginBottom: 20,
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
              {item.title}
            </Text>

            <Text
              style={{
                marginTop: 8,
                fontStyle: "italic",
                color: "#666",
              }}
            >
              {item.bible_verse}
            </Text>

            <Text
              numberOfLines={4}
              style={{
                marginTop: 15,
                color: "#444",
              }}
            >
              {item.message}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
