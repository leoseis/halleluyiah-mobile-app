import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { APP_THEME } from "../../constants/appTheme";
import { useAppTheme } from "../../src/context/ThemeContext";

export default function TestimonyDetails() {
  const { isDark } = useAppTheme();
  const theme = APP_THEME[isDark ? "dark" : "light"];

  const params = useLocalSearchParams();

  const testimony = JSON.parse(params.testimony as string);

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
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          {testimony.title}
        </Text>

        <Text
          style={{
            marginTop: 10,
            color: theme.secondaryText,
          }}
        >
          By {testimony.author}
        </Text>

        <Text
          style={{
            marginTop: 25,
            lineHeight: 28,
            fontSize: 16,
            color: theme.text,
          }}
        >
          {testimony.content}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
