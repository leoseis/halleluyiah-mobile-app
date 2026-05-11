import { Image, Text, View } from "react-native";

export default function Header() {
  return (
    <View
      style={{
        backgroundColor: "#0d1b4c",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/images/icon.png")}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: 12,
        }}
      />

      <View>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          RCCG Hallelujah Parish
        </Text>

        <Text
          style={{
            color: "#d1d5db",
          }}
        >
          Parish Announcements
        </Text>
      </View>
    </View>
  );
}
