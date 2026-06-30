import { useContext, useEffect, useMemo, useState } from "react";
import LiveServiceBanner from "../../components/home/LiveServiceBanner";
import QuickActions from "../../components/home/QuickActions";

import AnnouncementCard from "../../components/AnnouncementCard";

import { SafeAreaView } from "react-native-safe-area-context";
import UpcomingEventCard from "../../components/home/UpcomingEventCard";
import VerseCard from "../../components/home/VerseCard";

import { router } from "expo-router";
import ContinueReadingCard from "../../components/home/ContinueReadingCard";
import HomeHeader from "../../components/home/HomeHeader";
import { COLORS } from "../../constants/colors";

import { useColorScheme } from "@/hooks/use-color-scheme";

import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import api from "../../src/api/api";

import { AuthContext } from "../../src/context/AuthContext";

export default function HomeScreen() {
  const { logout } = useContext(AuthContext);

  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const colorScheme = useColorScheme();

  const theme = COLORS[colorScheme ?? "light"];

  // ✅ SEARCH
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ CATEGORY
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Events",
    "Testimony",
    "Youth",
    "Men",
    "Women",
    "children",
    "pastoral",
  ];

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // ✅ FETCH ANNOUNCEMENTS
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

  // ✅ LIKE UPDATE
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

  // ✅ REAL TIME GREETING
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

  // ✅ FILTERED ANNOUNCEMENTS
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item: any) => {
      // ✅ SEARCH FILTER
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.body?.toLowerCase().includes(searchQuery.toLowerCase());

      // ✅ CATEGORY FILTER
      const categoryName = item.category?.name?.toLowerCase() || "";

      const matchesCategory =
        selectedCategory === "All" ||
        categoryName.includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [announcements, searchQuery, selectedCategory]);

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <FlatList
        data={filteredAnnouncements}
        refreshing={refreshing}
        onRefresh={() => fetchAnnouncements(true)}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => (
          <AnnouncementCard item={item} onLike={handleLikeUpdate} />
        )}
        contentContainerStyle={{
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
            <HomeHeader greeting={getGreeting()} userName="Leonard" />
            <VerseCard />

            <QuickActions />
            <UpcomingEventCard />
            <LiveServiceBanner />
            <ContinueReadingCard />
            {/* GREETING */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            ></View>

            {/* LOGO + TITLE */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
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
                  fontSize: 28,
                  fontWeight: "bold",
                  color: theme.text,
                }}
              >
                HalleluYah Sanctuary
              </Text>
            </View>

            {/* SEARCH */}
            <TextInput
              placeholder="Search announcements..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                padding: 14,
                borderRadius: 14,
                borderWidth: 1,
                backgroundColor: theme.card,
                fontSize: 16,
                marginBottom: 20,
              }}
            />

            {/* CATEGORY FILTERS */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 10,
              }}
            >
              {categories.map((category) => (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={{
                    backgroundColor:
                      selectedCategory === category ? "#001f5b" : "#e5e7eb",

                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedCategory === category ? "white" : "#111827",

                      fontWeight: "600",
                    }}
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        }
      />

      {/* LOGOUT BUTTON */}
      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: "#001f5b",
          paddingVertical: 14,
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
