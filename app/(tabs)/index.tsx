import { router } from "expo-router";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";

import { AuthContext } from "../../src/context/AuthContext";

export default function HomeScreen() {
  const { logout } = useContext(AuthContext);

  const announcements = [
    {
      id: 1,
      title: "Sunday Service",
    },
    {
      id: 2,
      title: "Prayer Meeting",
    },
  ];

  const handleLogout = async () => {
    await logout();

    router.replace("/login");
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f7fb",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#0d1b4c",
        }}
      >
        RCCG Announcements
      </Text>

      {announcements.map((item) => (
        <Pressable
          key={item.id}
          onPress={() =>
            router.push({
              pathname: "/announcement-details",
              params: {
                title: item.title,
              },
            })
          }
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 16,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {item.title}
          </Text>
        </Pressable>
      ))}

      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: "#0d1b4c",
          padding: 16,
          borderRadius: 12,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Logout
        </Text>
      </Pressable>
    </View>
  );
}
