import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";

import api from "../src/api/api";
import { AuthContext } from "../src/context/AuthContext";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/token/", {
        username,
        password,
      });

      const access = response.data.access;

      const refresh = response.data.refresh;

      await AsyncStorage.setItem("refresh", refresh);

      await login(access);

      router.push("/(tabs)");
    } catch (error) {
      console.log(error);

      Alert.alert("Login Failed", "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f5f7fb",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 25,
            color: "#0d1b4c",
            textAlign: "center",
          }}
        >
          RCCG Login
        </Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderColor: "#d1d5db",
            borderRadius: 12,
            padding: 14,
            marginBottom: 15,
          }}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            borderWidth: 1,
            borderColor: "#d1d5db",
            borderRadius: 12,
            padding: 14,
            marginBottom: 20,
          }}
        />

        <Pressable
          disabled={loading}
          onPress={handleLogin}
          style={{
            backgroundColor: "#0d1b4c",
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          )}
        </Pressable>

        <Link href="/register" asChild>
          <Pressable>
            <Text
              style={{
                marginTop: 20,
                textAlign: "center",
                color: "#2563eb",
                fontWeight: "600",
              }}
            >
              Don't have an account? Register
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
