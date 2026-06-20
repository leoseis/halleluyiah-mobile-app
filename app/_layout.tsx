import { useContext } from "react";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import LoaderSpinner from "../components/LoaderSpinner";
import { AuthContext, AuthProvider } from "../src/context/AuthContext";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootNavigator() {
  const colorScheme = useColorScheme();

  const { userToken, loading } = useContext(AuthContext);

  if (loading) {
    return <LoaderSpinner />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {userToken ? (
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="announcement-details"
            options={{
              title: "Announcement",
            }}
          />

          <Stack.Screen
            name="testimony-details"
            options={{
              title: "Testimony",
            }}
          />

          <Stack.Screen
            name="about-church"
            options={{
              title: "About Church",
            }}
          />

          <Stack.Screen
            name="contact-us"
            options={{
              title: "Contact Us",
            }}
          />

          <Stack.Screen
            name="social-media"
            options={{
              title: "Social Media",
            }}
          />

          <Stack.Screen
            name="app-version"
            options={{
              title: "App Version",
            }}
          />
        </Stack>
      ) : (
        <Stack>
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="register"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      )}

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
