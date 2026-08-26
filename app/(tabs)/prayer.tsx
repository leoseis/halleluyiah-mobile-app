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
      Alert.alert("Required", "Please enter your prayer request");
      return;
    }

    try {
      setLoading(true);

      await api.post("/prayers/", {
        name,
        request,
        is_anonymous: anonymous,
      });

      Alert.alert("Success 🙏", "Your prayer request has been submitted.");

      setName("");
      setRequest("");
      setAnonymous(false);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Unable to submit prayer request.");
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
          placeholder="Your Name"
          placeholderTextColor={theme.mutedText}
          value={name}
          onChangeText={setName}
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            borderRadius: 12,
            padding: 14,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: theme.border,
            fontSize: 15,
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
