import React from "react";
import styles from "./homepageOrder.module.css";

const HomepageOrderComponent = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/order_bkg.webp)`,
      }}
      className={styles.homepageOrder}
    >
      <div className={styles.darkTint}>
        <div className={styles.container}>
          <div>
            <h1>
              Vrei sa incerci capodoperele bucatarului nostru din confortul
              casei tale?
            </h1>
          </div>
          <div className={styles.orderButtons}>
            <a href="/store">
              <button className={styles.orderNowButton}>COMANDA ACUM</button>
            </a>
            <a
              href="/menu"
            >
              <button className={styles.seeMenuButton}>VEZI MENIUL</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageOrderComponent;
