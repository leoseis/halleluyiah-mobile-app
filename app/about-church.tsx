import { ScrollView, Text, View } from "react-native";

import { APP_THEME } from "../constants/appTheme";
import { useAppTheme } from "../src/context/ThemeContext";

export default function AboutChurchScreen() {
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
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: theme.text,
          marginBottom: 20,
        }}
      >
        About Our Church 🏛
      </Text>

      <View
        style={{
          backgroundColor: theme.card,
          padding: 20,
          borderRadius: 16,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
            color: theme.text,
          }}
        >
          RCCG Hallelujah Parish
        </Text>

        <Text
          style={{
            lineHeight: 24,
            color: theme.secondaryText,
          }}
        >
          Welcome to RCCG Hallelujah Parish. We are committed to raising
          disciples, spreading the Gospel, and impacting lives through worship,
          prayer, and the Word of God.
        </Text>

        <Text
          style={{
            marginTop: 20,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          Vision
        </Text>

        <Text
          style={{
            color: theme.secondaryText,
            marginTop: 5,
          }}
        >
          To make heaven and take as many people with us as possible.
        </Text>

        <Text
          style={{
            marginTop: 20,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          Service Times
        </Text>

        <Text
          style={{
            color: theme.secondaryText,
            marginTop: 5,
          }}
        >
          Sunday Service - 8:00 AM
        </Text>

        <Text
          style={{
            color: theme.secondaryText,
          }}
        >
          Bible Study - Wednesday 6:00 PM
        </Text>

        <Text
          style={{
            color: theme.secondaryText,
          }}
        >
          Prayer Meeting - Friday 6:00 PM
        </Text>
      </View>
    </ScrollView>
  );
}
