import { router } from "expo-router";

import { Pressable, ScrollView, Text } from "react-native";

export default function MoreScreen() {
  const menus = [
    {
      title: "Daily Devotional",
      route: "/devotional",
    },
    {
      title: "Giving",
      route: "/giving",
    },
    {
      title: "Testimonies",
      route: "/testimony",
    },
    {
      title: "Calendar",
      route: "/calendar",
    },
    {
      title: "Profile",
      route: "/profile",
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 25,
        }}
      >
        More
      </Text>

      {menus.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => router.push(item.route as any)}
          style={{
            backgroundColor: "white",
            padding: 18,
            borderRadius: 12,
            marginBottom: 15,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            {item.title}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
