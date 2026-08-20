import * as Notifications from "expo-notifications";
import { Stack, router } from "expo-router";
import { useContext, useEffect } from "react";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";

import { ThemeProvider, useAppTheme } from "../src/context/ThemeContext";

import { StatusBar } from "expo-status-bar";

import LoaderSpinner from "../components/LoaderSpinner";
import { AuthContext, AuthProvider } from "../src/context/AuthContext";


export const unstable_settings = {
  anchor: "(tabs)",
};

function RootNavigator() {
  const { isDark } = useAppTheme();

  const { userToken, loading } = useContext(AuthContext);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const announcementId =
          response.notification.request.content.data?.announcement_id;

        console.log("Notification tapped - announcement ID:", announcementId);

        if (announcementId) {
          router.push({
            pathname: "/announcement-details",
            params: {
              id: String(announcementId),
            },
          });
        }
      },
    );

    return () => subscription.remove();
  }, []);

  if (loading) {
    return <LoaderSpinner />;
  }

  return (
    <NavigationThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      {userToken ? (
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />

          {/* <Stack.Screen
            name="announcement-details"
            options={{
              title: "Announcement",
            }}
          /> */}

          {/* <Stack.Screen
            name="testimony-details"
            options={{
              title: "Testimony",
            }}
          /> */}
          <Stack.Screen
            name="sermons"
            options={{
              title: "Sermons",
            }}
          />

          <Stack.Screen
            name="devotional-details"
            options={{
              title: "Daily Devotional",
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
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(
          "Notification tapped:",
          response.notification.request.content,
        );
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
