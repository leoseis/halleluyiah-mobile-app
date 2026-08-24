import { useEffect, useState } from "react";
import { APP_THEME } from "../../constants/appTheme";
import { useAppTheme } from "../../src/context/ThemeContext";

import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import api from "../../src/api/api";

export default function UpcomingEventCard() {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

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

  if (loading) {
    return (
      <ActivityIndicator
        style={{
          marginVertical: 20,
        }}
      />
    );
  }

  if (!event) return null;

  return (
    <View
      style={{
        backgroundColor: theme.card,
        marginTop: 18,
        borderRadius: 20,
        padding: 18,
        elevation: 3,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            backgroundColor: isDark ? "#3f2f12" : "#FFF3E6",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Ionicons name="calendar-outline" size={24} color="#F59E0B" />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: isDark ? "#fcd34d" : "#001f5b",
            }}
          >
            Upcoming Event
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: theme.secondaryText,
              marginTop: 2,
            }}
          >
            Don't miss what's happening next
          </Text>
        </View>
      </View>

      {/* EVENT TITLE */}
      <Text
        style={{
          fontSize: 19,
          fontWeight: "700",
          color: theme.text,
          marginBottom: 14,
        }}
      >
        {event.title}
      </Text>

      {/* LOCATION */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Ionicons
          name="location-outline"
          size={19}
          color={theme.secondaryText}
        />

        <Text
          style={{
            marginLeft: 8,
            fontSize: 14,
            color: theme.secondaryText,
            flex: 1,
          }}
        >
          {event.location}
        </Text>
      </View>

      {/* DATE */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons name="time-outline" size={19} color={theme.secondaryText} />

        <Text
          style={{
            marginLeft: 8,
            fontSize: 14,
            color: theme.secondaryText,
          }}
        >
          {event.date}
        </Text>
      </View>

      {/* BUTTON */}
      <Pressable
        onPress={() => router.push("/events")}
        style={({ pressed }) => ({
          backgroundColor: pressed
            ? isDark
              ? "#1d4ed8"
              : "#00327f"
            : isDark
              ? "#2563eb"
              : "#001f5b",

          paddingVertical: 13,
          borderRadius: 14,
          marginTop: 20,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        })}
      >
        <Text
          style={{
            color: "#ffffff",
            fontWeight: "700",
            fontSize: 14,
            marginRight: 6,
          }}
        >
          View Event
        </Text>

        <Ionicons name="arrow-forward-outline" size={18} color="#ffffff" />
      </Pressable>
    </View>
  );
}
