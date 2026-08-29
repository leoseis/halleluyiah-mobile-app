import { useCallback, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function ScheduleScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSchedules = async () => {
    try {
      console.log("SCHEDULE: starting API request");

      setLoading(true);
      setError("");

      const response = await api.get("/schedules/");

      console.log("SCHEDULE API SUCCESS:", response.data);

      setSchedules(response.data);
    } catch (error: any) {
      console.log("SCHEDULE API FAILED");
      console.log("SCHEDULE ERROR MESSAGE:", error.message);
      console.log("SCHEDULE ERROR STATUS:", error.response?.status);
      console.log("SCHEDULE ERROR RESPONSE:", error.response?.data);

      // Clear old data so stale schedules are not displayed
      setSchedules([]);

      if (!error.response) {
        setError(
          "Unable to connect to the server. Please check your connection and try again.",
        );
      } else if (error.response?.status >= 500) {
        setError(
          "The server is currently unable to load the service schedule. Please try again later.",
        );
      } else {
        setError("Unable to load the service schedule. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /*
   * Fetch every time this screen comes into focus.
   *
   * This is important because Expo Router can keep
   * screens mounted when navigating away from them.
   */
  useFocusEffect(
    useCallback(() => {
      fetchSchedules();
    }, []),
  );

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
            color: theme.secondaryText,
            fontSize: 15,
          }}
        >
          Loading schedule...
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
          Unable to Load Schedule
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
          onPress={fetchSchedules}
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

  // NORMAL SCREEN
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
          marginVertical: 20,
        }}
      >
        Weekly Schedule 📅
      </Text>

      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
          flexGrow: schedules.length === 0 ? 1 : undefined,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: theme.card,
              padding: 20,
              borderRadius: 16,
              marginBottom: 15,
              elevation: 3,
              borderWidth: isDark ? 1 : 0,
              borderColor: theme.border,
            }}
          >
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
                marginTop: 8,
                color: theme.secondaryText,
              }}
            >
              📅 {item.day}
            </Text>

            <Text
              style={{
                marginTop: 5,
                color: theme.secondaryText,
              }}
            >
              ⏰ {item.time}
            </Text>

            {item.description && (
              <Text
                style={{
                  marginTop: 10,
                  color: theme.secondaryText,
                  lineHeight: 22,
                }}
              >
                {item.description}
              </Text>
            )}
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
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
              No Service Schedule Available
            </Text>

            <Text
              style={{
                color: theme.secondaryText,
                fontSize: 15,
                textAlign: "center",
                marginTop: 8,
                lineHeight: 22,
              }}
            >
              There are currently no scheduled services to display. Please check
              back later.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
