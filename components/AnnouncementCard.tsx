import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";

import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function AnnouncementCard({ item, onLike }: any) {
  const handleLike = async () => {
    try {
      const token = await AsyncStorage.getItem("access");

      const response = await axios.post(
        `http://192.168.43.207:8000/api/announcements/${item.id}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      onLike(item.id, response.data.likes_count);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 18,
        marginBottom: 18,
        marginHorizontal: 16,
        overflow: "hidden",

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: {
          width: 0,
          height: 4,
        },

        elevation: 4,
      }}
    >
      {/* CLICKABLE CONTENT */}
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/(tabs)/announcement-details",

            params: {
              id: item.id,
              title: item.title,
              body: item.body,
              image: item.image,
            },
          })
        }
      >
        {item.image && (
          <Image
            source={{
              uri: item.image,
            }}
            resizeMode="contain"
            style={{
              width: "100%",
              height: 220,
              backgroundColor: "#eee",
            }}
          />
        )}

        <View
          style={{
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#0d1b4c",
              marginBottom: 10,
            }}
          >
            {item.title}
          </Text>

          <Text
            numberOfLines={2}
            style={{
              color: "#555",
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            {item.body}
          </Text>
        </View>
      </Pressable>

      {/* ACTIONS */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {/* LIKE BUTTON */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLike}
          style={{
            backgroundColor: "#eef2ff",
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: "#0d1b4c",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            ❤️ {item.likes_count || 0}
          </Text>
        </TouchableOpacity>

        {/* READ MORE */}
        <Text
          style={{
            color: "#001f5b",
            fontWeight: "600",
          }}
        >
          Read More →
        </Text>
      </View>
    </View>
  );
}
