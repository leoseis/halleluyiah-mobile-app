import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import React, { createContext, useEffect, useState } from "react";

import api from "../api/api";

import {
  registerDeviceToken,
  registerForPushNotificationsAsync,
} from "../api/notifications";

interface AuthContextType {
  userToken: string | null;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: any) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("access");

      // No stored token = user is logged out
      if (!token) {
        setUserToken(null);
        setUser(null);
        return;
      }

      /*
       * IMPORTANT:
       * Validate the stored token BEFORE marking
       * the user as logged in.
       */
      const response = await api.get("/auth/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Token is valid
      setUser(response.data);
      setUserToken(token);

      console.log("Restored user:", response.data);
    } catch (error) {
      console.log("Restore Login Error:", error);

      /*
       * Token is expired/invalid.
       * Completely clear the old session.
       */
      await AsyncStorage.removeItem("access");

      setUserToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string) => {
    try {
      /*
       * Validate the token first.
       */
      const response = await api.get("/auth/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      /*
       * Only save the session after
       * profile validation succeeds.
       */
      await AsyncStorage.setItem("access", token);

      setUser(response.data);
      setUserToken(token);

      console.log("Logged in user:", response.data);

      // Register device for push notifications
      try {
        const pushToken = await registerForPushNotificationsAsync();

        if (pushToken) {
          const deviceName =
            Device.deviceName ||
            `${Device.manufacturer ?? "Unknown"} ${
              Device.modelName ?? "Android"
            }`;

          await registerDeviceToken(pushToken, deviceName);

          console.log("Expo Push Token:", pushToken);
          console.log("Device registered successfully.");
        }
      } catch (error) {
        console.log("Notification registration failed:", error);
      }
    } catch (error) {
      console.log("Login/Profile error:", error);

      // Prevent a failed login from leaving stale auth
      await AsyncStorage.removeItem("access");

      setUserToken(null);
      setUser(null);

      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("access");
    } catch (error) {
      console.log("Logout storage error:", error);
    } finally {
      /*
       * Clear BOTH pieces of authentication state.
       */
      setUser(null);
      setUserToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        user,
        setUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
