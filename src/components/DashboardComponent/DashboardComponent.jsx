import React from "react";
import styles from "./dashboard.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import api from "../../api";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../contexts/UserContext";

const DashboardComponent = () => {
  const userData = useContext(UserContext);
  const [userOrders, setUserOrders] = useState([]);
  const [user, setUser] = useState(null);
  const getOrders = async () => {
    await api
      .get(`api/orders/myOrders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("_token")}`,
        },
      })
      .then((res) => {
        setUserOrders(res.data);
      });
  };

  useEffect(() => {
    setUser(userData.user);
    getOrders();
  }, []);

  if (user === null) {
    return null;
  }

  return (
    <section className={styles.dashboard}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Contul tau</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.personalInfo}>
            <p>Name: {`${user.firstName} ${user.lastName}`}</p>
          </div>

          <div className={styles.addresses}>
            <div className={styles.addressesHeader}>
              <p><span>Adresele Tale</span><span><FontAwesomeIcon icon={faPlus} /></span></p>
            </div>

            <div className={styles.addressesWrapper}>
              {user.addresses.map((address, idx) => {
                return (
                  <div className={styles.address}>
                    <span><FontAwesomeIcon icon={faXmark} /></span>
                    <p>{`Strada ${address.strada} nr.${address.numarStrada} blocul ${address.bloc} scara ${address.scara} etaj ${address.etaj} apartamentul ${address.apartament}`}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.orders}>
            <div className={styles.ordersHeader}>
              <p>Comenzile Tale</p>
            </div>
            <div className={styles.ordersWrapper}>
              {userOrders.map((order, orderId) => {
                return (
                  <div key={orderId} className={styles.order}>
                    <p>{order._id}</p>
                    <ul>
                      {order.products.map((product, idx) => {
                        return <li key={idx}>{product}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardComponent;
