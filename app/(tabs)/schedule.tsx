import { useEffect, useState } from "react";

import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function ScheduleScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

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
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={{
            marginTop: 10,
            color: theme.secondaryText,
          }}
        >
          Loading schedule...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: theme.text,
          marginVertical: 20,
        }}
      >
        Weekly Schedule 📅
      </Text>

      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: theme.card,
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
                color: theme.text,
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                marginTop: 8,
                color: theme.secondaryText,
              }}
            >
              📅 {item.day}
            </Text>

            <Text
              style={{
                marginTop: 5,
                color: theme.secondaryText,
              }}
            >
              ⏰ {item.time}
            </Text>

            <Text
              style={{
                marginTop: 10,
                color: theme.secondaryText,
                lineHeight: 22,
              }}
            >
              {item.description}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View
            style={{
              alignItems: "center",
              paddingVertical: 50,
            }}
          >
            <Text
              style={{
                color: theme.secondaryText,
                fontSize: 15,
              }}
            >
              No service schedule available.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
