import { router } from "expo-router";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../src/api/api";

export default function EventsScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events/");
      setEvents(response.data);
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
        <Text style={{ marginTop: 10 }}>Loading events...</Text>
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
      <Text>hello just added u do same lets grow</Text>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#0d1b4c",
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        Events 🎟️
      </Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/event-details",
                params: {
                  id: item.id,
                },
              })
            }
            style={{
              backgroundColor: "white",
              borderRadius: 18,
              overflow: "hidden",
              marginBottom: 20,
              elevation: 4,
            }}
          >
            <Image
              source={{ uri: item.banner }}
              style={{
                width: "100%",
                height: 220,
              }}
              resizeMode="cover"
            />

            <View style={{ padding: 16 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#0d1b4c",
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  color: "#666",
                  marginTop: 8,
                }}
              >
                📅 {item.event_date}
              </Text>

              <Text
                style={{
                  color: "#666",
                  marginTop: 4,
                }}
              >
                📍 {item.venue}
              </Text>

              <View
                style={{
                  backgroundColor: "#001f5b",
                  padding: 12,
                  borderRadius: 12,
                  marginTop: 16,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  View Event
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
