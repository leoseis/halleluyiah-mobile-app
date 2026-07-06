import api from "@/src/api/api";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/events/${id}/`);
      setEvent(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to load event.");
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

  if (!event) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Event not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {event.banner ? (
          <Image
            source={{ uri: event.banner }}
            style={{
              width: "100%",
              height: 260,
            }}
            resizeMode="cover"
          />
        ) : null}

        <View
          style={{
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#0d1b4c",
            }}
          >
            {event.title}
          </Text>

          <Text
            style={{
              marginTop: 10,
              color: "#666",
              fontSize: 16,
            }}
          >
            📅 {new Date(event.event_date).toLocaleDateString()}
          </Text>

          {event.event_time ? (
            <Text
              style={{
                marginTop: 8,
                color: "#666",
                fontSize: 16,
              }}
            >
              🕒 {event.event_time}
            </Text>
          ) : null}

          <Text
            style={{
              marginTop: 8,
              color: "#666",
              fontSize: 16,
            }}
          >
            📍 {event.venue}
          </Text>

          <Text
            style={{
              marginTop: 20,
              lineHeight: 24,
              color: "#333",
              fontSize: 16,
            }}
          >
            {event.description}
          </Text>

          <Pressable
            onPress={() =>
              router.push({
                pathname: "/event-register",
                params: {
                  eventId: event.id.toString(),
                  title: event.title,
                },
              })
            }
            style={{
              backgroundColor: "#001f5b",
              padding: 16,
              borderRadius: 12,
              marginTop: 30,
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
              Register For Event
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
