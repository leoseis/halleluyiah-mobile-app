import { Linking, Pressable, ScrollView, Text, View } from "react-native";

export default function SocialMediaScreen() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#001f5b",
          marginBottom: 20,
        }}
      >
        Social Media 🌐
      </Text>

      <View
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: 20,
        }}
      >
        <Pressable onPress={() => Linking.openURL("https://facebook.com")}>
          <Text style={{ marginBottom: 15 }}>Facebook</Text>
        </Pressable>

        <Pressable onPress={() => Linking.openURL("https://instagram.com")}>
          <Text style={{ marginBottom: 15 }}>Instagram</Text>
        </Pressable>

        <Pressable onPress={() => Linking.openURL("https://youtube.com")}>
          <Text>YouTube</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
