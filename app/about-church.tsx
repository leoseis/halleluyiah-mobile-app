import { ScrollView, Text, View } from "react-native";

export default function AboutChurchScreen() {
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
          fontSize: 30,
          fontWeight: "bold",
          color: "#001f5b",
          marginBottom: 20,
        }}
      >
        About Our Church 🏛
      </Text>

      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 16,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          RCCG Hallelujah Parish
        </Text>

        <Text
          style={{
            lineHeight: 24,
            color: "#555",
          }}
        >
          Welcome to RCCG Hallelujah Parish. We are committed to raising
          disciples, spreading the Gospel, and impacting lives through worship,
          prayer, and the Word of God.
        </Text>

        <Text
          style={{
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          Vision
        </Text>

        <Text
          style={{
            color: "#555",
            marginTop: 5,
          }}
        >
          To make heaven and take as many people with us as possible.
        </Text>

        <Text
          style={{
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          Service Times
        </Text>

        <Text
          style={{
            color: "#555",
            marginTop: 5,
          }}
        >
          Sunday Service - 8:00 AM
        </Text>

        <Text
          style={{
            color: "#555",
          }}
        >
          Bible Study - Wednesday 6:00 PM
        </Text>

        <Text
          style={{
            color: "#555",
          }}
        >
          Prayer Meeting - Friday 6:00 PM
        </Text>
      </View>
    </ScrollView>
  );
}
