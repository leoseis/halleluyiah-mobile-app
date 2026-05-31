import { router, useLocalSearchParams } from "expo-router";

import { useState } from "react";

import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import api from "../src/api/api";

export default function EventRegisterScreen() {
  const { eventId, title } = useLocalSearchParams();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [department, setDepartment] = useState("");

  const [loading, setLoading] = useState(false);

  const registerForEvent = async () => {
    if (!name || !email || !phone) {
      Alert.alert("Validation Error", "Name, Email and Phone are required.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/event-registrations/", {
        event: eventId,
        name,
        email,
        phone,
        department,
      });

      Alert.alert(
        "Success",
        "You have successfully registered for this event.",
      );

      router.back();
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#0d1b4c",
            marginBottom: 10,
          }}
        >
          Event Registration
        </Text>

        <Text
          style={{
            color: "#666",
            marginBottom: 30,
          }}
        >
          {title}
        </Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={{
            backgroundColor: "white",
            padding: 14,
            borderRadius: 12,
            marginBottom: 15,
          }}
        />

        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={{
            backgroundColor: "white",
            padding: 14,
            borderRadius: 12,
            marginBottom: 15,
          }}
        />

        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={{
            backgroundColor: "white",
            padding: 14,
            borderRadius: 12,
            marginBottom: 15,
          }}
        />

        <TextInput
          placeholder="Department (Optional)"
          value={department}
          onChangeText={setDepartment}
          style={{
            backgroundColor: "white",
            padding: 14,
            borderRadius: 12,
            marginBottom: 25,
          }}
        />

        <Pressable
          onPress={registerForEvent}
          style={{
            backgroundColor: "#001f5b",
            padding: 16,
            borderRadius: 12,
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
            {loading ? "Submitting..." : "Register Now"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
