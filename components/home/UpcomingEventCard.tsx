import { useEffect, useState } from "react";

import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { router } from "expo-router";

import api from "../../src/api/api";

export default function UpcomingEventCard() {
  const [event, setEvent] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingEvent();
  }, []);

  const fetchUpcomingEvent = async () => {
    try {
      const response = await api.get("/events/");

      if (response.data.length > 0) {
        setEvent(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <ActivityIndicator
        style={{
          marginVertical: 20,
        }}
      />
    );

  if (!event) return null;

  return (
    <View
      style={{
        backgroundColor: "white",
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 18,
        padding: 20,
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
        📅 Upcoming Event
      </Text>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginTop: 15,
        }}
      >
        {event.title}
      </Text>

      <Text
        style={{
          marginTop: 8,
          color: "#555",
        }}
      >
        📍 {event.location}
      </Text>

      <Text
        style={{
          marginTop: 5,
          color: "#555",
        }}
      >
        📅 {event.date}
      </Text>

      <Pressable
        onPress={() => router.push("/events")}
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
          View Event
        </Text>
      </Pressable>
    </View>
  );
}
