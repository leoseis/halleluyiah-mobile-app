import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";

import { BASE_URL } from "../src/api/services/api";
export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account created");
      } else {
        Alert.alert("Error", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Username" onChangeText={setUsername} />

      <TextInput placeholder="Email" onChangeText={setEmail} />

      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Register" onPress={register} />
    </View>
  );

  <Link href="/login">
    <Text
      style={{
        marginTop: 20,
        textAlign: "center",
        color: "blue",
      }}
    >
      Already have an account? Login
    </Text>
  </Link>;
}
