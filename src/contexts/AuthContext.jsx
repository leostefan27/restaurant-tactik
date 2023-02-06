import { useEffect } from "react";
import { createContext, useState } from "react";
import api from "../api";

export const AuthContext = createContext({
  isAuthenticated: null,
  toggleAuth: {},
  registerUser: {},
  loginUser: {},
  logoutUser: {}
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("_token");

  const toggleAuth = async () => {
    if (token) {
      try {
        const response = await api.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error.data);
      }
    }
  };

  useEffect(() => {
    toggleAuth();
  }, [token]);

  const registerUser = async (email, password, firstName, lastName, phone) => {
    await api
      .post("/api/users", { email, password, firstName, lastName, phone })
      .then(async (res) => {
        localStorage.setItem("_token", res.data.token);
        toggleAuth();
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  const loginUser = async (email, password) => {
    await api
      .post("/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("_token", res.data.token);
        toggleAuth();
        window.location.href = "/dashboard";
      });
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("_token");
    window.location.href = "/";
  };

  const contextValue = {
    isAuthenticated,
    toggleAuth,
    registerUser,
    loginUser,
    logoutUser
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
