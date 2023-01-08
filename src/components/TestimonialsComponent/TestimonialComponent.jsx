import React, { useEffect, useRef } from 'react'
import styles from './testimonials.module.css'
import animateOnScroll from "../../utilities/animateOnScroll";

const TestimonialComponent = (props) => {
  const testimonial = props.testimonial;
  const testimonialArea = useRef(null);

  useEffect(() => {
    const animatedElements = [testimonialArea.current];
    animateOnScroll(animatedElements, styles.show);
  }, [])

  return (
    <section className={styles.testimonial} ref={testimonialArea}>
      <div className={styles.testimonialImg}>
        <img src={`${process.env.PUBLIC_URL}/assets/images/testimonials/${testimonial.image_url}`} alt="" />
      </div>
      <div className={styles.testimonialText}>
        <p>"{testimonial.text}"</p>
        <p className={styles.testimonialAuthor}>{testimonial.name}</p>
      </div>
    </section>
  )
}

export default TestimonialComponent