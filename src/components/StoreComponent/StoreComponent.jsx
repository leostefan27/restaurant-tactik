import React, { useState, useEffect } from "react";
import styles from "./store.module.css";
import { lazy, Suspense } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRef } from "react";
import api from "../../api";
const StoreProductComponent = lazy(() =>
  import("../StoreProductComponent/StoreProductComponent")
);

const ProductsComponent = () => {
  const [storeProducts, setStoreProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const productsCount = page * 20;
  const addedToCartRef = useRef(null);

  const addedToCart = () => {
    addedToCartRef.current.style.visibility = "visible";
    addedToCartRef.current.style.opacity = "1";

    setTimeout(() => {
      addedToCartRef.current.style.visibility = "hidden";
      addedToCartRef.current.style.opacity = "0";
    }, 3000);
  };

  const searchItems = async (e) => {
    await setQuery(e.target.value);
  };

  const fetchMoreProducts = async () => {
    await setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/api/products?limit=${productsCount}&q=${query}`)
        .then((res) => {
          setStoreProducts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [productsCount, query]);

  return (
    <section className={styles.store}>
      {/* SHOWCASE */}
      <div
        className={styles.storeShowcase}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/storeShowcase.webp)`,
        }}
      >
        <div className={styles.darkTint}>
          <h1>Traieste experienta Tactik de la tine de acasa!</h1>
        </div>
      </div>
      {/* SEARCH BAR AND FILTER */}
      <div className={styles.searchBar}>
        <span>Cauta un produs:</span>
        <input type="text" onChange={searchItems} />
      </div>
      {/* PRODUCTS */}
      <div className={styles.container}>
        <InfiniteScroll
          className={styles.productsSection}
          dataLength={storeProducts.length}
          next={fetchMoreProducts}
          hasMore={true}
        >
          {storeProducts.map((product, index) => {
            return (
              <StoreProductComponent
                key={product.id}
                className={styles.product}
                product={product}
                addedToCart={addedToCart}
              />
            );
          })}
        </InfiniteScroll>
      </div>

      <div className={styles.addedToCart} ref={addedToCartRef}>
        <p>Produsul a fost adaugat in cos</p>
        <a href="/cart">Vezi cosul</a>
      </div>
    </section>
  );
};

export default ProductsComponent;
