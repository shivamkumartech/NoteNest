import api from "./client";

export const loginApi = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const registerApi = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const logoutApi = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const refreshTokenApi = async () => {
  const response = await api.post("/auth/refresh-token");
  return response.data;
};
