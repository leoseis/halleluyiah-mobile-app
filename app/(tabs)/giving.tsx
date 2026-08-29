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
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      console.log("GIVING: starting API request");

      setLoading(true);
      setError("");

      const response = await api.get("/giving/");

      console.log("GIVING API SUCCESS:", response.data);

      setAccounts(response.data);
    } catch (error: any) {
      console.log("GIVING API FAILED");
      console.log("GIVING ERROR MESSAGE:", error.message);
      console.log("GIVING ERROR STATUS:", error.response?.status);

      setAccounts([]);

      setError(
        "Unable to load giving accounts. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const copyAccountNumber = async (accountNumber: string) => {
    Clipboard.setString(accountNumber);

    Alert.alert("Copied", "Account number copied successfully.");
  };

  const shareAccount = async (account: any) => {
    try {
      await Share.share({
        message:
          `${account.title}\n\n` +
          `Bank: ${account.bank_name}\n` +
          `Account Name: ${account.account_name}\n` +
          `Account Number: ${account.account_number}`,
      });
    } catch (error) {
      console.log("SHARE ERROR:", error);

      Alert.alert("Share Failed", "Unable to share this account information.");
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
          Loading giving accounts...
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
          Unable to Load Giving Accounts
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
          onPress={fetchAccounts}
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
        Giving 💝
      </Text>

      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
          flexGrow: accounts.length === 0 ? 1 : undefined,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: theme.card,
              borderRadius: 18,
              padding: 20,
              marginBottom: 20,
              elevation: 4,
              borderWidth: isDark ? 1 : 0,
              borderColor: theme.border,
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
              💝
            </Text>

            <Text
              style={{
                fontSize: 21,
                fontWeight: "bold",
                color: theme.text,
                textAlign: "center",
              }}
            >
              No Giving Accounts Available
            </Text>

            <Text
              style={{
                color: theme.secondaryText,
                textAlign: "center",
                marginTop: 8,
                lineHeight: 22,
                fontSize: 15,
              }}
            >
              There are currently no giving accounts to display. Please check
              back later.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
