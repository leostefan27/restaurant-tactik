import { useState, useEffect } from "react";
import { createContext } from "react";
import api from "../api";

export const UserContext = createContext({
  user: null,
  userAddresses: null,
  editUser: {},
  addAddress: {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userAddresses, setUserAddresses] = useState(null);
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

  const editUser = async (id, update) => {
    await api
      .put(`api/users/me/edit/${id}`, update, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    window.location.href = "/dashboard";
  };

  const getAddresses = async () => {
    if (token) {
    await api.get('api/addresses/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }). then((res) => {
      setUserAddresses(res.data);
    }).catch((err) => console.log(err));
  }
  }

  const addAddress = async (address) => {
    await api
      .post("api/addresses/", address, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    window.location.href = "/dashboard";
  };

  useEffect(() => {
    getUser();
    getAddresses();
  }, [token]);

  const contextValue = {
    user,
    userAddresses,
    editUser,
    addAddress,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
