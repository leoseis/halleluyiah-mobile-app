import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function AnnouncementDetails() {
  const { title, message } = useLocalSearchParams();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
        padding: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 16,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            fontSize: 18,
            color: "#4b5563",
            lineHeight: 28,
          }}
        >
          {message}
        </Text>
      </View>
    </SafeAreaView>
  );
}
