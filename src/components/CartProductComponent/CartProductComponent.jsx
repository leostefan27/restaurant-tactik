import React from "react";
import styles from "./cartproduct.module.css";
import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import { getProductData } from "../../utilities/getProductData";

const CartProductComponent = (props) => {
  const cartContext = useContext(CartContext);
  const cartProduct = props.product;
  const [product, setProduct] = useState(null);
  const [productQuantity, setProductQuantity] = useState(
    props.product.quantity
  );

const fetchProduct = async (id) => {
  try {
    const res = await getProductData(id);
    return res;
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  async function fetchAndSetProduct() {
    const product = await fetchProduct(cartProduct.id);
    setProduct(product);
  }
  fetchAndSetProduct();
}, [])

  const incrQuantity = () => {
    cartContext.addOneToCart(product._id);
    setProductQuantity((prevProductQuantity) => prevProductQuantity + 1);
  };

  const decrQuantity = () => {
    if (productQuantity > 0) {
      cartContext.removeOneFromCart(product._id);
      setProductQuantity((prevProductQuantity) => prevProductQuantity - 1);
    }
  };

  const deleteProduct = () => {
    props.deleteProduct(product._id);
  };

  return (
    <section className={styles.cartProduct}>
      <div className={styles.productInfo}>
        <div className={styles.productPreview}>
          <img
            src={
              product?.preview !== ".webp"
                ? `${process.env.PUBLIC_URL}/assets/images/products/product_preview/${product?.preview}`
                : `${process.env.PUBLIC_URL}/assets/images/no_image.webp`
            }
          />
        </div>
        <div className={styles.productDetails}>
          <p>
            <span className={styles.productName}>{product?.name}</span>
            <span className={styles.productWeight}>({product?.weight}g)</span>
          </p>
          <ul className={styles.productIngredients}>
            {product?.ingredients?.map((ingredient, idx) => {
              return <li key={idx}>{ingredient}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className={styles.controlBtns}>
        <p className={styles.productPrice}>{`${product?.price} RON`}</p>
        <div className={styles.quantityBtn}>
          <button onClick={decrQuantity}>-</button>
          <p>{productQuantity}</p>
          <button onClick={incrQuantity}>+</button>
        </div>

        <div className={styles.removeBtn}>
          <p onClick={deleteProduct}>
            <span>Sterge</span>
            <span>
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CartProductComponent;
