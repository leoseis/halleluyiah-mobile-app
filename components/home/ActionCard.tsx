import { router } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

interface ActionCardProps {
  title: string;
  icon: string;
  route: string;
}

export default function ActionCard({ title, icon, route }: ActionCardProps) {
  return (
    <Pressable
      onPress={() => router.push(route as any)}
      style={{
        width: "48%",
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 16,
        marginBottom: 12,
        elevation: 3,
      }}
    >
      <Text
        style={{
          fontSize: 28,
        }}
      >
        {icon}
      </Text>

      <Text
        style={{
          fontWeight: "bold",
          marginTop: 10,
          fontSize: 16,
          color: "#001f5b",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
