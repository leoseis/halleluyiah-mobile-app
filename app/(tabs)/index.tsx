import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useMemo, useState } from "react";

import AnnouncementCard from "../../components/AnnouncementCard";
import ContinueReadingCard from "../../components/home/ContinueReadingCard";
import DailyDevotionalCard from "../../components/home/DailyDevotionalCard";
import HomeHeader from "../../components/home/HomeHeader";
import LiveServiceBanner from "../../components/home/LiveServiceBanner";
import QuickActions from "../../components/home/QuickActions";
import UpcomingEventCard from "../../components/home/UpcomingEventCard";

import { SafeAreaView } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { COLORS } from "../../constants/colors";

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
  const { user } = useContext(AuthContext);

  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const colorScheme = useColorScheme();
  const theme = COLORS[colorScheme ?? "light"];

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
      console.log("Announcement fetch error:", error);
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

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

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item: any) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.body?.toLowerCase().includes(searchQuery.toLowerCase());

      const categoryName = item.category?.name?.toLowerCase() || "";

      const matchesCategory =
        selectedCategory === "All" ||
        categoryName.includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [announcements, searchQuery, selectedCategory]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color="#001f5b" />

        <Text
          style={{
            marginTop: 12,
            fontSize: 15,
            color: "#6b7280",
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
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: any) => (
          <AnnouncementCard item={item} onLike={handleLikeUpdate} />
        )}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        ListHeaderComponent={
          <View>
            {/* TOP AREA */}
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 10,
              }}
            >
              <HomeHeader
                greeting={getGreeting()}
                userName={user?.username || "Member"}
              />
            </View>

            {/* FEATURE CARDS */}
            <View
              style={{
                marginTop: 8,
                paddingHorizontal: 20,
              }}
            >
              <DailyDevotionalCard />
              <QuickActions />
              <UpcomingEventCard />
              <LiveServiceBanner />
              <ContinueReadingCard />
            </View>

            {/* ANNOUNCEMENT SECTION */}
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 28,
                marginBottom: 16,
              }}
            >
              {/* CHURCH TITLE */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 16,
                    backgroundColor: "#e0ecff",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Image
                    source={require("../../assets/images/reed.png")}
                    style={{
                      width: 38,
                      height: 38,
                      resizeMode: "contain",
                    }}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      color: theme.text,
                    }}
                  >
                    HalleluYah Sanctuary
                  </Text>

                  <Text
                    style={{
                      fontSize: 13,
                      color: "#6b7280",
                      marginTop: 3,
                    }}
                  >
                    Latest church announcements
                  </Text>
                </View>
              </View>

              {/* SEARCH */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: theme.card,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  paddingHorizontal: 14,
                  marginBottom: 18,
                }}
              >
                <Ionicons name="search-outline" size={21} color="#94a3b8" />

                <TextInput
                  placeholder="Search announcements..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#94a3b8"
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    paddingHorizontal: 10,
                    fontSize: 15,
                    color: theme.text,
                  }}
                />

                {searchQuery.length > 0 && (
                  <Pressable onPress={() => setSearchQuery("")}>
                    <Ionicons name="close-circle" size={21} color="#94a3b8" />
                  </Pressable>
                )}
              </View>

              {/* SECTION TITLE */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#001f5b",
                  }}
                >
                  Announcements
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    color: "#6b7280",
                  }}
                >
                  {filteredAnnouncements.length} found
                </Text>
              </View>

              {/* CATEGORY FILTERS */}
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {categories.map((category) => {
                  const active = selectedCategory === category;

                  return (
                    <Pressable
                      key={category}
                      onPress={() => setSelectedCategory(category)}
                      style={{
                        backgroundColor: active ? "#001f5b" : "#eef2f7",
                        paddingVertical: 9,
                        paddingHorizontal: 14,
                        borderRadius: 20,
                        marginRight: 8,
                        marginBottom: 9,
                      }}
                    >
                      <Text
                        style={{
                          color: active ? "white" : "#475569",
                          fontWeight: "600",
                          fontSize: 13,
                        }}
                      >
                        {category}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 40,
              alignItems: "center",
            }}
          >
            <Ionicons name="search-outline" size={42} color="#94a3b8" />

            <Text
              style={{
                fontSize: 17,
                fontWeight: "700",
                color: "#001f5b",
                marginTop: 12,
              }}
            >
              No announcements found
            </Text>

            <Text
              style={{
                color: "#6b7280",
                marginTop: 5,
                textAlign: "center",
              }}
            >
              Try another search or category.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
