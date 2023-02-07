import React from "react";
import styles from "./dashboard.module.css";
import { useContext } from "react";
import api from "../../api";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../contexts/UserContext";
import EditPersonalInfoComponent from "../EditPersonalInfoComponent/EditPersonalInfoComponent";
import AddAddressComponent from "../AddAddressComponent/AddAddressComponent";

const DashboardComponent = () => {
  const userData = useContext(UserContext);
  const [userOrders, setUserOrders] = useState([]);
  const [userAddresses, setUserAddresses] = useState(userData.userAddresses);
  const [user, setUser] = useState(null);
  const [showEditPersonalInfo, setShowEditPersonalInfo] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);

  // Get all the data needed on first render
  useEffect(() => {
    setUser(userData.user);
    getOrders();
  }, []);

  // Fetch user orders from db
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

  // Function to delete an address
  const deleteAddress = async (id) => {
    await api
      .delete(`/api/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("_token")}`,
        },
      })
      .then((res) => {
        setUserAddresses((prev) => prev.filter((el) => el._id !== id));
      })
      .catch((err) => console.log(err));
  };

  // Toggle personal info edit modal
  const toggleEditPersonalInfo = () => {
    if (showEditPersonalInfo === false) {
      setShowEditPersonalInfo(true);
    } else {
      setShowEditPersonalInfo(false);
    }
  };
  // Toggle add address modal
  const toggleAddAddress = () => {
    if (showAddAddress === false) {
      setShowAddAddress(true);
    } else {
      setShowAddAddress(false);
    }
  };

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
      {/* Edit personal info modal */}
      {showEditPersonalInfo && (
        <EditPersonalInfoComponent closeModal={toggleEditPersonalInfo} />
      )}
      {/* Add new address modal */}
      {showAddAddress && <AddAddressComponent closeModal={toggleAddAddress} />}
      <div className={styles.darkTint}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>{`Bine ai venit, ${user.firstName} ${user.lastName}`}</h1>
          </div>

          <div className={styles.personalInfoSection}>
            <h2>
              <span>Date Personale</span>
              <span>
                <FontAwesomeIcon
                  icon={faPen}
                  onClick={toggleEditPersonalInfo}
                />
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
                <span>Telefon:</span>{" "}
                {user.phone
                  ? `${user.phone}`
                  : `Nu exista un numar de telefon pe cont`}
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
                <FontAwesomeIcon icon={faPlus} onClick={toggleAddAddress}/>
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
                        {address.scara && `scara ${address.scara}, `}{" "}
                        {address.bloc && `bloc ${address.bloc}, `}{" "}
                        {address.apartament &&
                          ` apartamentul ${address.apartament} `}
                      </span>
                      <span>
                        <FontAwesomeIcon
                          icon={faXmark}
                          onClick={() => deleteAddress(address._id)}
                        />
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
