import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export const loginUser = async (username: string, password: string) => {
  const response = await api.post("/token/", {
    username,
    password,
  });

  const data = response.data;

  await AsyncStorage.setItem("access", data.access);
  await AsyncStorage.setItem("refresh", data.refresh);

  return data;
};

export const updateProfile = async (data: {
  first_name: string;
  last_name: string;
  email: string;
}) => {
  const response = await api.put("/auth/profile/", data);

  return response.data;
};
