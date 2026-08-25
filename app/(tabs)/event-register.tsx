import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import { Alert, Pressable, ScrollView, Text, TextInput } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function EventRegisterScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

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
        backgroundColor: theme.background,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
      >
        {/* TITLE */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: theme.text,
            marginBottom: 10,
          }}
        >
          Event Registration
        </Text>

        {/* EVENT TITLE */}
        <Text
          style={{
            color: theme.secondaryText,
            marginBottom: 30,
            fontSize: 15,
          }}
        >
          {title}
        </Text>

        {/* FULL NAME */}
        <TextInput
          placeholder="Full Name"
          placeholderTextColor={theme.mutedText}
          value={name}
          onChangeText={setName}
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            padding: 14,
            borderRadius: 12,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: theme.border,
            fontSize: 15,
          }}
        />

        {/* EMAIL */}
        <TextInput
          placeholder="Email Address"
          placeholderTextColor={theme.mutedText}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            padding: 14,
            borderRadius: 12,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: theme.border,
            fontSize: 15,
          }}
        />

        {/* PHONE */}
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor={theme.mutedText}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            padding: 14,
            borderRadius: 12,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: theme.border,
            fontSize: 15,
          }}
        />

        {/* DEPARTMENT */}
        <TextInput
          placeholder="Department (Optional)"
          placeholderTextColor={theme.mutedText}
          value={department}
          onChangeText={setDepartment}
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            padding: 14,
            borderRadius: 12,
            marginBottom: 25,
            borderWidth: 1,
            borderColor: theme.border,
            fontSize: 15,
          }}
        />

        {/* REGISTER BUTTON */}
        <Pressable
          onPress={registerForEvent}
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

            padding: 16,
            borderRadius: 12,
            alignItems: "center",
            opacity: loading ? 0.7 : 1,
          })}
        >
          <Text
            style={{
              color: "#ffffff",
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
