import React, { useEffect, useRef } from "react";
import styles from "./showcase.module.css";
import animateOnScroll from "../../utilities/animateOnScroll";

const HomeComponent = () => {
  const showcaseContentAreaTitle = useRef(null);
  const showcaseContentAreaButton = useRef(null);
  const aboutUsArea = useRef(null);

  useEffect(() => {
    const animatedElements = [
      showcaseContentAreaTitle.current,
      showcaseContentAreaButton.current,
      aboutUsArea.current,
    ];
    animateOnScroll(animatedElements, styles.show);
  });

  return (
    <main className={styles.showcaseWrapper}>
      <section
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/demoShowcase.webp)`,
        }}
        className={styles.showcase}
      >
        <div className={styles.darkTint}>
          <div className={styles.container}>
            <div className={styles.showcaseContent}>
              <h1 ref={showcaseContentAreaTitle}>Tactik Restaurant and Bar</h1>
              <a href="/reservation">
                <button ref={showcaseContentAreaButton}>REZERVA O MASA</button>
              </a>
            </div>
          </div>
        </div>

        <section className={styles.aboutUs} ref={aboutUsArea}>
          <h1>Despre noi</h1>
          <hr />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
            soluta ut eveniet harum repudiandae totam delectus nisi minima id
            ullam animi fuga architecto aliquid nihil, eos, cum quam maiores
            ipsum?
          </p>
        </section>
      </section>
    </main>
  );
};

export default HomeComponent;
