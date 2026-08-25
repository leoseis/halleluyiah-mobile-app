import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext } from "react";

import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { APP_THEME } from "../../constants/appTheme";
import { AuthContext } from "../../src/context/AuthContext";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);

  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const accountItems = [
    {
      title: "Edit Profile",
      subtitle: "Update your personal information",
      icon: "person-circle-outline",
      color: "#0EA5E9",
      onPress: () => router.push("../edit-profile"),
    },
    {
      title: "Change Password",
      subtitle: "Update your account password",
      icon: "lock-closed-outline",
      color: "#8B5CF6",
      onPress: () => {},
    },
    {
      title: "Notifications",
      subtitle: "Manage notification preferences",
      icon: "notifications-outline",
      color: "#F59E0B",
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
      >
        {/* PAGE TITLE */}
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: theme.text,
            marginBottom: 20,
          }}
        >
          My Profile
        </Text>

        {/* PROFILE CARD */}
        <View
          style={{
            backgroundColor: isDark ? "#172554" : "#001f5b",
            borderRadius: 26,
            padding: 24,
            alignItems: "center",
            elevation: 5,
          }}
        >
          <View
            style={{
              backgroundColor: isDark ? "#e2e8f0" : "#ffffff",
              padding: 4,
              borderRadius: 62,
            }}
          >
            <Image
              source={
                user?.profile_picture
                  ? {
                      uri: `http://192.168.43.206:8000${user.profile_picture}`,
                    }
                  : {
                      uri: "https://i.pravatar.cc/300",
                    }
              }
              style={{
                width: 110,
                height: 110,
                borderRadius: 55,
              }}
            />
          </View>

          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "#ffffff",
              marginTop: 16,
            }}
          >
            {user?.username || "Church Member"}
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: "#dbeafe",
              marginTop: 6,
            }}
          >
            {user?.email || "member@hallelujah.com"}
          </Text>

          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              marginTop: 16,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontWeight: "700",
              }}
            >
              Redeemed Member ✨
            </Text>
          </View>
        </View>

        {/* STATS */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: theme.card,
              paddingVertical: 20,
              borderRadius: 18,
              marginRight: 8,
              alignItems: "center",
              elevation: 2,
            }}
          >
            <Ionicons name="heart" size={26} color="#EF4444" />

            <Text
              style={{
                fontSize: 23,
                fontWeight: "bold",
                color: theme.text,
                marginTop: 8,
              }}
            >
              24
            </Text>

            <Text
              style={{
                color: theme.secondaryText,
                marginTop: 3,
              }}
            >
              Likes
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: theme.card,
              paddingVertical: 20,
              borderRadius: 18,
              marginLeft: 8,
              alignItems: "center",
              elevation: 2,
            }}
          >
            <Ionicons name="chatbubble" size={26} color="#0EA5E9" />

            <Text
              style={{
                fontSize: 23,
                fontWeight: "bold",
                color: theme.text,
                marginTop: 8,
              }}
            >
              12
            </Text>

            <Text
              style={{
                color: theme.secondaryText,
                marginTop: 3,
              }}
            >
              Comments
            </Text>
          </View>
        </View>

        {/* ACCOUNT */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: theme.text,
            marginTop: 28,
            marginBottom: 14,
          }}
        >
          Account
        </Text>

        <View
          style={{
            backgroundColor: theme.card,
            borderRadius: 22,
            paddingHorizontal: 16,
            elevation: 2,
          }}
        >
          {accountItems.map((item, index) => (
            <Pressable
              key={item.title}
              onPress={item.onPress}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 17,
                borderBottomWidth: index === accountItems.length - 1 ? 0 : 1,
                borderBottomColor: theme.border,
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
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.color}
                />
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

        <Text
          style={{
            color: theme.mutedText,
            fontSize: 13,
            textAlign: "center",
            marginTop: 24,
          }}
        >
          Manage logout and application settings from Settings.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
