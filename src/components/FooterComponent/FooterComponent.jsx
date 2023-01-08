import React, { useEffect, useRef, useState } from "react";
import styles from "./footer.module.css";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import animateOnScroll from "../../utilities/animateOnScroll";
import { useFetcher } from "react-router-dom";

const FooterComponent = () => {
  const [year, setYear] = useState();
  const d = new Date();

  const footerLogoArea = useRef(null);
  const footerSocialArea = useRef(null);

  useEffect(() => {
    const animatedElements = [
      footerLogoArea.current,
      footerSocialArea.current,
    ];

    animateOnScroll(animatedElements, styles.show);
  }, []);

  useEffect(() => {
    setYear(d.getFullYear());
  }, []);

  return (
    <section className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerLogo} ref={footerLogoArea}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logoTactik.webp`}
            alt=""
          />
        </div>
        <div className={styles.footerSocial} ref={footerSocialArea}>
          <a href="https://www.facebook.com/tactiktgv/" target="_blank">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.instagram.com/tactiktgv/" target="_blank">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <div className={styles.footerCopyright}>
          <p>Copyright Tactik&copy;{year}</p>
          <p>TOATE DREPTURILE REZERVATE</p>
        </div>
      </div>
    </section>
  );
};

export default FooterComponent;
