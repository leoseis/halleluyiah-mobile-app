import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";

import { Pressable, ScrollView, Text, View } from "react-native";

import { APP_THEME } from "../../constants/appTheme";
import { useAppTheme } from "../../src/context/ThemeContext";

const menuItems = [
  {
    title: "Prayer Requests",
    route: "/prayer",
    icon: "heart",
    color: "#ef4444",
  },
  {
    title: "Giving",
    route: "/giving",
    icon: "card",
    color: "#10b981",
  },
  {
    title: "Testimonies",
    route: "/testimonies",
    icon: "sparkles",
    color: "#f59e0b",
  },
  {
    title: "Gallery",
    route: "/gallery",
    icon: "images",
    color: "#8b5cf6",
  },
  {
    title: "Church Branches",
    route: "/branches",
    icon: "business",
    color: "#0ea5e9",
  },
  {
    title: "Service Schedule",
    route: "/schedule",
    icon: "calendar",
    color: "#6366f1",
  },
  {
    title: "Profile",
    route: "/profile",
    icon: "person",
    color: "#14b8a6",
  },
  {
    title: "Calendar",
    route: "/calendar",
    icon: "calendar-outline",
    color: "#f97316",
  },
  {
    title: "Bible Reading",
    route: "/reading-plan",
    icon: "book",
    color: "#7c3aed",
  },
  {
    title: "Settings",
    route: "/settings",
    icon: "settings",
    color: "#64748b",
  },
];

export default function MoreScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: theme.text,
          marginBottom: 8,
        }}
      >
        More
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: theme.secondaryText,
          marginBottom: 24,
        }}
      >
        Explore more church services and features
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => router.push(item.route as any)}
            style={{
              width: "48%",
              backgroundColor: theme.card,
              paddingVertical: 22,
              paddingHorizontal: 14,
              borderRadius: 18,
              marginBottom: 16,
              elevation: 3,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: `${item.color}20`,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <Ionicons name={item.icon as any} size={27} color={item.color} />
            </View>

            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: theme.text,
                textAlign: "center",
              }}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
