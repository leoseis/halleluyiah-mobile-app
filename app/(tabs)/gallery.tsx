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

export default function GalleryScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      console.log("GALLERY: starting API request");

      setLoading(true);
      setError("");

      const response = await api.get("/gallery/");

      console.log("GALLERY API SUCCESS:", response.data);

      setGallery(response.data);
    } catch (error: any) {
      console.log("GALLERY API FAILED");
      console.log("GALLERY ERROR MESSAGE:", error.message);
      console.log("GALLERY ERROR STATUS:", error.response?.status);

      setGallery([]);

      setError(
        "Unable to load gallery images. Please check your connection and try again.",
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
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={{
            marginTop: 12,
            color: theme.secondaryText,
            fontSize: 15,
          }}
        >
          Loading Gallery...
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
          Unable to Load Gallery
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
          onPress={fetchGallery}
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
          marginVertical: 20,
        }}
      >
        Church Gallery 📸
      </Text>

      <FlatList
        data={gallery}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
          flexGrow: gallery.length === 0 ? 1 : undefined,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: theme.card,
              borderRadius: 16,
              marginBottom: 20,
              overflow: "hidden",
              elevation: 3,
              borderWidth: isDark ? 1 : 0,
              borderColor: theme.border,
            }}
          >
            <Image
              source={{
                uri: item.image,
              }}
              style={{
                width: "100%",
                height: 240,
                backgroundColor: theme.border,
              }}
              resizeMode="cover"
            />

            <View
              style={{
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: theme.text,
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  color: theme.secondaryText,
                  marginTop: 8,
                  lineHeight: 22,
                }}
              >
                {item.description}
              </Text>
            </View>
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
              📸
            </Text>

            <Text
              style={{
                fontSize: 21,
                fontWeight: "bold",
                color: theme.text,
                textAlign: "center",
              }}
            >
              No Gallery Images Available
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
              There are currently no gallery images to display. Please check
              back later.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
