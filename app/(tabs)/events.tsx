import { router } from "expo-router";
import { useEffect, useState } from "react";

import { APP_THEME } from "../../constants/appTheme";
import { useAppTheme } from "../../src/context/ThemeContext";

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
      console.log("EVENTS: starting API request");

      setLoading(true);
      setError("");

      const response = await api.get("/events/");

      console.log("EVENTS API SUCCESS:", response.data);

      setEvents(response.data);
    } catch (error: any) {
      console.log("EVENTS API FAILED");
      console.log("EVENTS ERROR MESSAGE:", error.message);
      console.log("EVENTS ERROR STATUS:", error.response?.status);

      setEvents([]);

      setError(
        "Unable to load events. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // LOADING STATE
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

        <Text
          style={{
            marginTop: 12,
            color: theme.text,
            fontSize: 15,
          }}
        >
          Loading events...
        </Text>
      </View>
    );
  }

  // ERROR STATE
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
            fontSize: 22,
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
            fontSize: 15,
          }}
        >
          {error}
        </Text>

        <Pressable
          onPress={fetchEvents}
          style={({ pressed }) => ({
            backgroundColor: isDark ? "#2563eb" : "#001f5b",
            paddingHorizontal: 30,
            paddingVertical: 14,
            borderRadius: 12,
            marginTop: 24,
            opacity: pressed ? 0.8 : 1,
          })}
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
        contentContainerStyle={{
          flexGrow: events.length === 0 ? 1 : undefined,
          paddingBottom: 30,
        }}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 30,
            }}
          >
            <Text
              style={{
                fontSize: 46,
                marginBottom: 14,
              }}
            >
              📅
            </Text>

            <Text
              style={{
                fontSize: 21,
                fontWeight: "bold",
                color: theme.text,
                textAlign: "center",
              }}
            >
              No Events Available
            </Text>

            <Text
              style={{
                color: theme.secondaryText,
                textAlign: "center",
                marginTop: 8,
                lineHeight: 22,
              }}
            >
              There are currently no events to display. Please check back later.
            </Text>
          </View>
        }
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
            style={({ pressed }) => ({
              backgroundColor: theme.card,
              borderRadius: 18,
              overflow: "hidden",
              marginBottom: 20,
              elevation: 4,
              borderWidth: isDark ? 1 : 0,
              borderColor: theme.border,
              opacity: pressed ? 0.92 : 1,
            })}
          >
            {item.banner ? (
              <Image
                source={{ uri: item.banner }}
                style={{
                  width: "100%",
                  height: 220,
                }}
                resizeMode="cover"
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 220,
                  backgroundColor: isDark ? "#1f2937" : "#e5e7eb",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 42 }}>📅</Text>

                <Text
                  style={{
                    color: theme.secondaryText,
                    marginTop: 8,
                  }}
                >
                  No event image
                </Text>
              </View>
            )}

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
