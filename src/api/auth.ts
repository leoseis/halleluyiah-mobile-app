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
  phone_number: string;
  profile_picture?: string | null;
}) => {
  const formData = new FormData();

  formData.append("first_name", data.first_name);
  formData.append("last_name", data.last_name);
  formData.append("email", data.email);
  formData.append("phone_number", data.phone_number);

  if (data.profile_picture) {
    const filename = data.profile_picture.split("/").pop() || "profile.jpg";

    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : "image/jpeg";

    formData.append("profile_picture", {
      uri: data.profile_picture,
      name: filename,
      type,
    } as any);
  }

  const response = await api.put("/auth/profile/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
export const changePassword = async (data: {
  old_password: string;
  new_password: string;
}) => {
  const response = await api.post("/auth/change-password/", data);

  return response.data;
};
