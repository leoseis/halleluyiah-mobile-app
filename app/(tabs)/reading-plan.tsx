import { useEffect, useState } from "react";

import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../src/api/api";

export default function ReadingPlanScreen() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

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

      <FlatList
        data={plans}
        keyExtractor={(item) => item.id.toString()}
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
          </View>
        )}
      />
    </SafeAreaView>
  );
}
