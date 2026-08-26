import { useEffect, useState } from "react";

import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function GalleryScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await api.get("/gallery/");
      setGallery(response.data);
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
          Loading Gallery...
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
        Church Gallery 📸
      </Text>

      <FlatList
        data={gallery}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: theme.card,
              borderRadius: 16,
              marginBottom: 20,
              overflow: "hidden",
              elevation: 3,
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
              No gallery images available.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
