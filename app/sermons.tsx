import { router } from "expo-router";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import { APP_THEME } from "../constants/appTheme";
import { getSermons } from "../src/api/sermons";
import { useAppTheme } from "../src/context/ThemeContext";

export default function SermonsScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [sermons, setSermons] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSermons();
  }, []);

  const loadSermons = async () => {
    try {
      setError("");

      const data = await getSermons();

      setSermons(data);
    } catch (err: any) {
      console.log("SERMON ERROR:", err);

      setError(
        err?.response
          ? `Server error: ${err.response.status}`
          : err?.message || "Failed to load sermons",
      );
    } finally {
      setLoading(false);
    }
  };

  // LOADING
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
          Loading sermons...
        </Text>
      </View>
    );
  }

  // ERROR
  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 25,
          backgroundColor: theme.background,
        }}
      >
        <Text
          style={{
            color: isDark ? "#f87171" : "#dc2626",
            fontSize: 18,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {error}
        </Text>

        <Pressable
          onPress={() => {
            setLoading(true);
            loadSermons();
          }}
          style={({ pressed }) => ({
            backgroundColor: pressed
              ? isDark
                ? "#1d4ed8"
                : "#00327f"
              : isDark
                ? "#2563eb"
                : "#001f5b",

            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 12,
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

  return (
    <FlatList
      data={sermons}
      keyExtractor={(item: any) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 30,
      }}
      ListHeaderComponent={
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: theme.text,
            marginHorizontal: 15,
            marginTop: 15,
            marginBottom: 5,
          }}
        >
          Sermons 🎙️
        </Text>
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/sermon-details",
              params: {
                id: item.id,
              },
            })
          }
          style={({ pressed }) => ({
            backgroundColor: theme.card,
            marginHorizontal: 15,
            marginTop: 15,
            borderRadius: 15,
            overflow: "hidden",
            elevation: 3,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          {/* SERMON IMAGE */}
          {item.thumbnail && (
            <Image
              source={{
                uri: item.thumbnail,
              }}
              style={{
                height: 220,
                width: "100%",
                backgroundColor: theme.border,
              }}
              resizeMode="cover"
            />
          )}

          {/* CONTENT */}
          <View
            style={{
              padding: 18,
            }}
          >
            <Text
              style={{
                fontSize: 22,
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
              👤 {item.pastor}
            </Text>

            <Text
              style={{
                marginTop: 5,
                color: theme.secondaryText,
              }}
            >
              📖 {item.scripture}
            </Text>

            <Text
              numberOfLines={3}
              style={{
                marginTop: 10,
                color: theme.secondaryText,
                lineHeight: 22,
              }}
            >
              {item.description}
            </Text>

            <Text
              style={{
                marginTop: 16,
                color: isDark ? "#60a5fa" : "#001f5b",
                fontWeight: "700",
              }}
            >
              View Sermon →
            </Text>
          </View>
        </Pressable>
      )}
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
            No sermons available.
          </Text>
        </View>
      }
    />
  );
}
