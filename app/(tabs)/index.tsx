import { useContext, useEffect, useState } from "react";

import AnnouncementCard from "../../components/AnnouncementCard";

import { router } from "expo-router";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";

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
            fontSize: 16,
          }}
        >
          Loading announcements...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
    >
      <FlatList
        data={announcements}
        keyExtractor={(item: any) => item.id.toString()}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#0d1b4c",
              }}
            >
              RCCG Announcements
            </Text>
          </View>
        }
        renderItem={({ item }: any) => <AnnouncementCard item={item} />}
      />

      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: "#0d1b4c",

          marginHorizontal: 16,
          marginBottom: 20,

          paddingVertical: 15,

          borderRadius: 14,

          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Logout
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
