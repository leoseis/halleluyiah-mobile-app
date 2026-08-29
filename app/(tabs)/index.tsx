import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useMemo, useState } from "react";

import AnnouncementCard from "../../components/AnnouncementCard";
import ContinueReadingCard from "../../components/home/ContinueReadingCard";
import DailyDevotionalCard from "../../components/home/DailyDevotionalCard";
import HomeHeader from "../../components/home/HomeHeader";
import LiveServiceBanner from "../../components/home/LiveServiceBanner";
import QuickActions from "../../components/home/QuickActions";
import UpcomingEventCard from "../../components/home/UpcomingEventCard";

import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../src/api/api";
import { AuthContext } from "../../src/context/AuthContext";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { isDark } = useAppTheme();

  const theme = {
    background: isDark ? "#0f172a" : "#f5f7fb",
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#f8fafc" : "#111827",
    secondaryText: isDark ? "#94a3b8" : "#6b7280",
    border: isDark ? "#334155" : "#e5e7eb",
    chip: isDark ? "#334155" : "#eef2f7",
    primary: isDark ? "#60a5fa" : "#001f5b",
  };

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

  const fetchAnnouncements = async (isRefreshing = false) => {
    try {
      console.log("HOME: starting announcements API request");

      setError("");

      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await api.get("/announcements/");

      console.log("ANNOUNCEMENTS SUCCESS:", response.data);

      setAnnouncements(response.data);
    } catch (error: any) {
      console.log("ANNOUNCEMENT FETCH FAILED");
      console.log("ERROR MESSAGE:", error.message);
      console.log("ERROR STATUS:", error.response?.status);
      console.log("ERROR RESPONSE:", error.response?.data);

      setAnnouncements([]);

      if (!error.response) {
        setError(
          "Unable to connect to the server. Please check your connection and try again.",
        );
      } else if (error.response?.status >= 500) {
        setError(
          "The server is currently unable to load announcements. Please try again later.",
        );
      } else {
        setError("Unable to load announcements. Please try again.");
      }
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  /*
   * Refresh announcements whenever
   * Home comes back into focus.
   */
  useFocusEffect(
    useCallback(() => {
      fetchAnnouncements();
    }, []),
  );

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <FlatList
        data={error ? [] : filteredAnnouncements}
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
                    backgroundColor: isDark ? "#1e3a5f" : "#e0ecff",
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
                      color: theme.secondaryText,
                      marginTop: 3,
                    }}
                  >
                    Latest church announcements
                  </Text>
                </View>
              </View>

              {/* SEARCH */}
              {!error && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: theme.card,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: theme.border,
                    paddingHorizontal: 14,
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
              )}

              {/* SECTION TITLE */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 18,
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: theme.primary,
                  }}
                >
                  Announcements
                </Text>

                {!error && !loading && (
                  <Text
                    style={{
                      fontSize: 13,
                      color: theme.secondaryText,
                    }}
                  >
                    {filteredAnnouncements.length} found
                  </Text>
                )}
              </View>

              {/* CATEGORY FILTERS */}
              {!error && !loading && (
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
                          backgroundColor: active
                            ? isDark
                              ? "#2563eb"
                              : "#001f5b"
                            : theme.chip,

                          paddingVertical: 9,
                          paddingHorizontal: 14,
                          borderRadius: 20,
                          marginRight: 8,
                          marginBottom: 9,
                        }}
                      >
                        <Text
                          style={{
                            color: active
                              ? "#ffffff"
                              : isDark
                                ? "#e2e8f0"
                                : "#475569",

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
              )}

              {/* ANNOUNCEMENT LOADING */}
              {loading && (
                <View
                  style={{
                    alignItems: "center",
                    paddingVertical: 35,
                  }}
                >
                  <ActivityIndicator size="large" color={theme.primary} />

                  <Text
                    style={{
                      color: theme.secondaryText,
                      marginTop: 12,
                    }}
                  >
                    Loading announcements...
                  </Text>
                </View>
              )}

              {/* ANNOUNCEMENT ERROR */}
              {!loading && error && (
                <View
                  style={{
                    backgroundColor: theme.card,
                    borderRadius: 18,
                    padding: 25,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: theme.border,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 42,
                      marginBottom: 12,
                    }}
                  >
                    📡
                  </Text>

                  <Text
                    style={{
                      fontSize: 19,
                      fontWeight: "bold",
                      color: theme.text,
                      textAlign: "center",
                    }}
                  >
                    Unable to Load Announcements
                  </Text>

                  <Text
                    style={{
                      color: theme.secondaryText,
                      textAlign: "center",
                      marginTop: 8,
                      lineHeight: 21,
                    }}
                  >
                    {error}
                  </Text>

                  <Pressable
                    onPress={() => fetchAnnouncements()}
                    style={({ pressed }) => ({
                      backgroundColor: isDark ? "#2563eb" : "#001f5b",

                      paddingHorizontal: 25,
                      paddingVertical: 12,
                      borderRadius: 12,
                      marginTop: 18,
                      opacity: pressed ? 0.8 : 1,
                    })}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontWeight: "bold",
                      }}
                    >
                      Try Again
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 40,
                alignItems: "center",
              }}
            >
              <Ionicons
                name={
                  searchQuery || selectedCategory !== "All"
                    ? "search-outline"
                    : "megaphone-outline"
                }
                size={42}
                color="#94a3b8"
              />

              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: theme.text,
                  marginTop: 12,
                }}
              >
                {searchQuery || selectedCategory !== "All"
                  ? "No announcements found"
                  : "No announcements available"}
              </Text>

              <Text
                style={{
                  color: theme.secondaryText,
                  marginTop: 5,
                  textAlign: "center",
                }}
              >
                {searchQuery || selectedCategory !== "All"
                  ? "Try another search or category."
                  : "There are currently no church announcements. Please check back later."}
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
