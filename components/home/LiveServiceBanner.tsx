import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  Text,
  View,
} from "react-native";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function LiveServiceBanner() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLiveService = async () => {
    try {
      console.log("LIVE SERVICE: starting API request");

      setLoading(true);
      setError("");
      setService(null);

      const response = await api.get("/live-service/", {
        // Important for local development.
        // Do not allow the request to wait forever.
        timeout: 5000,
      });

      console.log("LIVE SERVICE SUCCESS:", response.data);

      /*
       * Your API may return either:
       *
       * [
       *   {...}
       * ]
       *
       * or directly:
       *
       * {...}
       *
       * We safely support both.
       */

      if (Array.isArray(response.data)) {
        if (response.data.length > 0) {
          setService(response.data[0]);
        } else {
          setService(null);
        }

        return;
      }

      if (
        response.data &&
        typeof response.data === "object" &&
        Object.keys(response.data).length > 0
      ) {
        setService(response.data);
        return;
      }

      /*
       * API worked successfully,
       * but there is no live service.
       */
      setService(null);
    } catch (error: any) {
      console.log("========== LIVE SERVICE ERROR ==========");
      console.log("MESSAGE:", error?.message);
      console.log("CODE:", error?.code);
      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);
      console.log("========================================");

      setService(null);

      /*
       * Request timed out.
       */
      if (error?.code === "ECONNABORTED" || error?.code === "ETIMEDOUT") {
        setError("The connection to the server timed out. Please try again.");

        return;
      }

      /*
       * No HTTP response means:
       * server offline,
       * Wi-Fi/LAN issue,
       * incorrect IP,
       * etc.
       */
      if (!error?.response) {
        setError(
          "Unable to connect to the server. Please check your connection and try again.",
        );

        return;
      }

      /*
       * Authentication problem.
       */
      if (error.response.status === 401) {
        setError("Your session has expired. Please sign in again.");

        return;
      }

      /*
       * Endpoint not found.
       */
      if (error.response.status === 404) {
        setError("The live service information could not be found.");

        return;
      }

      /*
       * Backend/server problem.
       */
      if (error.response.status >= 500) {
        setError(
          "The server is currently unable to check the live service. Please try again.",
        );

        return;
      }

      setError("Unable to check the live service right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLiveService();
    }, []),
  );

  const handleWatchLive = async () => {
    if (!service?.youtube_url) {
      Alert.alert(
        "Link Unavailable",
        "A streaming link is not available for this service.",
      );

      return;
    }

    try {
      const supported = await Linking.canOpenURL(service.youtube_url);

      if (!supported) {
        Alert.alert(
          "Unable to Open Link",
          "This live service link cannot be opened on your device.",
        );

        return;
      }

      await Linking.openURL(service.youtube_url);
    } catch (error) {
      console.log("Unable to open live service:", error);

      Alert.alert(
        "Unable to Open Live Service",
        "Something went wrong while opening the live stream. Please try again.",
      );
    }
  };

  /*
   * Keep loading compact because this is only
   * one optional card on the Home screen.
   */
  if (loading) {
    return (
      <View
        style={{
          backgroundColor: theme.card,
          marginTop: 18,
          borderRadius: 20,
          paddingVertical: 18,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: isDark ? 1 : 0,
          borderColor: theme.border,
        }}
      >
        <ActivityIndicator size="small" color={theme.primary} />

        <Text
          style={{
            marginLeft: 10,
            color: theme.secondaryText,
            fontSize: 14,
          }}
        >
          Checking live service...
        </Text>
      </View>
    );
  }

  /*
   * API failed.
   * Show a compact error instead of silently disappearing.
   */
  if (error) {
    return (
      <View
        style={{
          backgroundColor: theme.card,
          marginTop: 18,
          borderRadius: 20,
          padding: 18,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="cloud-offline-outline"
            size={24}
            color={theme.secondaryText}
          />

          <View
            style={{
              flex: 1,
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: theme.text,
              }}
            >
              Unable to Check Live Service
            </Text>

            <Text
              style={{
                color: theme.secondaryText,
                fontSize: 13,
                marginTop: 4,
                lineHeight: 18,
              }}
            >
              {error}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={fetchLiveService}
          style={({ pressed }) => ({
            alignSelf: "flex-start",
            backgroundColor: isDark ? "#2563eb" : "#001f5b",
            paddingVertical: 9,
            paddingHorizontal: 18,
            borderRadius: 10,
            marginTop: 14,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text
            style={{
              color: "#ffffff",
              fontWeight: "700",
              fontSize: 13,
            }}
          >
            Try Again
          </Text>
        </Pressable>
      </View>
    );
  }

  /*
   * Request succeeded but there is no
   * active live service.
   *
   * This is normal, so show nothing.
   */
  if (!service) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: isDark ? "#7f1d1d" : "#B91C1C",
        marginTop: 18,
        borderRadius: 20,
        padding: 18,
        elevation: 3,
      }}
    >
      {/* LIVE BADGE */}
      <View
        style={{
          alignSelf: "flex-start",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.18)",
          paddingVertical: 7,
          paddingHorizontal: 11,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#ffffff",
            marginRight: 7,
          }}
        />

        <Text
          style={{
            color: "#ffffff",
            fontSize: 12,
            fontWeight: "800",
            letterSpacing: 0.8,
          }}
        >
          LIVE NOW
        </Text>
      </View>

      {/* TITLE */}
      <Text
        style={{
          color: "#ffffff",
          marginTop: 16,
          fontSize: 21,
          fontWeight: "700",
          lineHeight: 27,
        }}
      >
        {service.title}
      </Text>

      {/* DESCRIPTION */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Ionicons
          name="radio-outline"
          size={18}
          color={isDark ? "#fecaca" : "#FEE2E2"}
        />

        <Text
          style={{
            color: isDark ? "#fecaca" : "#FEE2E2",
            marginLeft: 7,
            fontSize: 14,
            flex: 1,
          }}
        >
          Join the service currently streaming live
        </Text>
      </View>

      {/* WATCH BUTTON */}
      <Pressable
        onPress={handleWatchLive}
        style={({ pressed }) => ({
          backgroundColor: pressed
            ? isDark
              ? "#cbd5e1"
              : "#F3F4F6"
            : isDark
              ? "#f8fafc"
              : "#ffffff",

          marginTop: 20,
          paddingVertical: 13,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        })}
      >
        <Ionicons
          name="logo-youtube"
          size={20}
          color={isDark ? "#991b1b" : "#B91C1C"}
        />

        <Text
          style={{
            color: isDark ? "#991b1b" : "#B91C1C",
            fontWeight: "700",
            fontSize: 15,
            marginLeft: 8,
          }}
        >
          Watch Live
        </Text>
      </Pressable>
    </View>
  );
}
