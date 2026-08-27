import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function ReadingPlanScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    fetchPlans();
    loadCompleted();
  }, []);

  const loadCompleted = async () => {
    try {
      const stored = await AsyncStorage.getItem("completed_readings");

      if (stored) {
        setCompleted(JSON.parse(stored));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCompleted = async (id: number) => {
    let updated;

    if (completed.includes(id)) {
      updated = completed.filter((item) => item !== id);
    } else {
      updated = [...completed, id];
    }

    setCompleted(updated);

    await AsyncStorage.setItem("completed_readings", JSON.stringify(updated));
  };

  const fetchPlans = async () => {
    try {
      const response = await api.get("/reading-plans/");

      setPlans(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const progress =
    plans.length > 0 ? Math.round((completed.length / plans.length) * 100) : 0;

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
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
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
              alignItems: "center",
              paddingVertical: 50,
            }}
          >
            <Text
              style={{
                color: theme.secondaryText,
                fontSize: 15,
              }}
            >
              No reading plan available.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
