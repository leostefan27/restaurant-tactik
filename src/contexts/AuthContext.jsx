import { useEffect } from "react";
import { createContext, useState } from "react";
import api from "../api";

export const AuthContext = createContext({
  isAuthenticated: null,
  toggleAuth: {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("_token");

  const toggleAuth = async () => {
  try {
    const res = await api.get("/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  toggleAuth();
}, [token]);

  const contextValue = {
    isAuthenticated,
    toggleAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
