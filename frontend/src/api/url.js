import axios from "axios";

let accessToken = null;
let refreshPromise = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

const BACKEND_URL = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ================= REQUEST INTERCEPTOR =================

BACKEND_URL.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ================= RESPONSE INTERCEPTOR =================

BACKEND_URL.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      originalRequest?.url === "/auth/refresh-token" ||
      originalRequest?.url === "/auth/login" ||
      originalRequest?.url === "/auth/register"
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = BACKEND_URL.post("/auth/refresh-token");
      }

      const response = await refreshPromise;

      refreshPromise = null;

      const newAccessToken = response.data.accessToken;

      setAccessToken(newAccessToken);

      window.dispatchEvent(
        new CustomEvent("auth:token-refreshed", {
          detail: {
            accessToken: newAccessToken,
            user: response.data.user,
          },
        }),
      );

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return BACKEND_URL(originalRequest);
    } catch (refreshError) {
      refreshPromise = null;

      setAccessToken(null);

      window.dispatchEvent(new CustomEvent("auth:session-expired"));

      return Promise.reject(refreshError);
    }
  },
);

export default BACKEND_URL;
