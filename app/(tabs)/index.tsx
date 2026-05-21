import { useContext, useEffect, useState } from "react";

import AnnouncementCard from "../../components/AnnouncementCard";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
import { Image } from "react-native";

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

  const [announcements, setAnnouncements] = useState<any[]>([]);
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

  // ✅ UPDATE LIKES
  const handleLikeUpdate = (id: number, likes_count: number) => {
    setAnnouncements((prev: any) =>
      prev.map((announcement: any) =>
        announcement.id === id
          ? {
              ...announcement,
              likes_count,
            }
          : announcement,
      ),
    );
  };

  // ✅ LOGOUT
  const handleLogout = async () => {
    await logout();

    router.replace("/login");
  };

  // ✅ LOADING SCREEN
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
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning ☀️";
    }

    if (hour < 18) {
      return "Good Afternoon 🌤️";
    }

    return "Good Evening 🌙";
  };

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
        renderItem={({ item }: any) => (
          <AnnouncementCard item={item} onLike={handleLikeUpdate} />
        )}
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
              {getGreeting()}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 6,
              }}
            >
              <Image
                source={require("../../assets/images/reed.png")}
                style={{
                  width: 45,
                  height: 45,
                  marginRight: 12,
                  resizeMode: "contain",
                }}
              />

              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                  color: "#0d1b4c",
                }}
              >
                HalleluYah Parish
              </Text>
            </View>
          </View>
        }
      />

      {/* LOGOUT BUTTON */}
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
