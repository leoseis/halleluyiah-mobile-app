import { useEffect, useState } from "react";

import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function DevotionalScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [devotionals, setDevotionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevotionals();
  }, []);

  const fetchDevotionals = async () => {
    try {
      const response = await api.get("/devotionals/");

      setDevotionals(response.data);
    } catch (error) {
      console.log("Devotional fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // LOADING SCREEN
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
        <ActivityIndicator
          size="large"
          color={isDark ? "#8B5CF6" : "#001f5b"}
        />

        <Text
          style={{
            marginTop: 10,
            color: theme.secondaryText,
          }}
        >
          Loading devotionals...
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
      {/* PAGE TITLE */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: theme.text,
          marginVertical: 20,
        }}
      >
        Daily Devotional 📖
      </Text>

      {/* DEVOTIONAL LIST */}
      <FlatList
        data={devotionals}
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
              marginBottom: 20,
              elevation: 3,
            }}
          >
            {/* DEVOTIONAL TITLE */}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: isDark ? "#c4b5fd" : "#001f5b",
              }}
            >
              {item.title}
            </Text>

            {/* BIBLE VERSE */}
            <Text
              style={{
                marginTop: 8,
                fontStyle: "italic",
                color: theme.secondaryText,
                fontSize: 14,
              }}
            >
              {item.bible_verse}
            </Text>

            {/* DEVOTIONAL MESSAGE */}
            <Text
              numberOfLines={4}
              style={{
                marginTop: 15,
                color: theme.text,
                fontSize: 15,
                lineHeight: 23,
              }}
            >
              {item.message}
            </Text>
          </View>
        )}
        // EMPTY STATE
        ListEmptyComponent={
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 50,
            }}
          >
            <Text
              style={{
                color: theme.secondaryText,
                fontSize: 15,
              }}
            >
              No devotionals available.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
