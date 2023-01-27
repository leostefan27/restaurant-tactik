import React, { useEffect, useMemo, useState } from "react";
import styles from "./menu.module.css";
import api from "../../api";

const MenuComponent = () => {
  const [micDejunProducts, setMicDejunProducts] = useState([]);
  const [startersProducts, setStartersProducts] = useState([]);
  const [salateProducts, setSalateProducts] = useState([]);
  const [supeProducts, setSupeProducts] = useState([]);
  const [mainDishesProducts, setMainDishesProducts] = useState([]);
  const [platouriProducts, setPlatouriProducts] = useState([]);
  const [pizzaProducts, setPizzaProducts] = useState([]);
  const [pasteProducts, setPasteProducts] = useState([]);
  const [burgeriProducts, setBurgeriProducts] = useState([]);
  const [garnituriProducts, setGarnituriProducts] = useState([]);
  const [salataInsotireProducts, setSalataInsotireProducts] = useState([]);
  const [sosuriProducts, setSosuriProducts] = useState([]);
  const [desertProducts, setDesertProducts] = useState([]);

  const menu = [micDejunProducts, startersProducts, salateProducts, supeProducts, mainDishesProducts, platouriProducts, pizzaProducts, pasteProducts, burgeriProducts, garnituriProducts, salataInsotireProducts, sosuriProducts, desertProducts];
  const categories = ["MIC-DEJUN", "STARTERS", "SALATE", "SUPE", "MAIN DISHES", "PLATOURI", "PIZZA", "PASTE", "BURGERI", "GARNITURI", "SALATA INSOTIRE", "SOSURI", "DESERT"];

  useEffect(() => {
    const fetchProducts = async () => {
      await api
        .get("/api/products?category=MIC-DEJUN")
        .then((res) => {
          setMicDejunProducts(res.data);
        })
        .catch((err) => console.log(err));

        await api
        .get("/api/products?category=STARTERS")
        .then((res) => {
          setStartersProducts(res.data);
        })
        .catch((err) => console.log(err));

        await api
        .get("/api/products?category=SUPE")
        .then((res) => {
          setSupeProducts(res.data);
        })
        .catch((err) => console.log(err));

        await api
        .get("/api/products?category=SALATE")
        .then((res) => {
          setSalateProducts(res.data);
        })
        .catch((err) => console.log(err));

        await api
        .get("/api/products?category=MAIN DISHES")
        .then((res) => {
          setMainDishesProducts(res.data);
        })
        .catch((err) => console.log(err));

        await api
        .get("/api/products?category=PLATOURI")
        .then((res) => {
          setPlatouriProducts(res.data);
        })
        .catch((err) => console.log(err));

        await api
        .get("/api/products?category=PIZZA")
        .then((res) => {
          setPizzaProducts(res.data);
        })
        .catch((err) => console.log(err));

        await api
        .get("/api/products?category=PASTE")
        .then((res) => {
          setPasteProducts(res.data);
        })
        .catch((err) => console.log(err));

        await api
        .get("/api/products?category=BURGERI")
        .then((res) => {
          setBurgeriProducts(res.data);
        })
        .catch((err) => console.log(err));

        await api
        .get("/api/products?category=GARNITURI")
        .then((res) => {
          setGarnituriProducts(res.data);
        })
        .catch((err) => console.log(err));

        await api
        .get("/api/products?category=SALATE INSOTIRE")
        .then((res) => {
          setSalataInsotireProducts(res.data);
        })
        .catch((err) => console.log(err));

        await api
        .get("/api/products?category=SOSURI")
        .then((res) => {
          setSosuriProducts(res.data);
        })
        .catch((err) => console.log(err));

        await api
        .get("/api/products?category=DESERT")
        .then((res) => {
          setDesertProducts(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchProducts();
  }, []);

  return (
    <section className={styles.menu}>
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/menu_bkg.webp)`,
        }}
        className={styles.menuHeader}
      >
        <div className={styles.darkTint}>
          <h1>Meniul nostru</h1>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.menuSection}>
          {menu.map((category, idx) => {
            return(
            <div  key={idx} className={styles.menuCategory}>
              <p>{categories[idx]}</p>
              <ul className={styles.foods}>
                {category.map((food, id) => {
                  return <li key={id}><span>{`${food.name}(${food.weight}g)`}</span><span>{`${food.price} RON`}</span></li>
                })}
              </ul>
            </div>);
          })}
        </div>
      </div>
    </section>
  );
};

export default MenuComponent;
