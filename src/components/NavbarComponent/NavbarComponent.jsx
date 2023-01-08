import React, { useState } from "react";
import styles from "./navbar.module.css";
import {
  faCartShopping,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";


const NavbarComponent = () => {
  const goHome = () => {
    window.location.href = "/";
  };

  const cartContext = useContext(CartContext);

  const [smallScreenNavigation, setSmallScreenNavigation] = useState(false);
  const toggleSmallScreenNavigation = () => {
    smallScreenNavigation
      ? setSmallScreenNavigation(false)
      : setSmallScreenNavigation(true);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.branding} onClick={goHome}>
          <div className={styles.brandingImg}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logoTactik.webp`}
              alt=""
            />
          </div>
          <h2>Tactik</h2>
        </div>

        {/* Normal size screen navigation */}
        <nav className={styles.navigation}>
          <ul>
            <li>
              <a href="/">Acasa</a>
            </li>
            <li>
              <a href="/store">Comanda ceva</a>
            </li>
            <li>
              <a href={"/menu"}>Meniu</a>
            </li>
          </ul>
        </nav>

        <div className={styles.toggleNavIcon}>
          <FontAwesomeIcon
            icon={faBars}
            onClick={toggleSmallScreenNavigation}
          />
        </div>

        <div className={styles.navIcons}>
          <div className={styles.cartIcon}>
            <a href="/cart">
              <FontAwesomeIcon icon={faCartShopping} />
              <small className={styles.cartCount}>
                {`(${cartContext.items.length})`}
              </small>
            </a>
          </div>

          <div className={styles.userIcon}>
          <a href="/dashboard">
            <FontAwesomeIcon icon={faUser} />
          </a>
          </div>
        </div>
      </div>

      {smallScreenNavigation && (
        <div className={styles.smallScreenNavigation}>
          <ul>
            <li>
              <a href="/">Acasa</a>
            </li>
            <li>
              <a href="/store">Comanda ceva</a>
            </li>
            <li>
              <a href={"/menu"}>Meniu</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavbarComponent;
