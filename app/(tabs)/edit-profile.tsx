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

import { APP_THEME } from "../../constants/appTheme";
import { changePassword, updateProfile } from "../../src/api/auth";
import { AuthContext } from "../../src/context/AuthContext";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function EditProfileScreen() {
  const { user, setUser } = useContext(AuthContext);

  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

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

      const updatedUser = await updateProfile({
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        profile_picture: profileImage,
      });

      setUser(updatedUser);

      if (oldPassword || newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
          alert("New password and confirm password do not match.");
          return;
        }

        await changePassword({
          old_password: oldPassword,
          new_password: newPassword,
        });

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
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />

        <Text
          style={{
            marginTop: 10,
            color: theme.secondaryText,
          }}
        >
          Loading profile...
        </Text>
      </SafeAreaView>
    );
  }

  const inputStyle = {
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.card,
    color: theme.text,
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 15,
  };

  const labelStyle = {
    color: theme.text,
    fontWeight: "600" as const,
    marginBottom: 7,
    fontSize: 14,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: theme.text,
            marginBottom: 25,
          }}
        >
          Edit Profile
        </Text>

        {/* PROFILE PICTURE */}
        <TouchableOpacity
          onPress={pickImage}
          activeOpacity={0.8}
          style={{
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <Image
            source={
              profileImage
                ? {
                    uri: profileImage,
                  }
                : {
                    uri: "https://i.pravatar.cc/300",
                  }
            }
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 3,
              borderColor: isDark ? "#60a5fa" : "#001f5b",
              backgroundColor: theme.card,
            }}
          />

          <Text
            style={{
              marginTop: 10,
              color: isDark ? "#60a5fa" : "#001f5b",
              fontWeight: "600",
            }}
          >
            Change Profile Picture
          </Text>
        </TouchableOpacity>

        {/* USERNAME */}
        <Text style={labelStyle}>Username</Text>

        <TextInput
          value={username}
          editable={false}
          style={{
            ...inputStyle,
            backgroundColor: isDark ? "#1e293b" : "#eeeeee",
            color: theme.secondaryText,
            marginBottom: 20,
          }}
        />

        {/* FIRST NAME */}
        <Text style={labelStyle}>First Name</Text>

        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
          placeholderTextColor={theme.mutedText}
          style={inputStyle}
        />

        {/* LAST NAME */}
        <Text style={labelStyle}>Last Name</Text>

        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
          placeholderTextColor={theme.mutedText}
          style={inputStyle}
        />

        {/* EMAIL */}
        <Text style={labelStyle}>Email</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={theme.mutedText}
          keyboardType="email-address"
          autoCapitalize="none"
          style={inputStyle}
        />

        {/* PHONE */}
        <Text style={labelStyle}>Phone Number</Text>

        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          placeholderTextColor={theme.mutedText}
          keyboardType="phone-pad"
          style={{
            ...inputStyle,
            marginBottom: 30,
          }}
        />

        {/* PASSWORD SECTION */}
        <Text
          style={{
            marginTop: 10,
            marginBottom: 15,
            fontSize: 20,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          Change Password
        </Text>

        <Text
          style={{
            color: theme.secondaryText,
            marginBottom: 18,
            lineHeight: 20,
          }}
        >
          Leave these fields empty if you do not want to change your password.
        </Text>

        {/* CURRENT PASSWORD */}
        <Text style={labelStyle}>Current Password</Text>

        <TextInput
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Current Password"
          placeholderTextColor={theme.mutedText}
          secureTextEntry
          style={inputStyle}
        />

        {/* NEW PASSWORD */}
        <Text style={labelStyle}>New Password</Text>

        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New Password"
          placeholderTextColor={theme.mutedText}
          secureTextEntry
          style={inputStyle}
        />

        {/* CONFIRM PASSWORD */}
        <Text style={labelStyle}>Confirm Password</Text>

        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor={theme.mutedText}
          secureTextEntry
          style={{
            ...inputStyle,
            marginBottom: 22,
          }}
        />

        {/* SAVE BUTTON */}
        <Pressable
          onPress={handleSave}
          disabled={saving}
          style={({ pressed }) => ({
            backgroundColor: saving
              ? theme.mutedText
              : pressed
                ? isDark
                  ? "#1d4ed8"
                  : "#00327f"
                : isDark
                  ? "#2563eb"
                  : "#001f5b",

            padding: 16,
            borderRadius: 14,
            alignItems: "center",
            opacity: saving ? 0.7 : 1,
          })}
        >
          <Text
            style={{
              color: "#ffffff",
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
