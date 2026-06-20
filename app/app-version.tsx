import { Text, View } from "react-native";

export default function AppVersionScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fb",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#001f5b",
        }}
      >
        Hallelujah Connect
      </Text>

      <Text
        style={{
          marginTop: 15,
          fontSize: 18,
        }}
      >
        Version 1.0.0
      </Text>

      <Text
        style={{
          marginTop: 10,
          color: "#666",
        }}
      >
        Powered by Django & React Native
      </Text>
    </View>
  );
}
