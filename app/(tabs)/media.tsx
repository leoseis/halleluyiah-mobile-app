import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

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
  const [error, setError] = useState("");

  const fetchSermons = async () => {
    try {
      console.log("MEDIA: starting sermon API request");

      setLoading(true);
      setError("");

      const response = await api.get("/sermons/");

      console.log("MEDIA SERMONS SUCCESS:", response.data);

      setSermons(response.data);
    } catch (error: any) {
      console.log("MEDIA SERMON FETCH FAILED");
      console.log("MEDIA ERROR MESSAGE:", error.message);
      console.log("MEDIA ERROR STATUS:", error.response?.status);
      console.log("MEDIA ERROR RESPONSE:", error.response?.data);

      setSermons([]);

      if (!error.response) {
        setError(
          "Unable to connect to the server. Please check your connection and try again.",
        );
      } else if (error.response?.status >= 500) {
        setError(
          "The server is currently unable to load sermons. Please try again later.",
        );
      } else {
        setError("Unable to load sermons. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /*
   * Refresh sermons whenever Media screen
   * comes back into focus.
   */
  useFocusEffect(
    useCallback(() => {
      fetchSermons();
    }, []),
  );

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
          Unable to Load Sermons
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
          onPress={fetchSermons}
          style={({ pressed }) => ({
            backgroundColor: isDark ? "#2563eb" : "#001f5b",
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
          flexGrow: sermons.length === 0 ? 1 : undefined,
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

              borderWidth: isDark ? 1 : 0,
              borderColor: theme.border,
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

              {item.pastor && (
                <Text
                  style={{
                    fontSize: 15,
                    color: theme.secondaryText,
                    marginBottom: 16,
                  }}
                >
                  Pastor {item.pastor}
                </Text>
              )}

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
              🎥
            </Text>

            <Text
              style={{
                fontSize: 21,
                fontWeight: "bold",
                color: theme.text,
                textAlign: "center",
              }}
            >
              No Sermons Available
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
              There are currently no sermons available. Please check back later.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
