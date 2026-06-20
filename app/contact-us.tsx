import { Linking, Pressable, ScrollView, Text, View } from "react-native";

export default function ContactUsScreen() {
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
        Contact Us 📞
      </Text>

      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 16,
        }}
      >
        <Text style={{ marginBottom: 15 }}>📍 RCCG Hallelujah Parish</Text>

        <Pressable onPress={() => Linking.openURL("tel:+2348012345678")}>
          <Text
            style={{
              color: "#001f5b",
              marginBottom: 15,
            }}
          >
            📞 +234 801 234 5678
          </Text>
        </Pressable>

        <Pressable onPress={() => Linking.openURL("mailto:church@email.com")}>
          <Text
            style={{
              color: "#001f5b",
            }}
          >
            ✉️ church@email.com
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
