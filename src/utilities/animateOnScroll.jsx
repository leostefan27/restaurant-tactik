const animateOnScroll = (items, className) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
      } else {
        entry.target.classList.remove(className);
      }
    });
  });

  items.forEach((el) => observer.observe(el));
};


export default animateOnScroll;