import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { changePassword, updateProfile } from "../../src/api/auth";
import { AuthContext } from "../../src/context/AuthContext";

export default function EditProfileScreen() {
  const { user, setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phone_number || "");

      if (user.profile_picture) {
        setProfileImage(`http://192.168.43.206:8000${user.profile_picture}`);
      }

      setLoading(false);
    }
  }, [user]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission to access gallery is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);

      console.log("Selected Image:", result.assets[0]);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Update profile
      const updatedUser = await updateProfile({
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        profile_picture: profileImage,
      });

      setUser(updatedUser);

      // Change password if user entered one
      if (oldPassword || newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
          alert("New password and confirm password do not match.");
          return;
        }

        await changePassword({
          old_password: oldPassword,
          new_password: newPassword,
        });

        // Clear password fields after success
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

        alert("Password changed successfully!");
      } else {
        alert("Profile updated successfully!");
      }
    } catch (error: any) {
      console.log(error);

      if (error.response?.data) {
        console.log(error.response.data);
      }

      alert("Unable to save changes.");
    } finally {
      setSaving(false);
    }
  };

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
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 25,
          }}
        >
          EDIT PROFILE TEST
        </Text>

        {/* Profile Picture */}

        <TouchableOpacity
          onPress={pickImage}
          style={{
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : {
                    uri: "https://i.pravatar.cc/300",
                  }
            }
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 2,
              borderColor: "#001f5b",
            }}
          />

          <Text
            style={{
              marginTop: 10,
              color: "#001f5b",
              fontWeight: "600",
            }}
          >
            Change Profile Picture
          </Text>
        </TouchableOpacity>

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

        <Text>Phone Number</Text>

        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 12,
            padding: 14,
            marginBottom: 30,
          }}
        />

        <Text
          style={{
            marginTop: 20,
            marginBottom: 10,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Change Password
        </Text>

        <Text>Current Password</Text>

        <TextInput
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Current Password"
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 12,
            padding: 14,
            marginBottom: 16,
          }}
        />

        <Text>New Password</Text>

        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New Password"
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 12,
            padding: 14,
            marginBottom: 16,
          }}
        />

        <Text>Confirm Password</Text>

        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 12,
            padding: 14,
            marginBottom: 20,
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
      </ScrollView>
    </SafeAreaView>
  );
}
