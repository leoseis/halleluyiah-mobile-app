import { useEffect, useState } from "react";

import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";

import * as Linking from "expo-linking";

import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../src/api/api";

export default function LivestreamScreen() {
  const [streams, setStreams] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    try {
      const response = await api.get("/livestreams/");

      setStreams(response.data);
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

        <Text
          style={{
            marginTop: 10,
          }}
        >
          Loading Livestreams...
        </Text>
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
          color: "#001f5b",
          marginVertical: 20,
        }}
      >
        Livestream 🔴
      </Text>

      <FlatList
        data={streams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 18,
              padding: 20,
              marginBottom: 20,
              elevation: 4,
            }}
          >
            {item.is_live && (
              <Text
                style={{
                  color: "red",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                🔴 LIVE NOW
              </Text>
            )}

            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#001f5b",
              }}
            >
              {item.title}
            </Text>

            <Pressable
              onPress={() => Linking.openURL(item.youtube_url)}
              style={{
                backgroundColor: "#001f5b",
                padding: 14,
                borderRadius: 12,
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Watch Live
              </Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
