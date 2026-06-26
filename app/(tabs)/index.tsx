import { useContext, useEffect, useMemo, useState } from "react";

import AnnouncementCard from "../../components/AnnouncementCard";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";
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
      <View
        style={{
          backgroundColor: "#001f5b",
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          paddingHorizontal: 20,
          paddingTop: 50,
          paddingBottom: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
          }}
        >
          👋 Good Morning,
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          Leonard
        </Text>

        <Text
          style={{
            color: "#dbeafe",
            marginTop: 8,
            fontSize: 15,
          }}
        >
          Welcome to RCCG Hallelujah Sanctuary
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 20,
          marginTop: -20,
          borderRadius: 18,
          padding: 18,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#001f5b",
          }}
        >
          📖 Verse of the Day
        </Text>

        <Text
          style={{
            marginTop: 12,
            fontSize: 16,
            lineHeight: 24,
            color: "#444",
            fontStyle: "italic",
          }}
        >
          "Trust in the Lord with all your heart and lean not on your own
          understanding."
        </Text>

        <Text
          style={{
            marginTop: 10,
            fontWeight: "bold",
            color: "#001f5b",
          }}
        >
          Proverbs 3:5
        </Text>
      </View>
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
            {/* GREETING */}
            <Text
              style={{
                fontSize: 16,
                color: theme.subtext,
                marginBottom: 6,
              }}
            >
              {getGreeting()}
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            >
              <Pressable
                onPress={() => router.push("/devotional")}
                style={{
                  width: "48%",
                  backgroundColor: "#ffffff",
                  padding: 20,
                  borderRadius: 16,
                  marginBottom: 12,
                  elevation: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 28,
                  }}
                >
                  📖
                </Text>

                <Text
                  style={{
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  Daily Devotional
                </Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/giving")}
                style={{
                  width: "48%",
                  backgroundColor: "#ffffff",
                  padding: 20,
                  borderRadius: 16,
                  marginBottom: 12,
                  elevation: 3,
                }}
              >
                <Text style={{ fontSize: 28 }}>💳</Text>

                <Text
                  style={{
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  Giving
                </Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/events")}
                style={{
                  width: "48%",
                  backgroundColor: "#ffffff",
                  padding: 20,
                  borderRadius: 16,
                  elevation: 3,
                }}
              >
                <Text style={{ fontSize: 28 }}>📅</Text>

                <Text
                  style={{
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  Events
                </Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/testimonies")}
                style={{
                  width: "48%",
                  backgroundColor: "#ffffff",
                  padding: 20,
                  borderRadius: 16,
                  elevation: 3,
                }}
              >
                <Text style={{ fontSize: 28 }}>✨</Text>

                <Text
                  style={{
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  Testimonies
                </Text>
              </Pressable>
            </View>

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
