import { useEffect, useState } from "react";

import {
    ActivityIndicator,
    FlatList,
    Image,
    Linking,
    Pressable,
    Text,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../src/api/api";

export default function BranchesScreen() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await api.get("/branches/");
      setBranches(response.data);
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
        Church Branches ⛪
      </Text>

      <FlatList
        data={branches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 18,
              marginBottom: 16,
              elevation: 3,
            }}
          >
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={{
                  width: "100%",
                  height: 180,
                  borderRadius: 12,
                  marginBottom: 15,
                }}
                resizeMode="cover"
              />
            )}

            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#001f5b",
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                marginTop: 8,
                color: "#555",
              }}
            >
              👨🏽‍💼 Pastor: {item.pastor}
            </Text>

            <Text
              style={{
                marginTop: 5,
                color: "#555",
              }}
            >
              📍 {item.address}
            </Text>

            {item.phone && (
              <Text
                style={{
                  marginTop: 5,
                  color: "#555",
                }}
              >
                📞 {item.phone}
              </Text>
            )}

            {item.map_link && (
              <Pressable
                onPress={() => Linking.openURL(item.map_link)}
                style={{
                  marginTop: 15,
                  backgroundColor: "#001f5b",
                  padding: 12,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Open in Google Maps
                </Text>
              </Pressable>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
