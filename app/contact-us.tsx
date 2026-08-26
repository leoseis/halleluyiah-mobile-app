import { Linking, Pressable, ScrollView, Text, View } from "react-native";

import { APP_THEME } from "../constants/appTheme";
import { useAppTheme } from "../src/context/ThemeContext";

export default function ContactUsScreen() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

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
          marginBottom: 20,
        }}
      >
        Contact Us 📞
      </Text>

      {/* CONTACT CARD */}
      <View
        style={{
          backgroundColor: theme.card,
          padding: 20,
          borderRadius: 16,
          elevation: 3,
        }}
      >
        {/* CHURCH */}
        <Text
          style={{
            marginBottom: 15,
            color: theme.text,
            fontSize: 16,
          }}
        >
          📍 RCCG Hallelujah Parish
        </Text>

        {/* PHONE */}
        <Pressable
          onPress={() => Linking.openURL("tel:+2348012345678")}
          style={({ pressed }) => ({
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Text
            style={{
              color: isDark ? "#60a5fa" : "#001f5b",
              marginBottom: 15,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            📞 +234 801 234 5678
          </Text>
        </Pressable>

        {/* EMAIL */}
        <Pressable
          onPress={() => Linking.openURL("mailto:church@email.com")}
          style={({ pressed }) => ({
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Text
            style={{
              color: isDark ? "#60a5fa" : "#001f5b",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            ✉️ church@email.com
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
