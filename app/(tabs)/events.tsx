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
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={{
            marginTop: 10,
            color: theme.text,
          }}
        >
          Loading events...
        </Text>
      </View>
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
                  color: "#666",
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
