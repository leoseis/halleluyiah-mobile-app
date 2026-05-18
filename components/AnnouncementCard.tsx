import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";

import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function AnnouncementCard({ item }: any) {
  const handleLike = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem("access");

      await axios.post(
        `http://192.168.43.207:8000/api/announcements/${id}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("liked");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(tabs)/announcement-details",

          params: {
            title: item.title,
            body: item.body,
            image: item.image,
          },
        })
      }
      style={{
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 18,
        marginBottom: 18,
        width: "100%",
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
      {item.image && (
        <Image
          source={{ uri: item.image }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 170,
            borderRadius: 14,
            marginBottom: 14,
          }}
        />
      )}

      <Text
        numberOfLines={2}
        style={{
          fontSize: 20,
          fontWeight: "700",
          color: "#0d1b4c",
          marginBottom: 8,
        }}
      >
        {item.title}
      </Text>

      <Text
        numberOfLines={3}
        style={{
          color: "#555",
          fontSize: 15,
          lineHeight: 22,
          marginBottom: 16,
        }}
      >
        {item.body}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => handleLike(item.id)}
          activeOpacity={0.8}
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
              fontWeight: "700",
              fontSize: 14,
            }}
          >
            ❤️ {item.likes_count || 0}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "#888",
            fontSize: 13,
          }}
        >
          Tap to read more
        </Text>
      </View>
    </Pressable>
  );
}
