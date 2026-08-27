import { router } from "expo-router";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function MediaScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [sermons, setSermons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      const response = await api.get("/sermons/");

      setSermons(response.data);
    } catch (error) {
      console.log("Media sermon fetch error:", error);
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
            fontSize: 16,
            color: theme.secondaryText,
          }}
        >
          Loading sermons...
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
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        Media 🎥
      </Text>

      <FlatList
        data={sermons}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/sermon-details",
                params: {
                  id: item.id.toString(),
                },
              })
            }
            style={({ pressed }) => ({
              backgroundColor: theme.card,
              borderRadius: 18,
              marginBottom: 20,
              overflow: "hidden",

              shadowColor: "#000",
              shadowOpacity: isDark ? 0.2 : 0.08,
              shadowRadius: 8,
              shadowOffset: {
                width: 0,
                height: 4,
              },

              elevation: 4,
              opacity: pressed ? 0.88 : 1,
            })}
          >
            {item.thumbnail ? (
              <Image
                source={{
                  uri: item.thumbnail,
                }}
                style={{
                  width: "100%",
                  height: 220,
                  backgroundColor: theme.border,
                }}
                resizeMode="cover"
              />
            ) : null}

            <View
              style={{
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: theme.text,
                  marginBottom: 8,
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  color: theme.secondaryText,
                  marginBottom: 16,
                }}
              >
                Pastor {item.pastor}
              </Text>

              <View
                style={{
                  backgroundColor: isDark ? "#2563eb" : "#001f5b",
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  Tap To View Sermon
                </Text>
              </View>
            </View>
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
              }}
            >
              No media available.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
