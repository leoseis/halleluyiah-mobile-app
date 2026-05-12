import { Text, View } from "react-native";

export default function EmptyState() {
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 80,
      }}
    >
      <Text
        style={{
          fontSize: 50,
          marginBottom: 10,
        }}
      >
        📭
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#374151",
        }}
      >
        No Announcements Yet
      </Text>

      <Text
        style={{
          marginTop: 8,
          color: "#6b7280",
          textAlign: "center",
          paddingHorizontal: 30,
        }}
      >
        New church announcements will appear here.
      </Text>
    </View>
  );
}
