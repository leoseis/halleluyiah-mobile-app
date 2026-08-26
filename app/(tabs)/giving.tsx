import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Share,
  Text,
  View,
} from "react-native";

import { Clipboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function GivingScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await api.get("/giving/");
      setAccounts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyAccountNumber = async (accountNumber: string) => {
    Clipboard.setString(accountNumber);

    Alert.alert("Copied", "Account number copied successfully.");
  };

  const shareAccount = async (account: any) => {
    await Share.share({
      message:
        `${account.title}\n\n` +
        `Bank: ${account.bank_name}\n` +
        `Account Name: ${account.account_name}\n` +
        `Account Number: ${account.account_number}`,
    });
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
          Loading giving accounts...
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
        Giving 💝
      </Text>

      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: theme.card,
              borderRadius: 18,
              padding: 20,
              marginBottom: 20,
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: theme.text,
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                marginTop: 10,
                color: theme.secondaryText,
              }}
            >
              🏦 {item.bank_name}
            </Text>

            <Text
              style={{
                marginTop: 6,
                color: theme.secondaryText,
              }}
            >
              👤 {item.account_name}
            </Text>

            <Text
              style={{
                marginTop: 6,
                fontSize: 18,
                fontWeight: "bold",
                color: isDark ? "#86efac" : "#0d1b4c",
              }}
            >
              {item.account_number}
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                gap: 10,
              }}
            >
              <Pressable
                onPress={() => copyAccountNumber(item.account_number)}
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: pressed
                    ? isDark
                      ? "#1d4ed8"
                      : "#00327f"
                    : isDark
                      ? "#2563eb"
                      : "#001f5b",
                  padding: 12,
                  borderRadius: 12,
                  alignItems: "center",
                })}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                >
                  Copy
                </Text>
              </Pressable>

              <Pressable
                onPress={() => shareAccount(item)}
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: pressed ? "#15803d" : "#28a745",
                  padding: 12,
                  borderRadius: 12,
                  alignItems: "center",
                })}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                >
                  Share
                </Text>
              </Pressable>
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
              }}
            >
              No giving account available.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
