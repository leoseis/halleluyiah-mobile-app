import { useCallback, useMemo, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function ReadingPlanScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [plans, setPlans] = useState<any[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadCompleted = async () => {
    try {
      const stored = await AsyncStorage.getItem("completed_readings");

      if (!stored) {
        setCompleted([]);
        return;
      }

      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        console.log("Invalid completed_readings value:", parsed);

        setCompleted([]);
        return;
      }

      const safeIds = parsed.filter((item) => typeof item === "number");

      setCompleted(safeIds);
    } catch (error) {
      console.log("LOAD COMPLETED ERROR:", error);

      setCompleted([]);
    }
  };

  const fetchPlans = async (isRefreshing = false) => {
    try {
      console.log("READING PLAN: starting API request");

      setError("");

      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await api.get("/reading-plans/", {
        timeout: 5000,
      });

      console.log("READING PLAN SUCCESS:", response.data);

      if (Array.isArray(response.data)) {
        setPlans(response.data);
      } else {
        setPlans([]);
      }
    } catch (error: any) {
      console.log("========== READING PLAN ERROR ==========");
      console.log("MESSAGE:", error?.message);
      console.log("CODE:", error?.code);
      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);
      console.log("========================================");

      setPlans([]);

      if (error?.code === "ECONNABORTED" || error?.code === "ETIMEDOUT") {
        setError("The connection to the server timed out. Please try again.");

        return;
      }

      if (!error?.response) {
        setError(
          "Unable to connect to the server. Please check your connection and try again.",
        );

        return;
      }

      if (error.response.status === 401) {
        setError("Your session has expired. Please sign in again.");

        return;
      }

      if (error.response.status >= 500) {
        setError(
          "The server is currently unable to load the reading plan. Please try again later.",
        );

        return;
      }

      setError("Unable to load the reading plan. Please try again.");
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCompleted();
      fetchPlans();
    }, []),
  );

  const toggleCompleted = async (id: number) => {
    const wasCompleted = completed.includes(id);

    const updated = wasCompleted
      ? completed.filter((item) => item !== id)
      : [...completed, id];

    /*
     * Optimistic UI update.
     */
    setCompleted(updated);

    try {
      await AsyncStorage.setItem("completed_readings", JSON.stringify(updated));
    } catch (error) {
      console.log("SAVE READING PROGRESS ERROR:", error);

      /*
       * Restore previous state if saving fails.
       */
      setCompleted(completed);

      Alert.alert(
        "Unable to Save Progress",
        "Your reading progress could not be saved. Please try again.",
      );
    }
  };

  /*
   * Only count completed IDs that actually
   * exist in the current reading-plan response.
   */
  const validCompletedCount = useMemo(() => {
    const planIds = new Set(plans.map((plan) => plan.id));

    return completed.filter((id) => planIds.has(id)).length;
  }, [plans, completed]);

  const progress =
    plans.length > 0
      ? Math.min(100, Math.round((validCompletedCount / plans.length) * 100))
      : 0;

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
            color: theme.secondaryText,
          }}
        >
          Loading reading plan...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.background,
          paddingHorizontal: 20,
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
          Bible Reading Plan 📖
        </Text>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 80,
          }}
        >
          <Text
            style={{
              fontSize: 44,
              marginBottom: 14,
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
            Unable to Load Reading Plan
          </Text>

          <Text
            style={{
              color: theme.secondaryText,
              textAlign: "center",
              marginTop: 10,
              lineHeight: 21,
              maxWidth: 320,
            }}
          >
            {error}
          </Text>

          <Pressable
            onPress={() => fetchPlans()}
            style={({ pressed }) => ({
              backgroundColor: isDark ? "#2563eb" : "#001f5b",

              paddingHorizontal: 26,
              paddingVertical: 13,
              borderRadius: 12,
              marginTop: 22,
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text
              style={{
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Try Again
            </Text>
          </Pressable>
        </View>
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
          marginVertical: 20,
        }}
      >
        Bible Reading Plan 📖
      </Text>

      {/* PROGRESS CARD */}
      <View
        style={{
          backgroundColor: theme.card,
          padding: 16,
          borderRadius: 16,
          marginBottom: 20,
          elevation: 3,
          borderWidth: isDark ? 1 : 0,
          borderColor: theme.border,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          Progress
        </Text>

        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            color: theme.secondaryText,
          }}
        >
          {progress}% Completed
        </Text>

        <View
          style={{
            height: 12,
            backgroundColor: isDark ? "#334155" : "#e5e7eb",
            borderRadius: 10,
            marginTop: 12,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#28a745",
              borderRadius: 10,
            }}
          />
        </View>
      </View>

      {/* READING PLAN LIST */}
      <FlatList
        data={plans}
        refreshing={refreshing}
        onRefresh={() => fetchPlans(true)}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
          flexGrow: plans.length === 0 ? 1 : 0,
        }}
        renderItem={({ item }) => {
          const isCompleted = completed.includes(item.id);

          return (
            <View
              style={{
                backgroundColor: theme.card,
                borderRadius: 16,
                padding: 18,
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
                📖 {item.scripture}
              </Text>

              <Text
                style={{
                  marginTop: 8,
                  color: theme.secondaryText,
                }}
              >
                📅 {item.reading_date}
              </Text>

              <Pressable
                onPress={() => toggleCompleted(item.id)}
                style={({ pressed }) => ({
                  marginTop: 15,

                  backgroundColor: isCompleted
                    ? pressed
                      ? "#15803d"
                      : "#28a745"
                    : pressed
                      ? isDark
                        ? "#1d4ed8"
                        : "#00327f"
                      : isDark
                        ? "#2563eb"
                        : "#001f5b",

                  padding: 12,
                  borderRadius: 10,
                  alignItems: "center",
                })}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                >
                  {isCompleted ? "✓ Completed" : "Mark as Completed"}
                </Text>
              </Pressable>
            </View>
          );
        }}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 80,
            }}
          >
            <Text
              style={{
                fontSize: 42,
                marginBottom: 12,
              }}
            >
              📖
            </Text>

            <Text
              style={{
                color: theme.text,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              No Reading Plan Available
            </Text>

            <Text
              style={{
                color: theme.secondaryText,
                fontSize: 14,
                textAlign: "center",
                marginTop: 7,
              }}
            >
              There are currently no readings available.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
