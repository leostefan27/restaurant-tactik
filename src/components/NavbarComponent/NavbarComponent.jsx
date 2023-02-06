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
import { AuthContext } from "../../contexts/AuthContext";

const NavbarComponent = () => {
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);

  const [smallScreenNavigation, setSmallScreenNavigation] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleSmallScreenNavigation = () => {
    smallScreenNavigation
      ? setSmallScreenNavigation(false)
      : setSmallScreenNavigation(true);
  };

  const toggleShowUserMenu = () => {
    showUserMenu ? setShowUserMenu(false) : setShowUserMenu(true);
  };

  const goHome = () => {
    window.location.href = "/";
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
            <span>
              <FontAwesomeIcon icon={faUser} onClick={toggleShowUserMenu} />
            </span>
            {showUserMenu && (
              <div
                className={styles.userMenu}
                onMouseLeave={() => {
                  setShowUserMenu(false);
                }}
              >
                {authContext.isAuthenticated ? (
                  <ul>
                    <a href="/dashboard">
                      <li>Contul Meu</li>
                    </a>

                    <a href="/">
                      <li onClick={authContext.logoutUser}>Iesi din cont</li>
                    </a>
                  </ul>
                ) : (
                  <ul>
                    <a href="/login">
                      <li>Intra in cont</li>
                    </a>

                    <a href="/register">
                      <li>Creeaza un cont</li>
                    </a>
                  </ul>
                )}
              </div>
            )}
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
