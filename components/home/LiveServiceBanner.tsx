import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../src/context/ThemeContext";

import api from "../../src/api/api";

export default function LiveServiceBanner() {
  const { isDark } = useAppTheme();

  const [service, setService] = useState<any>(null);

  useEffect(() => {
    fetchLiveService();
  }, []);

  const fetchLiveService = async () => {
    try {
      const response = await api.get("/live-service/");

      if (response.data.length > 0) {
        setService(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!service) return null;

  const handleWatchLive = async () => {
    if (!service.youtube_url) return;

    try {
      const supported = await Linking.canOpenURL(service.youtube_url);

      if (supported) {
        await Linking.openURL(service.youtube_url);
      }
    } catch (error) {
      console.log("Unable to open live service:", error);
    }
  };

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
