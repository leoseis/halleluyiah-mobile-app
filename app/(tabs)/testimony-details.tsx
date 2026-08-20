import { useLocalSearchParams } from "expo-router";

import { ScrollView, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function TestimonyDetails() {
  const params = useLocalSearchParams();

  const testimony = JSON.parse(params.testimony as string);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#001f5b",
          }}
        >
          {testimony.title}
        </Text>

        <Text
          style={{
            marginTop: 10,
            color: "#777",
          }}
        >
          By {testimony.author}
        </Text>

        <Text
          style={{
            marginTop: 25,
            lineHeight: 28,
            fontSize: 16,
            color: "#333",
          }}
        >
          {testimony.content}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
