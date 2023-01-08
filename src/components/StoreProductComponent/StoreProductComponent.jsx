import React, { useState, useEffect, Suspense } from "react";
import styles from "./storeproduct.module.css";
import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";

const StoreProductComponent = (props) => {
  const cartContext = useContext(CartContext);
  const product = props.product;
  const addedToCart = props.addedToCart;
  const addToCart = () => {
    cartContext.addOneToCart(product._id);
    addedToCart();
  };

  return (
    <section className={styles.product}>
      <div className={styles.productPreview}>
        <img
          src={
            product.preview !== ".webp"
              ? `${process.env.PUBLIC_URL}/assets/images/products/product_preview/${product.preview}`
              : `${process.env.PUBLIC_URL}/assets/images/no_image.webp`
          }
        />
      </div>
      <div className={styles.productInfo}>
        <p>
          <span className={styles.productName}>{product.name}</span>
          <span className={styles.productWeight}>({product.weight}g)</span>
        </p>
        <ul className={styles.productIngredients}>
          {product.ingredients.map((ingredient, idx) => {
            return <li key={idx}>{ingredient}</li>;
          })}
        </ul>
        <p className={styles.productPrice}>{product.price} RON</p>
      </div>
      <button onClick={addToCart}>Adauga in cos</button>
    </section>
  );
};

export default StoreProductComponent;
