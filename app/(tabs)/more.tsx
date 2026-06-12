import { router } from "expo-router";

import { Pressable, ScrollView, Text } from "react-native";

const menuItems = [
  {
    title: "Prayer Requests 🙏",
    route: "/prayer",
  },
  {
    title: "Daily Devotional 📖",
    route: "/devotional",
  },
  {
    title: "Giving 💳",
    route: "/giving",
  },
  {
    title: "Testimonies ✨",
    route: "/testimonies",
  },
  {
    title: "Gallery 📸",
    route: "/gallery",
  },
  {
    title: "Profile 👤",
    route: "/profile",
  },
  {
    title: "Calendar 📅",
    route: "/calendar",
  },

  {
    title: "Bible Reading Plan 📖",
    route: "/reading-plan",
  },
];

export default function MoreScreen() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#001f5b",
          marginBottom: 25,
        }}
      >
        More
      </Text>

      {menuItems.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => router.push(item.route as any)}
          style={{
            backgroundColor: "white",
            padding: 18,
            borderRadius: 16,
            marginBottom: 15,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "#001f5b",
            }}
          >
            {item.title}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
