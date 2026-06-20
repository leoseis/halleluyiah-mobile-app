import { useEffect, useState } from "react";

import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../src/api/api";

export default function ScheduleScreen() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await api.get("/schedules/");

      setSchedules(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        Weekly Schedule 📅
      </Text>

      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 16,
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
              📅 {item.day}
            </Text>

            <Text
              style={{
                marginTop: 5,
                color: "#555",
              }}
            >
              ⏰ {item.time}
            </Text>

            <Text
              style={{
                marginTop: 10,
                color: "#777",
              }}
            >
              {item.description}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
