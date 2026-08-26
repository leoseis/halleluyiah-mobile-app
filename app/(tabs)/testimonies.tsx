import { router } from "expo-router";
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

export default function TestimoniesScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [testimonies, setTestimonies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonies();
  }, []);

  const fetchTestimonies = async () => {
    try {
      const response = await api.get("/testimonies/");
      setTestimonies(response.data);
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
          Loading testimonies...
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
        Testimonies ✨
      </Text>

      <FlatList
        data={testimonies}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/testimony-details",
                params: {
                  testimony: JSON.stringify(item),
                },
              })
            }
            style={({ pressed }) => ({
              backgroundColor: theme.card,
              padding: 20,
              borderRadius: 18,
              marginBottom: 18,
              elevation: 4,
              opacity: pressed ? 0.85 : 1,
            })}
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
                color: theme.secondaryText,
                marginTop: 6,
              }}
            >
              By {item.author}
            </Text>

            <Text
              numberOfLines={3}
              style={{
                marginTop: 12,
                color: theme.secondaryText,
                lineHeight: 22,
              }}
            >
              {item.content}
            </Text>

            <Text
              style={{
                marginTop: 15,
                color: isDark ? "#60a5fa" : "#001f5b",
                fontWeight: "bold",
              }}
            >
              Read More →
            </Text>
          </Pressable>
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
              No testimonies available.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
