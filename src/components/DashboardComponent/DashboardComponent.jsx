import React from "react";
import styles from "./dashboard.module.css";
import { useContext } from "react";
import api from "../../api";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../contexts/UserContext";

const DashboardComponent = () => {
  const userData = useContext(UserContext);
  const [userOrders, setUserOrders] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [user, setUser] = useState(null);
  const getOrders = async () => {
    await api
      .get(`/api/orders/myOrders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("_token")}`,
        },
      })
      .then((res) => {
        setUserOrders(res.data);
      });
  };

  const getAddresses = async () => {
    await api
      .get(`/api/addresses/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("_token")}`,
        },
      })
      .then((res) => {
        setUserAddresses(res.data);
      });
  };

  useEffect(() => {
    setUser(userData.user);
    getOrders();
    getAddresses();
  }, []);

  if (user === null) {
    return null;
  }

  return (
    <section
      className={styles.dashboard}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/dashboard_bkg.webp)`,
      }}
    >
      <div className={styles.darkTint}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>{`Bine ai venit, ${user.firstName} ${user.lastName}`}</h1>
          </div>

          <div className={styles.personalInfoSection}>
            <h2>
              <span>Date Personale</span>
              <span>
                <FontAwesomeIcon icon={faPen} />
              </span>
            </h2>

            <div className={styles.personalInfoWrapper}>
              <p>
                <span>Nume:</span> {user.lastName}
              </p>
              <p>
                <span>Prenume:</span> {user.firstName}
              </p>
              <p>
                <span>Telefon:</span> {user.phone}
              </p>
              <p>
                <span>Email:</span> {user.email}
              </p>
            </div>
          </div>

          <div className={styles.addressesSection}>
            <h2>
              <span>Adresele Tale</span>
              <span>
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </h2>

            <div className={styles.addressesWrapper}>
              {userAddresses.map((address) => {
                return (
                  <div className={styles.address} key={address._id}>
                    <p>
                      <span>
                        {`Strada ${address.strada} ${address.numarStrada}, `}{" "}
                        {address.bloc && `bloc ${address.bloc}, `}{" "}
                        {address.scara && `scara ${address.scara} `}{" "}
                        {address.bloc && `bloc ${address.bloc}, `}{" "}
                        {address.apartament &&
                          `apartamentul ${address.apartament} `}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faXmark} />
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.ordersSection}>
            <h2>Comenzile Tale</h2>

            <div className={styles.ordersWrapper}>
              {userOrders.map((order) => {
                return (
                  <div className={styles.order} key={order._id}>
                    <div className={styles.orderHeader}>
                      <h3>{`Comanda ${order._id}`}</h3>
                      <h3>{`${order.price} RON`}</h3>
                    </div>

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
