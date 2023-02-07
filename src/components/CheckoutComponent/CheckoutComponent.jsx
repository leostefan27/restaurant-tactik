import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import styles from "./checkout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { getProductData } from "../../utilities/getProductData";
import { library } from "@fortawesome/fontawesome-svg-core";

const CheckoutComponent = (props) => {
  const userData = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [addressValue, setAddressValue] = useState(null);
  const productsId = props.productsId;

  const handleAddressChange = (event) => {
    setAddressValue(event.target.value);
  };

  const fetchProduct = async (id) => {
    try {
      const res = await getProductData(id);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function fetchAndSetProduct() {
      const productsData = await Promise.all(
        productsId.map(async (el) => {
          return await fetchProduct(el.id);
        })
      );
      setProducts(productsData);
    }
    fetchAndSetProduct();
  }, []);

  return (
    <section className={styles.checkout}>
      <div className={styles.checkoutModal}>
        <span>
          {" "}
          <FontAwesomeIcon icon={faXmark} />{" "}
        </span>
        <h2>Finealizeaza Comanda</h2>
        <div className={styles.summary}>
          <div className={styles.products}>
            <ul>
              {products.map((product, idx) => {
                return <li key={idx}>{product.name}</li>;
              })}
            </ul>
          </div>
          <p className={styles.price}>{props.price}</p>
        </div>

        <div className={styles.address}>
          <div className={styles.addressWrapper}>
            <div>
              <input
                type="radio"
                value="option1"
                checked={addressValue === "option1"}
                onChange={handleAddressChange}
              />
              address 1
              <input
                type="radio"
                value="option2"
                checked={addressValue === "option2"}
                onChange={handleAddressChange}
              />
              address 2
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutComponent;
