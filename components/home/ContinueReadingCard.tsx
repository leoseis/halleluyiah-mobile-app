import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function ContinueReadingCard() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [progress, setProgress] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalReadings, setTotalReadings] = useState(0);

  const loadProgress = async () => {
    try {
      /*
       * Load the actual reading-plan list
       * and locally completed IDs together.
       */
      const [planResponse, stored] = await Promise.all([
        api.get("/reading-plans/", {
          timeout: 5000,
        }),
        AsyncStorage.getItem("completed_readings"),
      ]);

      const plans = Array.isArray(planResponse.data) ? planResponse.data : [];

      const total = plans.length;

      setTotalReadings(total);

      if (!stored || total === 0) {
        setCompletedCount(0);
        setProgress(0);
        return;
      }

      const completed = JSON.parse(stored);

      if (!Array.isArray(completed)) {
        console.log("Invalid completed_readings data:", completed);

        setCompletedCount(0);
        setProgress(0);

        return;
      }

      /*
       * Only count completed IDs that still exist
       * in the current backend reading plan.
       */
      const planIds = new Set(plans.map((plan: any) => plan.id));

      const validCompleted = completed.filter(
        (id: any) => typeof id === "number" && planIds.has(id),
      );

      const percent = Math.round((validCompleted.length / total) * 100);

      setCompletedCount(validCompleted.length);

      setProgress(Math.min(100, Math.max(0, percent)));
    } catch (error: any) {
      console.log("Continue Reading progress error:", error);

      /*
       * This is only a Home widget.
       * A failure here should never break Home.
       */
      setCompletedCount(0);
      setTotalReadings(0);
      setProgress(0);
    }
  };

  /*
   * Refresh whenever Home regains focus.
   *
   * So:
   * Reading Plan -> mark completed -> Home
   *
   * immediately reflects the new percentage.
   */
  useFocusEffect(
    useCallback(() => {
      loadProgress();
    }, []),
  );

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
        }}
      >
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            backgroundColor: isDark ? "#064e3b" : "#ECFDF5",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Ionicons name="book-outline" size={24} color="#10B981" />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: theme.text,
            }}
          >
            Continue Reading
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: theme.secondaryText,
              marginTop: 2,
            }}
          >
            Your Bible reading progress
          </Text>
        </View>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            color: "#10B981",
          }}
        >
          {progress}%
        </Text>
      </View>

      {/* PROGRESS BAR */}
      <View
        style={{
          height: 10,
          backgroundColor: isDark ? "#334155" : "#E5E7EB",
          borderRadius: 10,
          marginTop: 20,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#10B981",
            borderRadius: 10,
          }}
        />
      </View>

      {/* PROGRESS TEXT */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: theme.secondaryText,
            fontSize: 13,
          }}
        >
          Reading plan
        </Text>

        <Text
          style={{
            color: theme.text,
            fontWeight: "600",
            fontSize: 13,
          }}
        >
          {totalReadings > 0
            ? `${completedCount} of ${totalReadings}`
            : "No readings"}
        </Text>
      </View>

      {/* BUTTON */}
      <Pressable
        onPress={() => router.push("/reading-plan")}
        style={({ pressed }) => ({
          marginTop: 20,

          backgroundColor: pressed
            ? isDark
              ? "#1d4ed8"
              : "#00327f"
            : isDark
              ? "#2563eb"
              : "#001f5b",

          paddingVertical: 13,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
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
          Continue Reading
        </Text>

        <Ionicons name="arrow-forward-outline" size={18} color="#ffffff" />
      </Pressable>
    </View>
  );
}
