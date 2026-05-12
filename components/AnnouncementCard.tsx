import { router } from "expo-router";
import { Pressable, Text } from "react-native";

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
      <Text>{item.title}</Text>
    </Pressable>
  );
}
