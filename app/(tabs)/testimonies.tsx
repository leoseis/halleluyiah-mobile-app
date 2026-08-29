import { router } from "expo-router";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function TestimoniesScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [testimonies, setTestimonies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const fetchTestimonies = async () => {
    try {
      console.log("TESTIMONIES: starting API request");

      setLoading(true);
      setError("");

      const response = await api.get("/testimonies/");

      console.log("TESTIMONIES API SUCCESS:", response.data);

      setTestimonies(response.data);
    } catch (error: any) {
      console.log("TESTIMONIES API FAILED");
      console.log("TESTIMONIES ERROR MESSAGE:", error.message);
      console.log("TESTIMONIES ERROR STATUS:", error.response?.status);

      setTestimonies([]);

      setError(
        "Unable to load testimonies. Please check your connection and try again.",
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
            color: theme.secondaryText,
            fontSize: 15,
          }}
        >
          Loading testimonies...
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
          Unable to Load Testimonies
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
          onPress={fetchTestimonies}
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
          marginVertical: 20,
        }}
      >
        Testimonies ✨
      </Text>

      <FlatList
        data={testimonies}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
          flexGrow: testimonies.length === 0 ? 1 : undefined,
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/testimony-details",
                params: {
                  testimony: JSON.stringify(item),
                },
              })
            }
            style={({ pressed }) => ({
              backgroundColor: theme.card,
              padding: 20,
              borderRadius: 18,
              marginBottom: 18,
              elevation: 4,
              borderWidth: isDark ? 1 : 0,
              borderColor: theme.border,
              opacity: pressed ? 0.85 : 1,
            })}
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
                color: theme.secondaryText,
                marginTop: 6,
              }}
            >
              By {item.author}
            </Text>

            <Text
              numberOfLines={3}
              style={{
                marginTop: 12,
                color: theme.secondaryText,
                lineHeight: 22,
              }}
            >
              {item.content}
            </Text>

            <Text
              style={{
                marginTop: 15,
                color: isDark ? "#60a5fa" : "#001f5b",
                fontWeight: "bold",
              }}
            >
              Read More →
            </Text>
          </Pressable>
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
              ✨
            </Text>

            <Text
              style={{
                fontSize: 21,
                fontWeight: "bold",
                color: theme.text,
                textAlign: "center",
              }}
            >
              No Testimonies Available
            </Text>

            <Text
              style={{
                color: theme.secondaryText,
                textAlign: "center",
                marginTop: 8,
                lineHeight: 22,
                fontSize: 15,
              }}
            >
              There are currently no testimonies to display. Please check back
              later.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
