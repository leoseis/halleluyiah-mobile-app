import { useLocalSearchParams } from "expo-router";

import { ScrollView, Text } from "react-native";

export default function AnnouncementDetails() {
  const { title, body } = useLocalSearchParams();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#0d1b4c",
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontSize: 16,
          lineHeight: 28,
          color: "#444",
        }}
      >
        {body}
      </Text>
    </ScrollView>
  );
}
