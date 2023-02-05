import { useState, useEffect } from "react";
import { createContext } from "react";
import api from "../api";

export const UserContext = createContext({
  user: null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("_token");

  const getUser = async () => {
    if (token) {
      try {
        const res = await api.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error.data);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [token]);

  const contextValue = {
    user,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
