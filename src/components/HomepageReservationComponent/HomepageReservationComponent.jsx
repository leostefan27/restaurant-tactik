import React from "react";
import styles from "./homepageReservation.module.css";

const HomepageReservationComponent = () => {
  return (
    <section style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/reservation_bkg.webp)`,
      }} className={styles.homepageReservation}>
      <div className={styles.darkTint}>
        <div className={styles.container}>
          <div>
            <h1>REZERVARI</h1>
            <p>
              Nu a fost niciodata mai usor sa rezervi o masa, poti face asta
              chiar acum online in doar cateva momente!!
            </p>
          </div>
          <div>
            <p>REZERVA LA NUMARUL: <span>0756233351</span></p>
          </div>

        <a href="/reservation">
          <button>REZERVA O MASA</button>
        </a>
        </div>
      </div>
    </section>
  );
};

export default HomepageReservationComponent;
