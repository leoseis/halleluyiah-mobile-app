import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { APP_THEME } from "../../constants/appTheme";
import { useAppTheme } from "../../src/context/ThemeContext";

import { ActivityIndicator, Pressable, Text, View } from "react-native";

import api from "../../src/api/api";

export default function DailyDevotionalCard() {
  const [devotional, setDevotional] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const fetchDevotional = async () => {
    try {
      console.log("DAILY DEVOTIONAL: starting API request");

      setLoading(true);
      setError("");

      const response = await api.get("/devotionals/");

      console.log("DAILY DEVOTIONAL SUCCESS:", response.data);

      if (response.data.length > 0) {
        setDevotional(response.data[0]);
      } else {
        setDevotional(null);
      }
    } catch (error: any) {
      console.log("DAILY DEVOTIONAL FAILED");
      console.log("ERROR MESSAGE:", error.message);
      console.log("ERROR STATUS:", error.response?.status);
      console.log("ERROR RESPONSE:", error.response?.data);

      setDevotional(null);

      if (!error.response) {
        setError(
          "Unable to connect to the server. Please check your connection and try again.",
        );
      } else if (error.response?.status >= 500) {
        setError("The server is currently unable to load today's devotional.");
      } else {
        setError("Unable to load today's devotional. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDevotional();
    }, []),
  );

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: theme.card,
          borderRadius: 22,
          padding: 24,
          marginTop: 18,
          marginBottom: 4,
          alignItems: "center",
          borderWidth: isDark ? 1 : 0,
          borderColor: theme.border,
        }}
      >
        <ActivityIndicator size="small" color="#8B5CF6" />

        <Text
          style={{
            marginTop: 10,
            color: theme.secondaryText,
            fontSize: 14,
          }}
        >
          Loading daily devotional...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          backgroundColor: theme.card,
          borderRadius: 22,
          padding: 20,
          marginTop: 18,
          marginBottom: 4,
          alignItems: "center",
          borderWidth: 1,
          borderColor: theme.border,
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
          Unable to Load Devotional
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
          onPress={fetchDevotional}
          style={({ pressed }) => ({
            backgroundColor: isDark ? "#7c3aed" : "#6d28d9",
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

  if (!devotional) {
    return (
      <View
        style={{
          backgroundColor: theme.card,
          borderRadius: 22,
          padding: 20,
          marginTop: 18,
          marginBottom: 4,
          alignItems: "center",
          borderWidth: isDark ? 1 : 0,
          borderColor: theme.border,
        }}
      >
        <Ionicons name="book-outline" size={34} color={theme.secondaryText} />

        <Text
          style={{
            fontSize: 17,
            fontWeight: "700",
            color: theme.text,
            marginTop: 10,
          }}
        >
          No Devotional Available
        </Text>

        <Text
          style={{
            color: theme.secondaryText,
            marginTop: 6,
            textAlign: "center",
          }}
        >
          Today's devotional has not been published yet.
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: theme.card,
        borderRadius: 22,
        padding: 18,
        marginTop: 18,
        marginBottom: 4,
        elevation: 4,
        borderWidth: isDark ? 1 : 0,
        borderColor: theme.border,
      }}
    >
      {/* TOP ROW */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            backgroundColor: isDark ? "#312e81" : "#ede9fe",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Ionicons name="book-outline" size={24} color="#7c3aed" />
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: isDark ? "#c4b5fd" : "#001f5b",
            }}
          >
            Daily Devotional
          </Text>

          <Text
            style={{
              fontSize: 12,
              color: "#8b5cf6",
              fontWeight: "700",
              marginTop: 2,
            }}
          >
            TODAY&apos;S WORD
          </Text>
        </View>
      </View>

      {/* TITLE */}
      <Text
        style={{
          fontSize: 19,
          fontWeight: "700",
          color: theme.text,
          lineHeight: 26,
        }}
      >
        {devotional.title}
      </Text>

      {/* SCRIPTURE */}
      {(devotional.scripture || devotional.bible_verse) && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Ionicons name="bookmark-outline" size={17} color="#7c3aed" />

          <Text
            style={{
              color: theme.secondaryText,
              marginLeft: 6,
              fontSize: 14,
              fontWeight: "600",
              flex: 1,
            }}
          >
            {devotional.scripture || devotional.bible_verse}
          </Text>
        </View>
      )}

      {/* CONTENT */}
      <Text
        numberOfLines={3}
        style={{
          marginTop: 12,
          lineHeight: 22,
          color: theme.secondaryText,
          fontSize: 14,
        }}
      >
        {devotional.content || devotional.message || ""}
      </Text>

      {/* ACTION */}
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/devotional-details",
            params: {
              id: devotional.id.toString(),
            },
          })
        }
        style={({ pressed }) => ({
          marginTop: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: isDark ? "#312e81" : "#f5f3ff",
          paddingVertical: 12,
          paddingHorizontal: 14,
          borderRadius: 14,
          opacity: pressed ? 0.85 : 1,
        })}
      >
        <Text
          style={{
            color: isDark ? "#c4b5fd" : "#6d28d9",
            fontWeight: "700",
            fontSize: 14,
          }}
        >
          Read Full Devotional
        </Text>

        <Ionicons
          name="arrow-forward"
          size={18}
          color={isDark ? "#c4b5fd" : "#6d28d9"}
        />
      </Pressable>
    </View>
  );
}
