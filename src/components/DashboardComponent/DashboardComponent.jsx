import React from "react";
import styles from "./dashboard.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import api from "../../api";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import { UserContext }  from "../../contexts/UserContext";

const DashboardComponent = () => {
  const userData = useContext(UserContext);
  const [userOrders, setUserOrders] = useState([]);
  const [user, setUser] = useState(null);
  const getOrders = async () => {
    await api.get(`api/orders/myOrders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('_token')}`,
      }
    }).then((res) => {
      setUserOrders(res.data);
    });
  }

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
          <div className={styles.leftSide}>
            <div className={styles.personalInfo}>
              <h3>Date personale</h3>
              <div>
                <p>Nume:</p>
                <p>{user.lastName}</p>
              </div>

              <div>
                <p>Prenume:</p>
                <p>{user.firstName}</p>
              </div>

              <div>
                <p>Telefon:</p>
                <p>{user.phone}</p>
              </div>

              <div>
                <p>Email:</p>
                <p>{user.email}</p>
              </div>
            </div>
            <div className={styles.userAddresses}>
              <div className={styles.addAddress}>
                <FontAwesomeIcon icon={faPlus} /> 
              </div>
              <h3>Adresele tale</h3>
              {user.addresses.map((address, index) => {
                return (
                  <div className={styles.address} key={`${address.bloc}${address.apartament}`}>
                    <h4>Adresa {index + 1}</h4>
                    <p>{`Strada ${address.strada} numarul ${address.numarStrada} bloc ${address.bloc} scara ${address.scara} etajul ${address.etaj} apartamenul ${address.apartament}`}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.userOrders}>
              <h3>Comenzile tale</h3>
              {userOrders.map((order) => {
                return (
                  <div className={styles.order} key={order.order_id}>
                    <h4>{`Comanda ${order._created_at}`}</h4>
                    <div className={styles.orderInfo}>
                      <p>{`${order.price} RON`}</p>
                      <p>{order.date}</p>
                    </div>
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
