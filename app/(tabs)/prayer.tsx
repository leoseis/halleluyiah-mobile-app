import { useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { APP_THEME } from "../../constants/appTheme";
import api from "../../src/api/api";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function PrayerScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitPrayer = async () => {
    if (!request.trim()) {
      Alert.alert(
        "Prayer Request Required",
        "Please enter your prayer request.",
      );
      return;
    }

    try {
      setLoading(true);

      console.log("PRAYER: starting submission");

      const payload = {
        name: anonymous ? "" : name.trim(),
        request: request.trim(),
        is_anonymous: anonymous,
      };

      const response = await api.post("/prayers/", payload);

      console.log("PRAYER SUBMISSION SUCCESS:", response.data);

      Alert.alert(
        "Success 🙏",
        "Your prayer request has been submitted successfully.",
      );

      setName("");
      setRequest("");
      setAnonymous(false);
    } catch (error: any) {
      console.log("PRAYER SUBMISSION FAILED");
      console.log("PRAYER ERROR MESSAGE:", error.message);
      console.log("PRAYER ERROR STATUS:", error.response?.status);
      console.log("PRAYER ERROR RESPONSE:", error.response?.data);

      // Network / backend unavailable
      if (!error.response) {
        Alert.alert(
          "Connection Error",
          "Unable to connect to the server. Please check your connection and try again.",
        );
      }

      // Validation problem from Django
      else if (error.response?.status === 400) {
        Alert.alert(
          "Submission Failed",
          "Please check the prayer request information and try again.",
        );
      }

      // Authentication issue
      else if (error.response?.status === 401) {
        Alert.alert(
          "Session Expired",
          "Your session has expired. Please log in again.",
        );
      }

      // Permission issue
      else if (error.response?.status === 403) {
        Alert.alert(
          "Permission Denied",
          "You do not have permission to submit this prayer request.",
        );
      }

      // Server error
      else if (error.response?.status >= 500) {
        Alert.alert(
          "Server Error",
          "The server is currently unable to process your request. Please try again later.",
        );
      }

      // Other unexpected errors
      else {
        Alert.alert(
          "Submission Failed",
          "Something went wrong while submitting your prayer request. Please try again.",
        );
      }
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
            marginBottom: 8,
          }}
        >
          Prayer Request 🙏
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: theme.secondaryText,
            marginBottom: 24,
          }}
        >
          Share your prayer request with the church prayer team.
        </Text>

        {/* NAME INPUT */}
        <TextInput
          placeholder={
            anonymous ? "Name hidden for anonymous request" : "Your Name"
          }
          placeholderTextColor={theme.mutedText}
          value={anonymous ? "" : name}
          onChangeText={setName}
          editable={!anonymous && !loading}
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            borderRadius: 12,
            padding: 14,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: theme.border,
            fontSize: 15,
            opacity: anonymous ? 0.6 : 1,
          }}
        />

        {/* PRAYER REQUEST */}
        <TextInput
          placeholder="Type your prayer request..."
          placeholderTextColor={theme.mutedText}
          value={request}
          onChangeText={setRequest}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          editable={!loading}
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            borderRadius: 12,
            padding: 14,
            height: 180,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: theme.border,
            fontSize: 15,
          }}
        />

        {/* ANONYMOUS OPTION */}
        <View
          style={{
            backgroundColor: theme.card,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
            borderRadius: 14,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <View
            style={{
              flex: 1,
              marginRight: 12,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: theme.text,
              }}
            >
              Submit Anonymously
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: theme.secondaryText,
                marginTop: 3,
              }}
            >
              Your name will not be shown with the request.
            </Text>
          </View>

          <Switch
            value={anonymous}
            onValueChange={setAnonymous}
            disabled={loading}
            trackColor={{
              false: "#d1d5db",
              true: "#2563eb",
            }}
            thumbColor="#ffffff"
          />
        </View>

        {/* SUBMIT BUTTON */}
        <Pressable
          onPress={submitPrayer}
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
            {loading ? "Submitting..." : "Submit Prayer"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
