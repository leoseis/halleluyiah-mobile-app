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

import api from "../../src/api/api";

export default function PrayerScreen() {
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
            marginBottom: 20,
          }}
        >
          Prayer Request 🙏
        </Text>

        <TextInput
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 14,
            marginBottom: 16,
          }}
        />

        <TextInput
          placeholder="Type your prayer request..."
          value={request}
          onChangeText={setRequest}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 14,
            height: 180,
            marginBottom: 20,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#333",
            }}
          >
            Submit Anonymously
          </Text>

          <Switch value={anonymous} onValueChange={setAnonymous} />
        </View>

        <Pressable
          onPress={submitPrayer}
          disabled={loading}
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
            {loading ? "Submitting..." : "Submit Prayer"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
