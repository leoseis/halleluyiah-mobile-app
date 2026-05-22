import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
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
    <ImageBackground
      source={require("../assets/images/back.png")}
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
      }}
      blurRadius={2}
    >
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.92)",
          borderRadius: 24,
          padding: 24,
        }}
      >
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
              color: "#0d1b4c",
            }}
          >
            HalleluYah Santuary
          </Text>

          <Text
            style={{
              color: "#666",
              marginTop: 6,
              fontSize: 15,
            }}
          >
            Welcome Back 👋
          </Text>
        </View>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{
            backgroundColor: "#fff",
            padding: 16,
            borderRadius: 14,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: "#ddd",
          }}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            backgroundColor: "#fff",
            padding: 16,
            borderRadius: 14,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: "#ddd",
          }}
        />

        <Pressable
          onPress={handleLogin}
          style={{
            backgroundColor: "#001f5b",
            paddingVertical: 16,
            borderRadius: 14,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Login
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
