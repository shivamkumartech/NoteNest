import { createContext, useEffect, useState } from "react";
import BACKEND_URL from "../api/url";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const response = await BACKEND_URL.post("/auth/login", {
      email,
      password,
    });

    setUser(response.data.user);
    setAccessToken(response.data.accessToken);

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

    return response.data;
  };

  const logout = async () => {
    try {
      await BACKEND_URL.post("/auth/logout");
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  useEffect(() => {
    setLoading(false);
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