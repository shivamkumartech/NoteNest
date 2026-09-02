import { createContext, useEffect, useRef, useState } from "react";
import BACKEND_URL, { setAccessToken as setApiAccessToken } from "../api/url";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const hasRestoredSession = useRef(false);

  const clearAuthState = () => {
    setUser(null);
    setAccessToken(null);
    setApiAccessToken(null);
  };

  const login = async (email, password) => {
    const response = await BACKEND_URL.post("/auth/login", {
      email,
      password,
    });

    setUser(response.data.user);
    setAccessToken(response.data.accessToken);
    setApiAccessToken(response.data.accessToken);

    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await BACKEND_URL.post("/auth/register", {
      name,
      email,
      password,
    });

    setUser(response.data.user);
    setAccessToken(response.data.accessToken);
    setApiAccessToken(response.data.accessToken);

    return response.data;
  };

  const logout = async () => {
    try {
      await BACKEND_URL.post("/auth/logout");
    } finally {
      clearAuthState();
    }
  };

  useEffect(() => {
    const handleSessionExpired = () => {
      clearAuthState();

      toast.error("Your session has expired. Please log in again.");
    };

    window.addEventListener("auth:session-expired", handleSessionExpired);

    return () => {
      window.removeEventListener("auth:session-expired", handleSessionExpired);
    };
  }, []);

  useEffect(() => {
    const handleTokenRefreshed = (event) => {
      const { accessToken, user } = event.detail;

      setAccessToken(accessToken);
      setApiAccessToken(accessToken);

      if (user) {
        setUser(user);
      }
    };

    window.addEventListener("auth:token-refreshed", handleTokenRefreshed);

    return () => {
      window.removeEventListener("auth:token-refreshed", handleTokenRefreshed);
    };
  }, []);

  useEffect(() => {
    if (hasRestoredSession.current) return;

    hasRestoredSession.current = true;

    const restoreSession = async () => {
      try {
        const response = await BACKEND_URL.post("/auth/refresh-token");

        setAccessToken(response.data.accessToken);
        setApiAccessToken(response.data.accessToken);
        setUser(response.data.user);
      } catch (error) {
        clearAuthState();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
