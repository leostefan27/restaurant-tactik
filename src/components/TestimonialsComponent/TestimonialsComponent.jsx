import React, { useEffect, useRef, useState } from "react";
import styles from "./testimonials.module.css";
import TestimonialComponent from "./TestimonialComponent";
import animateOnScroll from "../../utilities/animateOnScroll";

const TestimonialsComponent = () => {
  const [testimonials, setTestimonials] = useState([
    {
      name: "Iliescu Leonard",
      text: "Una dintre cele mai bune pizza mancate de mine! Recomand tuturor, 11/10!",
      image_url: "iliescu_leonard.webp",
    },
    {
      name: "Boiangiu Mihai",
      text: "Noul meu restaurant preferat din oras. O sa revin cu cea mai mare placere mereu :)",
      image_url: "boiangiu_mihai.webp",
    },
  ]);

  const firstTitleArea = useRef(null);
  const secondTitleArea = useRef(null);

  useEffect(() => {
    const animatedElements = [firstTitleArea.current, secondTitleArea.current];
    animateOnScroll(animatedElements, styles.show);
  }, []);
  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.testimonialsTitle}>
          <h2 ref={firstTitleArea}>
            Cea mai tare experienta impreuna cu cea mai buna mancare din oras.
          </h2>
          <h3 ref={secondTitleArea}>
            Nu ne crezi? Uite ce zic clientii nostri!
          </h3>
        </div>
        <hr />
        {testimonials.map((e, idx) => {
          return <TestimonialComponent key={idx} testimonial={e} />;
        })}
      </div>
    </section>
  );
};

export default TestimonialsComponent;
