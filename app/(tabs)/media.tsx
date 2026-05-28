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

import api from "../../src/api/api";

export default function MediaScreen() {
  const [sermons, setSermons] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      const response = await api.get("/sermons/");

      console.log(response.data);

      setSermons(response.data);
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
            fontSize: 16,
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
        backgroundColor: "#f5f7fb",
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#0d1b4c",
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        Sermons 🎥
      </Text>

      <FlatList
        data={sermons}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/sermon-details",
                params: {
                  sermon: JSON.stringify(item),
                },
              })
            }
            style={{
              backgroundColor: "white",
              borderRadius: 18,
              marginBottom: 20,
              overflow: "hidden",

              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 8,
              shadowOffset: {
                width: 0,
                height: 4,
              },

              elevation: 4,
            }}
          >
            {/* THUMBNAIL */}
            <Image
              source={{
                uri: item.thumbnail,
              }}
              style={{
                width: "100%",
                height: 220,
              }}
              resizeMode="cover"
            />

            {/* CONTENT */}
            <View
              style={{
                padding: 16,
              }}
            >
              {/* TITLE */}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#0d1b4c",
                  marginBottom: 8,
                }}
              >
                {item.title}
              </Text>

              {/* PASTOR */}
              <Text
                style={{
                  fontSize: 15,
                  color: "#666",
                  marginBottom: 16,
                }}
              >
                Pastor {item.pastor}
              </Text>

              {/* BUTTON */}
              <View
                style={{
                  backgroundColor: "#001f5b",
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
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
      />
    </SafeAreaView>
  );
}
