import { useContext, useEffect, useState } from "react";

import AnnouncementCard from "../../components/AnnouncementCard";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
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
        refreshing={refreshing}
        onRefresh={() => fetchAnnouncements(true)}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => <AnnouncementCard item={item} />}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 20,
        }}
        ListHeaderComponent={
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#666",
                marginBottom: 4,
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
          paddingVertical: 12,
          borderRadius: 14,
          marginHorizontal: 20,
          marginBottom: 20,
          alignItems: "center",
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
