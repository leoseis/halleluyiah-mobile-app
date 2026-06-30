import { useEffect, useState } from "react";

import { Pressable, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";

export default function ContinueReadingCard() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const stored = await AsyncStorage.getItem("completed_readings");

    if (stored) {
      const completed = JSON.parse(stored);

      // Assuming 30 readings for now
      const percent = Math.round((completed.length / 30) * 100);

      setProgress(percent);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 18,
        padding: 20,
        elevation: 4,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#001f5b",
        }}
      >
        📚 Continue Reading
      </Text>

      <Text
        style={{
          marginTop: 15,
          color: "#555",
        }}
      >
        Your Bible Reading Progress
      </Text>

      <View
        style={{
          height: 10,
          backgroundColor: "#e5e7eb",
          borderRadius: 10,
          marginTop: 15,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#28a745",
          }}
        />
      </View>

      <Text
        style={{
          marginTop: 10,
          fontWeight: "bold",
        }}
      >
        {progress}% Completed
      </Text>

      <Pressable
        onPress={() => router.push("/reading-plan")}
        style={{
          marginTop: 20,
          backgroundColor: "#001f5b",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Continue Reading
        </Text>
      </Pressable>
    </View>
  );
}
