import { useContext, useEffect, useState } from "react";

import { router } from "expo-router";

import { ActivityIndicator, Pressable, Text, View } from "react-native";

import api from "../../src/api/api";

import { AuthContext } from "../../src/context/AuthContext";

export default function HomeScreen() {
  const { logout } = useContext(AuthContext);

  const [announcements, setAnnouncements] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await api.get("/announcements/");

      setAnnouncements(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();

    router.replace("/login");
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />

        <Text
          style={{
            marginTop: 10,
          }}
        >
          Loading announcements...
        </Text>
      </View>
    );
  }

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

      {announcements.map((item: any) => (
        <Pressable
          key={item.id}
          onPress={() =>
            router.push({
              pathname: "/announcement-details",
              params: {
                title: item.title,
                body: item.body,
                image: item.image,
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
