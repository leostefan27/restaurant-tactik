import React, { useEffect, useState } from "react";
import styles from "./adminPanel.module.css";
import OrderComponent from "./OrderComponent/OrderComponent";
import axios from "axios";

const AdminPanelComponent = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/orders?solved=false")
         .then((res) => {
          setOrders(res.data);
         })
         .catch((err) => {console.log(err)})
  }, []);

  return (
    <section className={styles.adminPanel}>
      <nav>
        <h2>Panou Administrare</h2>
      </nav>

      <div className={styles.container}>
        <div className={styles.widgets}>
          <div className={`${styles.widget} ${styles.orders}`}>
            <p className={styles.ordersTitle}>Comenzi</p>
            {orders.map((order, idx) => {
              return <OrderComponent key={idx} order={order} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPanelComponent;
