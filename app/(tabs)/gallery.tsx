import { useEffect, useState } from "react";

import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../src/api/api";

export default function GalleryScreen() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await api.get("/gallery/");

      console.log(response.data);

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
        }}
      >
        <ActivityIndicator size="large" />

        <Text
          style={{
            marginTop: 10,
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
        Church Gallery 📸
      </Text>

      <FlatList
        data={gallery}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
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
                  color: "#001f5b",
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  color: "#666",
                  marginTop: 8,
                  lineHeight: 22,
                }}
              >
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
