import React, { useEffect, useRef } from "react";
import styles from "./location.module.css";
import { faPhone, faMapLocation, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import animateOnScroll from "../../utilities/animateOnScroll";


const LocationComponent = () => {
  const mapArea = useRef(null);
  const infoArea = useRef(null);

  useEffect(() => {
    const animatedElements = [mapArea.current, infoArea.current];
    animateOnScroll(animatedElements, styles.show);
  })

  return (
    <section className={styles.location}>
      <div className={styles.container}>
        <div className={styles.map} ref={mapArea}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11298.910791892902!2d25.4590547!3d44.9288728!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9e4d67308898d063!2sTactik!5e0!3m2!1sen!2sro!4v1669410300258!5m2!1sen!2sro"
            width="100%"
            height="100%"
            allowFullScreen="yes"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className={styles.info} ref={infoArea}>
          <h2>Va asteptam la locatia noastra</h2>
          <hr />
          <p><span className={styles.infoIcon}><FontAwesomeIcon icon={faMapLocation}/></span>Strada Alexandru Ioan Cuza 19, Târgoviște 130007</p>
          <p><span className={styles.infoIcon}><FontAwesomeIcon icon={faPhone}/></span>0756233351</p>
          <p><span className={styles.infoIcon}><FontAwesomeIcon icon={faClock}/></span>Program</p>
          <ul className={styles.workHours}>
            <li><span>Duminica</span><span>10AM - 12AM</span></li>
            <li><span>Luni</span><span>10AM - 12AM</span></li>
            <li><span>Marti</span><span>10AM - 12AM</span></li>
            <li><span>Miercuri</span><span>10AM - 12AM</span></li>
            <li><span>Joi</span><span>10AM - 12AM</span></li>
            <li><span>Vineri</span><span>10AM - 2AM</span></li>
            <li><span>Sambata</span><span>10AM -2AM</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LocationComponent;
