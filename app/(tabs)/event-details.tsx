import api from "@/src/api/api";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { APP_THEME } from "../../constants/appTheme";
import { useAppTheme } from "../../src/context/ThemeContext";

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
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];
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
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
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
          backgroundColor: theme.background,
        }}
      >
        <Text
          style={{
            color: theme.text,
          }}
        >
          Event not found.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
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
              color: theme.text,
            }}
          >
            {event.title}
          </Text>

          <Text
            style={{
              marginTop: 10,
              color: theme.secondaryText,
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
              color: theme.text,
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
              backgroundColor: isDark ? "#2563eb" : "#001f5b",
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
