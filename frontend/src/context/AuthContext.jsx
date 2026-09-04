import { createContext, useEffect, useRef, useState } from "react";
import { setAccessToken as setApiAccessToken } from "../api/client";
import { loginApi, logoutApi, refreshTokenApi, registerApi } from "../api/auth";
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
    const data = await loginApi({ email, password });

    setUser(data.user);
    setAccessToken(data.accessToken);
    setApiAccessToken(data.accessToken);

    return data;
  };

  const register = async (name, email, password) => {
    const data = await registerApi({ name, email, password });

    setUser(data.user);
    setAccessToken(data.accessToken);
    setApiAccessToken(data.accessToken);

    return data;
  };

  const logout = async () => {
    try {
      await logoutApi();
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
        const data = await refreshTokenApi();

        setAccessToken(data.accessToken);
        setApiAccessToken(data.accessToken);
        setUser(data.user);
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
