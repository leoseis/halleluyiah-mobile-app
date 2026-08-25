import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext } from "react";

import { Alert, Pressable, ScrollView, Switch, Text, View } from "react-native";

import { APP_THEME } from "../../constants/appTheme";
import { AuthContext } from "../../src/context/AuthContext";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);

  const { themeMode, isDark, setThemeMode } = useAppTheme();

  const theme = APP_THEME[isDark ? "dark" : "light"];

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
        backgroundColor: theme.background,
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
          color: theme.text,
          marginBottom: 6,
        }}
      >
        Settings
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: theme.secondaryText,
          marginBottom: 24,
        }}
      >
        Manage your app and church information
      </Text>

      {/* APPEARANCE CARD */}
      <View
        style={{
          backgroundColor: theme.card,
          borderRadius: 22,
          padding: 16,
          marginBottom: 20,
          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* ICON */}
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              backgroundColor: isDark ? "#374151" : "#e0ecff",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 14,
            }}
          >
            <Ionicons
              name={isDark ? "moon-outline" : "sunny-outline"}
              size={24}
              color={isDark ? "#facc15" : "#0EA5E9"}
            />
          </View>

          {/* TEXT */}
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: theme.text,
              }}
            >
              Dark Mode
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: theme.secondaryText,
                marginTop: 3,
              }}
            >
              Use a darker appearance
            </Text>
          </View>

          {/* SWITCH */}
          <Switch
            value={themeMode === "dark"}
            onValueChange={(value) => setThemeMode(value ? "dark" : "light")}
            trackColor={{
              false: "#d1d5db",
              true: "#2563eb",
            }}
            thumbColor="#ffffff"
          />
        </View>
      </View>

      {/* SETTINGS CARD */}
      <View
        style={{
          backgroundColor: theme.card,
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
              borderBottomColor: theme.border,
            }}
          >
            {/* ICON */}
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

            {/* TEXT */}
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: theme.text,
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  color: theme.secondaryText,
                  marginTop: 3,
                }}
              >
                {item.subtitle}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.mutedText}
            />
          </Pressable>
        ))}
      </View>

      {/* LOGOUT */}
      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => ({
          backgroundColor: isDark ? "#3f1d24" : "#fee2e2",
          paddingVertical: 16,
          borderRadius: 18,
          marginTop: 28,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <Ionicons
          name="log-out-outline"
          size={22}
          color={isDark ? "#f87171" : "#dc2626"}
        />

        <Text
          style={{
            color: isDark ? "#f87171" : "#dc2626",
            fontWeight: "bold",
            fontSize: 16,
            marginLeft: 8,
          }}
        >
          Logout
        </Text>
      </Pressable>

      {/* FOOTER */}
      <Text
        style={{
          textAlign: "center",
          color: theme.mutedText,
          fontSize: 12,
          marginTop: 18,
        }}
      >
        RCCG HalleluYah Parish Mobile App
      </Text>
    </ScrollView>
  );
}
