import { Text, View } from "react-native";

export default function AnnouncementCard({ item }: any) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        borderRadius: 14,
        marginBottom: 15,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {item.title}
      </Text>

      <Text
        style={{
          marginTop: 6,
          color: "#4b5563",
        }}
      >
        {item.message}
      </Text>
    </View>
  );
}
