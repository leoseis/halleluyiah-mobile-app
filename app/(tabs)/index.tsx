import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        RCCG Hallelujah Parish
      </Text>

      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        Announcements
      </Text>

      <View
        style={{
          backgroundColor: "#f3f4f6",
          padding: 15,
          borderRadius: 12,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Sunday Service
        </Text>

        <Text style={{ marginTop: 5 }}>
          Join us this Sunday by 8AM for worship.
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#f3f4f6",
          padding: 15,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Youth Meeting
        </Text>

        <Text style={{ marginTop: 5 }}>
          Youth fellowship starts Friday 5PM.
        </Text>
      </View>
    </View>
  );
}
