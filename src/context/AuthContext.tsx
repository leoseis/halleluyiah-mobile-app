import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import api from "../api/api";
import { registerForPushNotificationsAsync } from "../utils/notifications";

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
      const pushToken = await registerForPushNotificationsAsync();

      console.log("Expo Push Token:", pushToken);
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
