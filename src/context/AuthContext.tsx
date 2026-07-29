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

      if (token) {
        setUserToken(token);

        const response = await api.get("/auth/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);

        console.log("Restored user:", response.data);
      }
    } catch (error) {
      console.log("Restore Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string) => {
    await AsyncStorage.setItem("access", token);

    setUserToken(token);

    try {
      // Fetch the logged-in user's profile
      const response = await api.get("/auth/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);

      console.log("Logged in user:", response.data);

      // Register for push notifications
      try {
        const pushToken = await registerForPushNotificationsAsync();

        if (pushToken) {
          const deviceName =
            Device.deviceName ||
            `${Device.manufacturer ?? "Unknown"} ${Device.modelName ?? "Android"}`;

          await registerDeviceToken(pushToken, deviceName);

          console.log("Expo Push Token:", pushToken);
          console.log("Device registered successfully.");
        }
      } catch (error) {
        console.log("Notification registration failed:", error);
      }
    } catch (error) {
      console.log("Login/Profile error:", error);
    }
  };
  const logout = async () => {
    await AsyncStorage.removeItem("access");

    setUserToken(null);
    setUser(null);
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
