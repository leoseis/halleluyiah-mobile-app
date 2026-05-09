import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  const [announcements] = useState([
    {
      id: "1",
      title: "Sunday Service",
      message: "Join us this Sunday by 8AM for worship.",
    },
    {
      id: "2",
      title: "Youth Meeting",
      message: "Youth fellowship starts Friday 5PM.",
    },
    {
      id: "3",
      title: "Women Conference",
      message: "Special women conference this Saturday.",
    },
  ]);

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
        Latest announcements
      </Text>

      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
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
              {item.title}
            </Text>

            <Text style={{ marginTop: 5 }}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
}
