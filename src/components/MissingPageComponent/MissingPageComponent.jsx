import React from "react";
import styles from "./missingpage.module.css";

const MissingPageComponent = () => {
  return (
    <section className={styles.missingPage}>
      <div className={styles.container}>
        <h1>Oops, se pare ca aceasta pagina nu exista :(</h1>
        <p>
          <a href="/">Mergi inapoi la pagina principala</a>
        </p>
      </div>
    </section>
  );
};

export default MissingPageComponent;
