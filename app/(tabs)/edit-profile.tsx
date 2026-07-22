import { useContext, useEffect, useState } from "react";

import { ActivityIndicator, Pressable, Text, TextInput } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { updateProfile } from "../../src/api/auth";
import { AuthContext } from "../../src/context/AuthContext";
export default function EditProfileScreen() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [username, setUsername] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");

      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  const handleSave = async () => {
    try {
      setSaving(true);

      const updatedUser = await updateProfile({
        first_name: firstName,
        last_name: lastName,
        email,
      });

      console.log("Updated User:", updatedUser);

      alert("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      alert("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Edit Profile
      </Text>

      <Text>Username</Text>

      <TextInput
        value={username}
        editable={false}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 14,
          borderRadius: 12,
          marginBottom: 20,
          backgroundColor: "#eee",
        }}
      />

      <Text>First Name</Text>

      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First Name"
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 12,
          padding: 14,
          marginBottom: 16,
        }}
      />

      <Text>Last Name</Text>

      <TextInput
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last Name"
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 12,
          padding: 14,
          marginBottom: 16,
        }}
      />

      <Text>Email</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 12,
          padding: 14,
          marginBottom: 16,
        }}
      />

      <Pressable
        onPress={handleSave}
        disabled={saving}
        style={{
          backgroundColor: "#001f5b",
          padding: 16,
          borderRadius: 14,
          alignItems: "center",
          opacity: saving ? 0.7 : 1,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
