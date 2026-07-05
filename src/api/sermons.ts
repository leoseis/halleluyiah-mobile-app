import api from "./api";

export const getSermons = async () => {
  const response = await api.get("/sermons/");
  return response.data;
};
