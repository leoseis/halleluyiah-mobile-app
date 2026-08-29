import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function DevotionalScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [devotionals, setDevotionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDevotionals();
  }, []);

  const fetchDevotionals = async () => {
    try {
      console.log("DEVOTIONAL: starting API request");

      setLoading(true);
      setError("");

      const response = await api.get("/devotionals/");

      console.log("DEVOTIONAL API SUCCESS:", response.data);

      setDevotionals(response.data);
    } catch (error: any) {
      console.log("DEVOTIONAL API FAILED");
      console.log("DEVOTIONAL ERROR MESSAGE:", error.message);
      console.log("DEVOTIONAL ERROR STATUS:", error.response?.status);

      setDevotionals([]);

      setError(
        "Unable to load devotionals. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // LOADING STATE
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
            marginTop: 12,
            color: theme.secondaryText,
            fontSize: 15,
          }}
        >
          Loading devotionals...
        </Text>
      </View>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            fontSize: 48,
            marginBottom: 16,
          }}
        >
          📡
        </Text>

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: theme.text,
            textAlign: "center",
          }}
        >
          Unable to Load Devotionals
        </Text>

        <Text
          style={{
            color: theme.secondaryText,
            textAlign: "center",
            marginTop: 10,
            lineHeight: 22,
            fontSize: 15,
          }}
        >
          {error}
        </Text>

        <Pressable
          onPress={fetchDevotionals}
          style={({ pressed }) => ({
            backgroundColor: isDark ? "#8B5CF6" : "#001f5b",
            paddingHorizontal: 30,
            paddingVertical: 14,
            borderRadius: 12,
            marginTop: 24,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text
            style={{
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Try Again
          </Text>
        </Pressable>
      </SafeAreaView>
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
          flexGrow: devotionals.length === 0 ? 1 : undefined,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: theme.card,
              padding: 20,
              borderRadius: 16,
              marginBottom: 20,
              elevation: 3,
              borderWidth: isDark ? 1 : 0,
              borderColor: theme.border,
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
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 30,
            }}
          >
            <Text
              style={{
                fontSize: 46,
                marginBottom: 14,
              }}
            >
              📖
            </Text>

            <Text
              style={{
                fontSize: 21,
                fontWeight: "bold",
                color: theme.text,
                textAlign: "center",
              }}
            >
              No Devotionals Available
            </Text>

            <Text
              style={{
                color: theme.secondaryText,
                fontSize: 15,
                textAlign: "center",
                marginTop: 8,
                lineHeight: 22,
              }}
            >
              There are currently no devotionals to display. Please check back
              later.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
