import { useCallback, useState } from "react";

import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function UpcomingEventCard() {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const fetchUpcomingEvent = async () => {
    try {
      console.log("UPCOMING EVENT: starting API request");

      setLoading(true);
      setError("");

      const response = await api.get("/events/");

      console.log("UPCOMING EVENT SUCCESS:", response.data);

      if (response.data.length > 0) {
        setEvent(response.data[0]);
      } else {
        setEvent(null);
      }
    } catch (error: any) {
      console.log("UPCOMING EVENT FAILED");
      console.log("ERROR MESSAGE:", error.message);
      console.log("ERROR STATUS:", error.response?.status);
      console.log("ERROR RESPONSE:", error.response?.data);

      setEvent(null);

      if (!error.response) {
        setError(
          "Unable to connect to the server. Please check your connection and try again.",
        );
      } else if (error.response?.status >= 500) {
        setError("The server is currently unable to load upcoming events.");
      } else {
        setError("Unable to load the upcoming event. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /*
   * Refetch whenever Home comes back into focus.
   */
  useFocusEffect(
    useCallback(() => {
      fetchUpcomingEvent();
    }, []),
  );

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: theme.card,
          marginTop: 18,
          borderRadius: 20,
          padding: 24,
          alignItems: "center",
          borderWidth: isDark ? 1 : 0,
          borderColor: theme.border,
        }}
      >
        <ActivityIndicator size="small" color={theme.primary} />

        <Text
          style={{
            marginTop: 10,
            color: theme.secondaryText,
            fontSize: 14,
          }}
        >
          Loading upcoming event...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          backgroundColor: theme.card,
          marginTop: 18,
          borderRadius: 20,
          padding: 20,
          alignItems: "center",
          borderWidth: 1,
          borderColor: theme.border,
          elevation: 2,
        }}
      >
        <Text
          style={{
            fontSize: 34,
            marginBottom: 10,
          }}
        >
          📡
        </Text>

        <Text
          style={{
            fontSize: 17,
            fontWeight: "700",
            color: theme.text,
            textAlign: "center",
          }}
        >
          Unable to Load Upcoming Event
        </Text>

        <Text
          style={{
            marginTop: 8,
            color: theme.secondaryText,
            textAlign: "center",
            lineHeight: 20,
            fontSize: 14,
          }}
        >
          {error}
        </Text>

        <Pressable
          onPress={fetchUpcomingEvent}
          style={({ pressed }) => ({
            backgroundColor: isDark ? "#2563eb" : "#001f5b",
            paddingHorizontal: 22,
            paddingVertical: 11,
            borderRadius: 12,
            marginTop: 16,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text
            style={{
              color: "#ffffff",
              fontWeight: "700",
            }}
          >
            Try Again
          </Text>
        </Pressable>
      </View>
    );
  }

  if (!event) {
    return (
      <View
        style={{
          backgroundColor: theme.card,
          marginTop: 18,
          borderRadius: 20,
          padding: 20,
          alignItems: "center",
          borderWidth: isDark ? 1 : 0,
          borderColor: theme.border,
        }}
      >
        <Ionicons
          name="calendar-outline"
          size={34}
          color={theme.secondaryText}
        />

        <Text
          style={{
            fontSize: 17,
            fontWeight: "700",
            color: theme.text,
            marginTop: 10,
          }}
        >
          No Upcoming Events
        </Text>

        <Text
          style={{
            color: theme.secondaryText,
            marginTop: 6,
            textAlign: "center",
          }}
        >
          There are currently no upcoming church events.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: theme.card,
        marginTop: 18,
        borderRadius: 20,
        padding: 18,
        elevation: 3,
        borderWidth: isDark ? 1 : 0,
        borderColor: theme.border,
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
      {(event.location || event.venue) && (
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
            {event.location || event.venue}
          </Text>
        </View>
      )}

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
          {event.date ||
            (event.event_date
              ? new Date(event.event_date).toLocaleDateString()
              : "Date not available")}
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
