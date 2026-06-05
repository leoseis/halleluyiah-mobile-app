import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { registerForPushNotificationsAsync } from "../utils/notifications";

interface AuthContextType {
  userToken: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: any) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("access");

      if (token) {
        setUserToken(token);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string) => {
    await AsyncStorage.setItem("access", token);

    setUserToken(token);

    try {
      const pushToken = await registerForPushNotificationsAsync();

      console.log("Expo Push Token:", pushToken);
    } catch (error) {
      console.log("Push notification error:", error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("access");

    setUserToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
