import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function AnnouncementCard({ item }: any) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/announcement-details",
          params: {
            title: item.title,
            message: item.body,
          },
        })
      }
      style={{}}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={{
              width: "100%",
              height: 200,
            }}
            resizeMode="cover"
          />
        )}

        <View style={{ padding: 16 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            {item.title}
          </Text>

          <Text
            numberOfLines={2}
            style={{
              color: "#4b5563",
              lineHeight: 22,
            }}
          >
            {item.body}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 14,
            }}
          >
            <Ionicons name="heart-outline" size={22} color="#dc2626" />

            <Text
              style={{
                marginLeft: 6,
                color: "#374151",
                fontWeight: "600",
              }}
            >
              {item.likes_count || 0} Likes
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
