import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext } from "react";

import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import { AuthContext } from "../../src/context/AuthContext";

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/login");
        },
      },
    ]);
  };

  const settingsItems = [
    {
      title: "About Church",
      subtitle: "Learn more about RCCG HalleluYah Parish",
      icon: "business-outline",
      color: "#0EA5E9",
      route: "/about-church",
    },
    {
      title: "Contact Us",
      subtitle: "Reach the church office",
      icon: "call-outline",
      color: "#10B981",
      route: "/contact-us",
    },
    {
      title: "Social Media",
      subtitle: "Connect with us online",
      icon: "globe-outline",
      color: "#8B5CF6",
      route: "/social-media",
    },
    {
      title: "App Version",
      subtitle: "View application information",
      icon: "information-circle-outline",
      color: "#F59E0B",
      route: "/app-version",
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f5f7fb",
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
    >
      {/* TITLE */}
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#001f5b",
          marginBottom: 6,
        }}
      >
        Settings
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: "#6b7280",
          marginBottom: 24,
        }}
      >
        Manage your app and church information
      </Text>

      {/* SETTINGS CARD */}
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 22,
          paddingHorizontal: 16,
          elevation: 3,
        }}
      >
        {settingsItems.map((item, index) => (
          <Pressable
            key={item.title}
            onPress={() => router.push(item.route as any)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 17,
              borderBottomWidth: index === settingsItems.length - 1 ? 0 : 1,
              borderBottomColor: "#f1f5f9",
            }}
          >
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                backgroundColor: `${item.color}18`,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 14,
              }}
            >
              <Ionicons name={item.icon as any} size={24} color={item.color} />
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  color: "#6b7280",
                  marginTop: 3,
                }}
              >
                {item.subtitle}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </Pressable>
        ))}
      </View>

      {/* LOGOUT */}
      <Pressable
        onPress={handleLogout}
        style={{
          backgroundColor: "#fee2e2",
          paddingVertical: 16,
          borderRadius: 18,
          marginTop: 28,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="log-out-outline" size={22} color="#dc2626" />

        <Text
          style={{
            color: "#dc2626",
            fontWeight: "bold",
            fontSize: 16,
            marginLeft: 8,
          }}
        >
          Logout
        </Text>
      </Pressable>

      <Text
        style={{
          textAlign: "center",
          color: "#94a3b8",
          fontSize: 12,
          marginTop: 18,
        }}
      >
        RCCG HalleluYah Parish Mobile App
      </Text>
    </ScrollView>
  );
}
