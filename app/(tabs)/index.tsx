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
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async (isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await api.get("/announcements/");
      setAnnouncements(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
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
        renderItem={({ item }: any) => <AnnouncementCard item={item} />}
        contentContainerStyle={{
          paddingTop: 50,
          paddingBottom: 20,
        }}
        ListHeaderComponent={
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 24,
                color: "#666",
                marginBottom: 8,
              }}
            >
              Good Afternoon 👋
            </Text>

            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#0d1b4c",
              }}
            >
              RCCG HalleluYah Parish
            </Text>
          </View>
        }
      />
      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: "#001f5b",
          paddingVertical: 10,
          borderRadius: 12,
          marginTop: 10,
          marginBottom: 20,
          alignSelf: "center",
          width: 140,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          Logout
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
