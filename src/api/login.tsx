import React, { useState } from "react";
import {
    Alert,
    Pressable,
    SafeAreaView,
    Text,
    TextInput
} from "react-native";

import { loginUser } from "../src/api/auth";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await loginUser(username, password);

      Alert.alert("Success", "Login successful");
    } catch (error) {
      Alert.alert("Error", "Invalid credentials");
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
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 30,
          textAlign: "center",
        }}
      >
        RCCG Login
      </Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 12,
          marginBottom: 15,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: "white",
          padding: 15,
          borderRadius: 12,
          marginBottom: 20,
        }}
      />

      <Pressable
        onPress={handleLogin}
        style={{
          backgroundColor: "#0d1b4c",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Login
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
