import { Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";

import { APP_THEME } from "../constants/appTheme";
import { useAppTheme } from "../src/context/ThemeContext";

export default function SocialMediaScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const socialItems = [
    {
      name: "Facebook",
      icon: "logo-facebook",
      color: "#1877F2",
      url: "https://facebook.com",
    },
    {
      name: "Instagram",
      icon: "logo-instagram",
      color: "#E4405F",
      url: "https://instagram.com",
    },
    {
      name: "YouTube",
      icon: "logo-youtube",
      color: "#FF0000",
      url: "https://youtube.com",
    },
  ];

  const openSocialMedia = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.log("Unable to open social media link:", error);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* PAGE TITLE */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: theme.text,
          marginBottom: 8,
        }}
      >
        Social Media 🌐
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: theme.secondaryText,
          marginBottom: 24,
        }}
      >
        Connect with RCCG HalleluYah Parish online
      </Text>

      {/* SOCIAL MEDIA CARD */}
      <View
        style={{
          backgroundColor: theme.card,
          borderRadius: 18,
          paddingHorizontal: 16,
          elevation: 3,
        }}
      >
        {socialItems.map((item, index) => (
          <Pressable
            key={item.name}
            onPress={() => openSocialMedia(item.url)}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 18,

              borderBottomWidth: index === socialItems.length - 1 ? 0 : 1,

              borderBottomColor: theme.border,

              opacity: pressed ? 0.6 : 1,
            })}
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
              <Ionicons name={item.icon as any} size={25} color={item.color} />
            </View>

            {/* NAME */}
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
                {item.name}
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  color: theme.secondaryText,
                  marginTop: 3,
                }}
              >
                Follow us on {item.name}
              </Text>
            </View>

            <Ionicons name="open-outline" size={20} color={theme.mutedText} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
