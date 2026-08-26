import { Text, View } from "react-native";

import { APP_THEME } from "../constants/appTheme";
import { useAppTheme } from "../src/context/ThemeContext";

export default function AppVersionScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
        paddingHorizontal: 20,
      }}
    >
      {/* APP NAME */}
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: theme.text,
          textAlign: "center",
        }}
      >
        Hallelujah Connect
      </Text>

      {/* VERSION */}
      <Text
        style={{
          marginTop: 15,
          fontSize: 18,
          fontWeight: "600",
          color: theme.text,
        }}
      >
        Version 1.0.0
      </Text>

      {/* TECHNOLOGY */}
      <Text
        style={{
          marginTop: 10,
          color: theme.secondaryText,
          textAlign: "center",
        }}
      >
        Powered by Django & React Native
      </Text>

      {/* STATUS */}
      <View
        style={{
          marginTop: 25,
          backgroundColor: isDark ? "#16352b" : "#dcfce7",
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: isDark ? "#86efac" : "#166534",
            fontWeight: "700",
            fontSize: 13,
          }}
        >
          Hallelujah Connect v1.0
        </Text>
      </View>

      {/* FOOTER */}
      <Text
        style={{
          marginTop: 30,
          color: theme.mutedText,
          fontSize: 12,
          textAlign: "center",
        }}
      >
        RCCG HalleluYah Parish
      </Text>
    </View>
  );
}
