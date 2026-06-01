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

import api from "../../src/api/api";

export default function GivingScreen() {
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

  const copyAccountNumber = async (
    accountNumber: string
  ) => {
    Clipboard.setString(accountNumber);

    Alert.alert(
      "Copied",
      "Account number copied successfully."
    );
  };

  const shareAccount = async (
    account: any
  ) => {
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
          color: "#0d1b4c",
          marginVertical: 20,
        }}
      >
        Giving 💝
      </Text>

      <FlatList
        data={accounts}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
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
                color: "#001f5b",
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                marginTop: 10,
                color: "#555",
              }}
            >
              🏦 {item.bank_name}
            </Text>

            <Text
              style={{
                marginTop: 6,
                color: "#555",
              }}
            >
              👤 {item.account_name}
            </Text>

            <Text
              style={{
                marginTop: 6,
                fontSize: 18,
                fontWeight: "bold",
                color: "#0d1b4c",
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
                onPress={() =>
                  copyAccountNumber(
                    item.account_number
                  )
                }
                style={{
                  flex: 1,
                  backgroundColor: "#001f5b",
                  padding: 12,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Copy
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  shareAccount(item)
                }
                style={{
                  flex: 1,
                  backgroundColor: "#28a745",
                  padding: 12,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Share
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}