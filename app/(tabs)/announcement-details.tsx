import { router, useLocalSearchParams } from "expo-router";

import { Image, Pressable, ScrollView, Text } from "react-native";

export default function AnnouncementDetails() {
  const { title, body, image } = useLocalSearchParams();
  const imageUri = typeof image === "string" ? image : undefined;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
        padding: 16,
      }}
    >
      <Image
        source={{
          uri: imageUri,
        }}
        resizeMode="contain"
        style={{
          width: "100%",
          height: 250,
          borderRadius: 12,
          marginBottom: 20,
          backgroundColor: "#fff",
        }}
      />

      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#0d1b4c",
          marginBottom: 14,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#0d1b4c",
              fontWeight: "bold",
            }}
          >
            ← Back
          </Text>
        </Pressable>
        {title}
      </Text>

      <Text
        style={{
          fontSize: 17,
          color: "#444",
          lineHeight: 26,
        }}
      >
        {body}
      </Text>
    </ScrollView>
  );
}
