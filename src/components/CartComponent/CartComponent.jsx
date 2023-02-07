import React, { useContext } from "react";
import styles from "./cart.module.css";
import { CartContext } from "../../contexts/CartContext";
import { useState } from "react";
import { useEffect } from "react";
import CartProductComponent from "../CartProductComponent/CartProductComponent";
import CheckoutComponent from "../CheckoutComponent/CheckoutComponent";

const CartComponent = () => {
  const cartContext = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [deliveryCost, setDeliveryCost] = useState("GRATIS");
  const [totalPrice, setTotalPrice] = useState();
  const [totalCost, setTotalCost] = useState(0);
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("CART_DATA"))
  );

  const toggleShowCheckout = () => {
    if (showCheckout === false) {
      setShowCheckout(true);
    }

    if (showCheckout === true) {
      setShowCheckout(false);
    }
  };

  useEffect(() => {
    const getTotalPrice = async () => {
      const totalCost = await cartContext.getTotalCost();
      setTotalCost(totalCost);
    };

    getTotalPrice();
  }, [cartContext.items]);

  const deleteProduct = (id) => {
    cartContext.deleteFromCart(id);
    setCartData((prevCartData) => prevCartData.filter((el) => el.id !== id));
  };

  useEffect(() => {
    setTotalPrice(
      (Number.isInteger(deliveryCost) ? deliveryCost : 0) + totalCost
    );
  }, [totalCost, deliveryCost]);

  return (
    <section
      className={styles.cart}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/cart_bkg.webp)`,
      }}
    >
      {/* Checkout modal */}
      {showCheckout && <CheckoutComponent exitModal={toggleShowCheckout} price={totalPrice} productsId={cartData}/>}
      <div className={styles.container}>
        <div className={styles.products}>
          <p className={styles.cartTitle}>Cosul tau</p>
          <div className={styles.cartProducts}>
            {cartData.map((product) => {
              return (
                <CartProductComponent
                  key={product.id}
                  product={product}
                  deleteProduct={deleteProduct}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.cartSummary}>
          <p className={styles.summaryTitle}>Sumar comanda</p>
          <p className={styles.totalProductsPrice}>
            <span>Costul total al produselor:</span>
            <span>{`${totalCost} RON`}</span>
          </p>
          <p className={styles.deliveryCost}>
            <span>Costul livrarii:</span> <span>{deliveryCost}</span>
          </p>
          <p className={styles.totalPrice}>
            <span>Pret total:</span> <span>{`${totalPrice} RON`}</span>
          </p>
          <hr />
          <button onClick={toggleShowCheckout} className={styles.checkoutBtn}>Continua</button>
        </div>
      </div>
    </section>
  );
};

export default CartComponent;
