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

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function BranchesScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

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
          Loading branches...
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
        Church Branches ⛪
      </Text>

      <FlatList
        data={branches}
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
                  backgroundColor: theme.border,
                }}
                resizeMode="cover"
              />
            )}

            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: theme.text,
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                marginTop: 8,
                color: theme.secondaryText,
              }}
            >
              👨🏽‍💼 Pastor: {item.pastor}
            </Text>

            <Text
              style={{
                marginTop: 5,
                color: theme.secondaryText,
              }}
            >
              📍 {item.address}
            </Text>

            {item.phone && (
              <Pressable
                onPress={() => Linking.openURL(`tel:${item.phone}`)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Text
                  style={{
                    marginTop: 5,
                    color: isDark ? "#60a5fa" : "#001f5b",
                  }}
                >
                  📞 {item.phone}
                </Text>
              </Pressable>
            )}

            {item.map_link && (
              <Pressable
                onPress={() => Linking.openURL(item.map_link)}
                style={({ pressed }) => ({
                  marginTop: 15,
                  backgroundColor: pressed
                    ? isDark
                      ? "#1d4ed8"
                      : "#00327f"
                    : isDark
                      ? "#2563eb"
                      : "#001f5b",
                  padding: 12,
                  borderRadius: 10,
                  alignItems: "center",
                })}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                >
                  Open in Google Maps
                </Text>
              </Pressable>
            )}
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
              No church branches available.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
