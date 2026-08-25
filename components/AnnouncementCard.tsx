import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { APP_THEME } from "../constants/appTheme";
import { useAppTheme } from "../src/context/ThemeContext";

import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

import api from "../src/api/api";

export default function AnnouncementCard({ item, onLike }: any) {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];
  const handleLike = async () => {
    try {
      const response = await api.post(`/announcements/${item.id}/like/`, {});

      onLike(item.id, response.data.likes_count);
    } catch (error) {
      console.log("Like error:", error);
    }
  };

  const openAnnouncement = () => {
    router.push({
      pathname: "/(tabs)/announcement-details",
      params: {
        id: item.id,
        title: item.title,
        body: item.body,
        image: item.image,
      },
    });
  };

  return (
    <View
      style={{
        backgroundColor: theme.card,
        borderRadius: 22,
        marginBottom: 20,
        marginHorizontal: 16,
        overflow: "hidden",

        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 10,
        shadowOffset: {
          width: 0,
          height: 4,
        },

        elevation: 4,
      }}
    >
      {/* IMAGE + CONTENT */}
      <Pressable onPress={openAnnouncement}>
        {item.image && (
          <Image
            source={{
              uri: item.image,
            }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 210,
              backgroundColor: theme.border,
            }}
          />
        )}

        <View
          style={{
            padding: 18,
          }}
        >
          {/* CATEGORY */}
          {item.category?.name && (
            <View
              style={{
                alignSelf: "flex-start",
                backgroundColor: isDark ? "#1e3a5f" : "#e0ecff",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 20,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  color: isDark ? "#93c5fd" : "#001f5b",
                  fontSize: 12,
                  fontWeight: "700",
                }}
              >
                {item.category.name}
              </Text>
            </View>
          )}

          {/* TITLE */}
          <Text
            style={{
              fontSize: 21,
              fontWeight: "bold",
              color: theme.text,
              marginBottom: 8,
              lineHeight: 28,
            }}
          >
            {item.title}
          </Text>

          {/* BODY */}
          <Text
            numberOfLines={3}
            style={{
              color: theme.secondaryText,
              fontSize: 15,
              lineHeight: 23,
            }}
          >
            {item.body}
          </Text>
        </View>
      </Pressable>

      {/* DIVIDER */}
      <View
        style={{
          height: 1,
          backgroundColor: theme.border,
          marginHorizontal: 18,
        }}
      />

      {/* ACTIONS */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 18,
          paddingVertical: 14,
        }}
      >
        {/* LIKE */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handleLike}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: isDark ? "#3f1d24" : "#fff1f2",
            paddingVertical: 9,
            paddingHorizontal: 13,
            borderRadius: 14,
          }}
        >
          <Ionicons name="heart" size={19} color="#ef4444" />

          <Text
            style={{
              color: theme.text,
              fontWeight: "700",
              fontSize: 14,
              marginLeft: 6,
            }}
          >
            {item.likes_count || 0}
          </Text>
        </TouchableOpacity>

        {/* READ MORE */}
        <Pressable
          onPress={openAnnouncement}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: isDark ? "#60a5fa" : "#001f5b",
              fontWeight: "700",
              fontSize: 14,
              marginRight: 4,
            }}
          >
            Read More
          </Text>

          <Ionicons
            name="arrow-forward"
            size={17}
            color={isDark ? "#60a5fa" : "#001f5b"}
          />
        </Pressable>
      </View>
    </View>
  );
}
