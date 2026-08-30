import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function LivestreamScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [streams, setStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchStreams = async (isRefreshing = false) => {
    try {
      console.log("LIVESTREAM: starting API request");

      setError("");

      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await api.get("/livestreams/", {
        timeout: 5000,
      });

      console.log("LIVESTREAM SUCCESS:", response.data);

      if (Array.isArray(response.data)) {
        setStreams(response.data);
      } else {
        setStreams([]);
      }
    } catch (error: any) {
      console.log("========== LIVESTREAM ERROR ==========");
      console.log("MESSAGE:", error?.message);
      console.log("CODE:", error?.code);
      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);
      console.log("======================================");

      /*
       * Important:
       * remove any old stream data when
       * the new request fails.
       */
      setStreams([]);

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

      if (error.response.status === 404) {
        setError("Livestream information could not be found.");

        return;
      }

      if (error.response.status >= 500) {
        setError(
          "The server is currently unable to load livestreams. Please try again later.",
        );

        return;
      }

      setError("Unable to load livestreams right now. Please try again.");
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  /*
   * Every time the user returns
   * to the Live tab, fetch fresh data.
   */
  useFocusEffect(
    useCallback(() => {
      fetchStreams();
    }, []),
  );

  const handleWatchLive = async (url?: string) => {
    if (!url) {
      Alert.alert(
        "Link Unavailable",
        "A livestream link is not available for this service.",
      );

      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);

      if (!supported) {
        Alert.alert(
          "Unable to Open Link",
          "This livestream link cannot be opened on your device.",
        );

        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      console.log("OPEN LIVESTREAM ERROR:", error);

      Alert.alert(
        "Unable to Open Livestream",
        "Something went wrong while opening the livestream. Please try again.",
      );
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
            color: theme.secondaryText,
          }}
        >
          Loading Livestreams...
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
          Livestream 🔴
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
            Unable to Load Livestreams
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
            onPress={() => fetchStreams()}
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
        Livestream 🔴
      </Text>

      <FlatList
        data={streams}
        refreshing={refreshing}
        onRefresh={() => fetchStreams(true)}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
          flexGrow: streams.length === 0 ? 1 : 0,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: theme.card,
              borderRadius: 18,
              padding: 20,
              marginBottom: 20,
              elevation: 4,
              borderWidth: isDark ? 1 : 0,
              borderColor: theme.border,
            }}
          >
            {item.is_live && (
              <Text
                style={{
                  color: isDark ? "#f87171" : "#dc2626",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                🔴 LIVE NOW
              </Text>
            )}

            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: theme.text,
              }}
            >
              {item.title}
            </Text>

            <Pressable
              onPress={() => handleWatchLive(item.youtube_url)}
              style={({ pressed }) => ({
                backgroundColor: isDark ? "#2563eb" : "#001f5b",

                padding: 14,
                borderRadius: 12,
                marginTop: 20,
                alignItems: "center",
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                {item.is_live ? "Watch Live" : "Watch Stream"}
              </Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 90,
            }}
          >
            <Text
              style={{
                fontSize: 45,
                marginBottom: 14,
              }}
            >
              📺
            </Text>

            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: theme.text,
                textAlign: "center",
              }}
            >
              No Livestreams Available
            </Text>

            <Text
              style={{
                color: theme.secondaryText,
                textAlign: "center",
                marginTop: 8,
                lineHeight: 21,
              }}
            >
              There are currently no livestreams available. Please check back
              later.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
