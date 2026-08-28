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

import { APP_THEME } from "../constants/appTheme";
import api from "../src/api/api";
import { useAppTheme } from "../src/context/ThemeContext";

export default function RegisterScreen() {
  // DARK MODE
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  // FORM STATE
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
        backgroundColor: theme.background,
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
        showsVerticalScrollIndicator={false}
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
              color: theme.text,
            }}
          >
            Create Account
          </Text>

          <Text
            style={{
              marginTop: 8,
              fontSize: 15,
              color: theme.secondaryText,
              lineHeight: 22,
            }}
          >
            Register to connect with RCCG HalleluYah Parish.
          </Text>
        </View>

        {/* FORM CARD */}
        <View
          style={{
            backgroundColor: theme.card,
            padding: 20,
            borderRadius: 22,
            elevation: 3,
          }}
        >
          {/* USERNAME */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: theme.text,
              marginBottom: 7,
            }}
          >
            Username
          </Text>

          <TextInput
            placeholder="Enter username"
            placeholderTextColor={theme.mutedText}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            editable={!loading}
            style={{
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: isDark ? "#111827" : "#f8fafc",
              paddingHorizontal: 14,
              paddingVertical: 14,
              borderRadius: 12,
              fontSize: 16,
              color: theme.text,
              marginBottom: 18,
            }}
          />

          {/* EMAIL */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: theme.text,
              marginBottom: 7,
            }}
          >
            Email Address
          </Text>

          <TextInput
            placeholder="Enter email address"
            placeholderTextColor={theme.mutedText}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
            style={{
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: isDark ? "#111827" : "#f8fafc",
              paddingHorizontal: 14,
              paddingVertical: 14,
              borderRadius: 12,
              fontSize: 16,
              color: theme.text,
              marginBottom: 18,
            }}
          />

          {/* PASSWORD */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: theme.text,
              marginBottom: 7,
            }}
          >
            Password
          </Text>

          <TextInput
            placeholder="Create password"
            placeholderTextColor={theme.mutedText}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
            style={{
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: isDark ? "#111827" : "#f8fafc",
              paddingHorizontal: 14,
              paddingVertical: 14,
              borderRadius: 12,
              fontSize: 16,
              color: theme.text,
              marginBottom: 22,
            }}
          />

          {/* REGISTER BUTTON */}
          <Pressable
            onPress={register}
            disabled={loading}
            style={({ pressed }) => ({
              backgroundColor: loading
                ? theme.mutedText
                : pressed
                  ? isDark
                    ? "#1d4ed8"
                    : "#00327f"
                  : isDark
                    ? "#2563eb"
                    : "#001f5b",

              paddingVertical: 16,
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
              minHeight: 52,
              opacity: loading ? 0.75 : 1,
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
          style={({ pressed }) => ({
            marginTop: 24,
            alignItems: "center",
            opacity: pressed ? 0.65 : 1,
          })}
        >
          <Text
            style={{
              color: theme.secondaryText,
              fontSize: 14,
            }}
          >
            Already have an account?{" "}
            <Text
              style={{
                color: isDark ? "#60a5fa" : "#001f5b",
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
