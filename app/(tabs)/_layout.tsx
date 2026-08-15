import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#666666",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 4,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <Ionicons name="home" size={26} color="#0EA5E9" />,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          href: null,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          href: null,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: () => (
            <Ionicons name="calendar" size={26} color="#F59E0B" />
          ),
        }}
      />

      <Tabs.Screen
        name="prayer"
        options={{
          href: null,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="heart.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="livestream"
        options={{
          title: "Live",
          tabBarIcon: () => <Ionicons name="tv" size={26} color="#EF4444" />,
        }}
      />
      <Tabs.Screen
        name="branches"
        options={{
          href: null,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="building.2.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="schedule"
        options={{
          href: null,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="giving"
        options={{
          href: null,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="creditcard.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="media"
        options={{
          href: null,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="play.rectangle.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="devotional"
        options={{
          title: "Devotional",
          tabBarIcon: () => <Ionicons name="book" size={26} color="#8B5CF6" />,
        }}
      />
      <Tabs.Screen
        name="testimonies"
        options={{
          href: null,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="sparkles" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          href: null,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="edit-profile"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="reading-plan"
        options={{
          href: null,
        }}
      />

      {/* Hidden Screens */}
      <Tabs.Screen
        name="announcement-details"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="sermon-details"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="event-details"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="event-register"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="testimony-details"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          href: null,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="photo.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: () => (
            <Ionicons
              name="ellipsis-horizontal-circle"
              size={26}
              color="#10B981"
            />
          ),
        }}
      />
    </Tabs>
  );
}
