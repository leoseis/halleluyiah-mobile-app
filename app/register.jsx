import { router } from "expo-router";
import { useState } from "react";

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import api from "../src/api/api";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter your username, email and password.",
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register/", {
        username: username.trim(),
        email: email.trim(),
        password,
      });

      console.log("REGISTER SUCCESS:", response.data);

      Alert.alert(
        "Account Created",
        "Your account was created successfully. You can now login.",
        [
          {
            text: "Login",
            onPress: () => router.replace("/login"),
          },
        ],
      );

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      console.log("REGISTER ERROR DATA:", error.response?.data);

      const data = error.response?.data;

      const message =
        data?.username?.[0] ||
        data?.email?.[0] ||
        data?.password?.[0] ||
        data?.detail ||
        "Unable to create account.";

      Alert.alert("Registration Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 24,
          paddingVertical: 40,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View
          style={{
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#001f5b",
            }}
          >
            Create Account
          </Text>

          <Text
            style={{
              marginTop: 8,
              fontSize: 15,
              color: "#6b7280",
              lineHeight: 22,
            }}
          >
            Register to connect with RCCG HalleluYah Parish.
          </Text>
        </View>

        {/* FORM CARD */}
        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 20,
            borderRadius: 22,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#374151",
              marginBottom: 7,
            }}
          >
            Username
          </Text>

          <TextInput
            placeholder="Enter username"
            placeholderTextColor="#94a3b8"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            editable={!loading}
            style={{
              borderWidth: 1,
              borderColor: "#e5e7eb",
              backgroundColor: "#f8fafc",
              paddingHorizontal: 14,
              paddingVertical: 14,
              borderRadius: 12,
              fontSize: 16,
              color: "#111827",
              marginBottom: 18,
            }}
          />

          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#374151",
              marginBottom: 7,
            }}
          >
            Email Address
          </Text>

          <TextInput
            placeholder="Enter email address"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
            style={{
              borderWidth: 1,
              borderColor: "#e5e7eb",
              backgroundColor: "#f8fafc",
              paddingHorizontal: 14,
              paddingVertical: 14,
              borderRadius: 12,
              fontSize: 16,
              color: "#111827",
              marginBottom: 18,
            }}
          />

          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#374151",
              marginBottom: 7,
            }}
          >
            Password
          </Text>

          <TextInput
            placeholder="Create password"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
            style={{
              borderWidth: 1,
              borderColor: "#e5e7eb",
              backgroundColor: "#f8fafc",
              paddingHorizontal: 14,
              paddingVertical: 14,
              borderRadius: 12,
              fontSize: 16,
              color: "#111827",
              marginBottom: 22,
            }}
          />

          {/* REGISTER BUTTON */}
          <Pressable
            onPress={register}
            disabled={loading}
            style={({ pressed }) => ({
              backgroundColor: loading
                ? "#94a3b8"
                : pressed
                  ? "#00327f"
                  : "#001f5b",

              paddingVertical: 16,
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
              minHeight: 52,
            })}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text
                style={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Create Account
              </Text>
            )}
          </Pressable>
        </View>

        {/* LOGIN LINK */}
        <Pressable
          onPress={() => router.replace("/login")}
          style={{
            marginTop: 24,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#6b7280",
              fontSize: 14,
            }}
          >
            Already have an account?{" "}
            <Text
              style={{
                color: "#001f5b",
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
