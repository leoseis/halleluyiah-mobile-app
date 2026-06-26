import React from "react";
import { Text, View } from "react-native";

interface HomeHeaderProps {
  greeting: string;
  userName: string;
}

export default function HomeHeader({ greeting, userName }: HomeHeaderProps) {
  return (
    <View
      style={{
        backgroundColor: "#001f5b",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 30,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
        }}
      >
        {greeting}
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          marginTop: 5,
        }}
      >
        {userName}
      </Text>

      <Text
        style={{
          color: "#dbeafe",
          marginTop: 8,
          fontSize: 15,
        }}
      >
        Welcome to RCCG Hallelujah Parish
      </Text>
    </View>
  );
}
