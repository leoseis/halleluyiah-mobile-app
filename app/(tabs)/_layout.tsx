import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
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
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar.badge.clock" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="prayer"
        options={{
          title: "Prayer",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="heart.fill" color={color} />
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
          title: "Media",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="play.rectangle.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="devotional"
        options={{
          title: "Devotional",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book.fill" color={color} />
          ),
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
        name="gallery"
        options={{
          title: "Gallery",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="photo.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="ellipsis.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
