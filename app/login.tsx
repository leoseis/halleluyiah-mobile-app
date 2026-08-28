import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useContext, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { APP_THEME } from "../constants/appTheme";
import api from "../src/api/api";
import { AuthContext } from "../src/context/AuthContext";
import { useAppTheme } from "../src/context/ThemeContext";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  // DARK MODE
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/token/", {
        username: username.trim(),
        password,
      });

      const access = response.data.access;
      const refresh = response.data.refresh;

      await AsyncStorage.setItem("refresh", refresh);

      await login(access);

      router.push("/(tabs)");
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      Alert.alert("Login Failed", "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/back.png")}
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
      }}
      blurRadius={2}
    >
      {/* DARK OVERLAY */}
      {isDark && (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.48)",
          }}
        />
      )}

      {/* LOGIN CARD */}
      <View
        style={{
          backgroundColor: isDark
            ? "rgba(17,24,39,0.96)"
            : "rgba(255,255,255,0.94)",
          borderRadius: 24,
          padding: 24,
          borderWidth: isDark ? 1 : 0,
          borderColor: theme.border,
        }}
      >
        {/* HEADER */}
        <View
          style={{
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Image
            source={require("../assets/images/reed.png")}
            style={{
              width: 78,
              height: 78,
              resizeMode: "contain",
              marginBottom: 12,
            }}
          />

          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: theme.text,
              textAlign: "center",
            }}
          >
            HalleluYah Santuary
          </Text>

          <Text
            style={{
              color: theme.secondaryText,
              marginTop: 6,
              fontSize: 15,
            }}
          >
            Welcome Back 👋
          </Text>
        </View>

        {/* USERNAME */}
        <TextInput
          placeholder="Username"
          placeholderTextColor={theme.mutedText}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          editable={!loading}
          style={{
            backgroundColor: isDark ? "#111827" : "#ffffff",
            color: theme.text,
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderRadius: 14,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: theme.border,
            fontSize: 16,
          }}
        />

        {/* PASSWORD */}
        <TextInput
          placeholder="Password"
          placeholderTextColor={theme.mutedText}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!loading}
          style={{
            backgroundColor: isDark ? "#111827" : "#ffffff",
            color: theme.text,
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderRadius: 14,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: theme.border,
            fontSize: 16,
          }}
        />

        {/* LOGIN BUTTON */}
        <Pressable
          onPress={handleLogin}
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
            opacity: loading ? 0.8 : 1,
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
              Login
            </Text>
          )}
        </Pressable>
      </View>

      {/* REGISTER LINK */}
      <Pressable
        onPress={() => router.push("/register")}
        disabled={loading}
        style={({ pressed }) => ({
          marginTop: 20,
          alignItems: "center",
          opacity: pressed ? 0.65 : 1,
        })}
      >
        <Text
          style={{
            color: isDark ? "#93c5fd" : "#1d4ed8",
            fontWeight: "600",
            fontSize: 15,
          }}
        >
          Don't have an account? Register
        </Text>
      </Pressable>
    </ImageBackground>
  );
}
