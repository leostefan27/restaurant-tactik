import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../adminPanel.module.css";
import { getProductData } from "../../../utilities/getProductData";

const OrderComponent = (props) => {
  const [order, setOrder] = useState({});
  const [userData, setUserData] = useState({});
  const [data, setData] = useState({});

  const getUserData = async () => {
    await axios
      .get(`http://localhost:3000/users?id=${props.order.author_id}`)
      .then(async (res) => {
        await setUserData(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setData({
      ...userData,
      ...order,
    });
  }, [order, userData]);

  useEffect(() => {
    setOrder(props.order);
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={styles.order}>
      <p className={styles.order_id}>{`Numarul comenzii: ${data.order_id}`}</p>
      <div className={styles.orderDetails}>
        <div className={styles.personalInfo}>
          <p>{`Nume: ${data.first_name} ${data.last_name}`}</p>
          <p>{`Telefon: ${data.phone}`}</p>
          <p>{`Adresa: ${data.address}`}</p>
        </div>
        <div className={styles.orderProducts}>
          <ul>
            {data.products?.map((product, key) => {
              return (
                <li key={key}>
                  {product.product_quantity} x {getProductData(product.product_id).title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <hr />
      <h4>Total: {data.price} RON</h4>
      <button className={styles.solveOrderButton}>{data.solved === "true" ? "Nu am trimis comanda la client" : "Trimite comanda la client"}</button>
    </div>
  );
};

export default OrderComponent;
