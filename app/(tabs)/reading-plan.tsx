import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../src/api/api";

export default function ReadingPlanScreen() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    fetchPlans();
    loadCompleted();
  }, []);

  const loadCompleted = async () => {
    try {
      const stored = await AsyncStorage.getItem("completed_readings");

      if (stored) {
        setCompleted(JSON.parse(stored));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCompleted = async (id: number) => {
    let updated;

    if (completed.includes(id)) {
      updated = completed.filter((item) => item !== id);
    } else {
      updated = [...completed, id];
    }

    setCompleted(updated);

    await AsyncStorage.setItem("completed_readings", JSON.stringify(updated));
  };

  const fetchPlans = async () => {
    try {
      const response = await api.get("/reading-plans/");

      setPlans(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const progress =
    plans.length > 0 ? Math.round((completed.length / plans.length) * 100) : 0;

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#001f5b",
          marginVertical: 20,
        }}
      >
        Bible Reading Plan 📖
      </Text>

      {/* Progress Card */}
      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 16,
          marginBottom: 20,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Progress
        </Text>

        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            color: "#555",
          }}
        >
          {progress}% Completed
        </Text>

        <View
          style={{
            height: 12,
            backgroundColor: "#e5e7eb",
            borderRadius: 10,
            marginTop: 12,
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
      </View>

      <FlatList
        data={plans}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 18,
              marginBottom: 15,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#001f5b",
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                marginTop: 8,
                color: "#555",
              }}
            >
              📖 {item.scripture}
            </Text>

            <Text
              style={{
                marginTop: 8,
                color: "#777",
              }}
            >
              📅 {item.reading_date}
            </Text>

            <Pressable
              onPress={() => toggleCompleted(item.id)}
              style={{
                marginTop: 15,
                backgroundColor: completed.includes(item.id)
                  ? "#28a745"
                  : "#001f5b",
                padding: 12,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {completed.includes(item.id)
                  ? "✓ Completed"
                  : "Mark as Completed"}
              </Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
