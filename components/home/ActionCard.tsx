import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { APP_THEME } from "../../constants/appTheme";
import { useAppTheme } from "../../src/context/ThemeContext";

interface ActionCardProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  color: string;
}

export default function ActionCard({
  title,
  icon,
  route,
  color,
}: ActionCardProps) {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];
  return (
    <Pressable
      onPress={() => router.push(route as any)}
      style={{
        width: "48%",
        backgroundColor: theme.card,
        padding: 18,
        borderRadius: 18,
        marginBottom: 14,
        elevation: 3,
      }}
    >
      <View
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          backgroundColor: `${color}18`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={icon} size={24} color={color} />
      </View>

      <Text
        style={{
          fontWeight: "700",
          marginTop: 12,
          fontSize: 15,
          color: theme.text,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          marginTop: 4,
          fontSize: 12,
          color: theme.mutedText,
        }}
      >
        Open
      </Text>
    </Pressable>
  );
}
