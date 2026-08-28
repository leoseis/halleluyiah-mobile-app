import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { APP_THEME } from "../constants/appTheme";
import { useAppTheme } from "../src/context/ThemeContext";

export default function ModalScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
      }}
    >
      {/* MODAL CARD */}
      <View
        style={{
          width: "100%",
          maxWidth: 420,
          backgroundColor: theme.card,
          borderRadius: 24,
          padding: 24,
          borderWidth: 1,
          borderColor: theme.border,
          alignItems: "center",
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: theme.text,
            textAlign: "center",
          }}
        >
          HalleluYah Sanctuary
        </Text>

        <Text
          style={{
            fontSize: 15,
            color: theme.secondaryText,
            textAlign: "center",
            lineHeight: 22,
            marginTop: 10,
            marginBottom: 24,
          }}
        >
          Welcome to RCCG HalleluYah Parish.
        </Text>

        <Pressable
          onPress={() => router.replace("/(tabs)")}
          style={({ pressed }) => ({
            width: "100%",
            backgroundColor: isDark ? "#2563eb" : "#001f5b",
            paddingVertical: 15,
            borderRadius: 14,
            alignItems: "center",
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Go to Home
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
