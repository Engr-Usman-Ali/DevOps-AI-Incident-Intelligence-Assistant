import API from "./api";

export const getCurrentUser = async () => {
  const response = await API.get("/auth/me");
  return response.data;
};