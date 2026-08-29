import { router } from "expo-router";
import { useEffect, useState } from "react";

import { APP_THEME } from "../../constants/appTheme";
import { useAppTheme } from "../../src/context/ThemeContext";

import {
  FlatList,
  Image,
  Pressable,
  Text,
  View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../src/api/api";

export default function EventsScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/events/");

      setEvents(response.data);
    } catch (error) {
      console.log("EVENTS ERROR:", error);

      setError(
        "Unable to load events. Please check your internet connection and try again.",
      );
    } finally {
      setLoading(false);
    }
    if (error) {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: theme.background,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              fontSize: 48,
              marginBottom: 16,
            }}
          >
            📡
          </Text>

          <Text
            style={{
              fontSize: 21,
              fontWeight: "bold",
              color: theme.text,
              textAlign: "center",
            }}
          >
            Unable to Load Events
          </Text>

          <Text
            style={{
              color: theme.secondaryText,
              textAlign: "center",
              marginTop: 10,
              lineHeight: 22,
            }}
          >
            Please check your internet connection and try again.
          </Text>

          <Pressable
            onPress={fetchEvents}
            style={{
              backgroundColor: isDark ? "#2563eb" : "#001f5b",
              paddingHorizontal: 30,
              paddingVertical: 14,
              borderRadius: 12,
              marginTop: 24,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Try Again
            </Text>
          </Pressable>
        </SafeAreaView>
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: theme.text,
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
              backgroundColor: theme.card,
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
                  color: theme.text,
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  color: theme.secondaryText,
                  marginTop: 8,
                }}
              >
                📅 {item.event_date}
              </Text>

              <Text
                style={{
                  color: theme.secondaryText,
                  marginTop: 4,
                }}
              >
                📍 {item.venue}
              </Text>

              <View
                style={{
                  backgroundColor: isDark ? "#2563eb" : "#001f5b",
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
