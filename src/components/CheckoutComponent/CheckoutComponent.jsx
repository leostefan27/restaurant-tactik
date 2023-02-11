import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import styles from "./checkout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { getProductData } from "../../utilities/getProductData";
import { library } from "@fortawesome/fontawesome-svg-core";
import AddAddressComponent from "../AddAddressComponent/AddAddressComponent";
import { AuthContext } from "../../contexts/AuthContext";

const ADDRESS_REGEX = /^[a-zA-Z0-9-]{0,35}$/;

const CheckoutComponent = (props) => {
  const [errorMsg, setErrorMsg] = useState();
  const errorMsgRef = useRef(null);
  const userData = useContext(UserContext);
  const auth = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [addressValue, setAddressValue] = useState();
  const productsId = props.productsId;
  const [strada, setStrada] = useState();
  const [stradaValid, setStradaValid] = useState(null);
  const [stradaFocus, setStradaFocus] = useState(false);
  useEffect(() => {
    setStradaValid(ADDRESS_REGEX.test(strada));
  }, [strada]);

  const [numarStrada, setNumarStrada] = useState();
  const [numarStradaValid, setNumarStradaValid] = useState(null);
  const [numarStradaFocus, setNumarStradaFocus] = useState(false);
  useEffect(() => {
    setNumarStradaValid(ADDRESS_REGEX.test(numarStrada));
  }, [numarStrada]);

  const [bloc, setBloc] = useState();
  const [blocValid, setBlocValid] = useState(null);
  const [blocFocus, setBlocFocus] = useState(false);
  useEffect(() => {
    setBlocValid(ADDRESS_REGEX.test(bloc));
  }, [bloc]);

  const [scara, setScara] = useState();
  const [scaraValid, setScaraValid] = useState(null);
  const [scaraFocus, setScaraFocus] = useState(false);
  useEffect(() => {
    setScaraValid(ADDRESS_REGEX.test(scara));
  }, [scara]);

  const [apartament, setApartament] = useState();
  const [apartamentValid, setApartamentValid] = useState(null);
  const [apartamentFocus, setApartamentFocus] = useState(false);
  useEffect(() => {
    setApartamentValid(ADDRESS_REGEX.test(apartament));
  }, [apartament]);

  const handleAddressChange = (event) => {
    setAddressValue(event.target.value);
  };

  useEffect(() => {
    console.log(addressValue);
  }, [addressValue]);

  const fetchProduct = async (id) => {
    try {
      const res = await getProductData(id);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function fetchAndSetProduct() {
      const productsData = await Promise.all(
        productsId.map(async (el) => {
          return await fetchProduct(el.id);
        })
      );
      setProducts(productsData);
    }
    fetchAndSetProduct();
  }, []);

  return (
    <section className={styles.checkout}>
      <div className={styles.checkoutModal}>
        <span>
          {" "}
          <FontAwesomeIcon icon={faXmark} onClick={props.exitModal} />{" "}
        </span>
        <h2>Finalizeaza Comanda</h2>
        <div className={styles.summary}>
          <h3>Rezumatul comenzii</h3>
          <div className={styles.summaryWrapper}>
            <div className={styles.products}>
              <ul>
                {products.map((product, idx) => {
                  return <li key={idx}>{product.name}</li>;
                })}
              </ul>
            </div>
            <p className={styles.price}>{`${props.price} RON`}</p>
          </div>
        </div>

        <div className={styles.selectAddress}>
          <h3>Alege o adresa</h3>
          <div className={styles.addressesWrapper}>
            {userData && auth.isAuthenticated ? (
              <>
              {userData.userAddresses.length > 0 ? <>
              {userData.userAddresses.map((address, idx) => {
                  return (
                    <div className={styles.address} key={idx}>
                      <input
                        type="radio"
                        value={`Strada ${address.strada} numarul ${address.numarStrada} bloc ${address.bloc} scara ${address.scara} apartament ${address.apartament}`}
                        checked={
                          addressValue ===
                          `Strada ${address.strada} numarul ${address.numarStrada} bloc ${address.bloc} scara ${address.scara} apartament ${address.apartament}`
                        }
                        onChange={(e) => handleAddressChange(e)}
                      />
                      <span>{`Strada ${address.strada} numarul ${address.numarStrada} bloc ${address.bloc} scara ${address.scara} apartament ${address.apartament}`}</span>
                    </div>
                  );
                })}
              </> : <><section className={styles.addAddress}>
                  <h2>
                    Introduceti o adresa sau <a href="/dashboard">adaugati una in cont</a>
                  </h2>
                  <form>
                    {/* First name form grouo */}
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName" className={styles.label}>
                        Strada*:
                      </label>
                      <input
                        type="text"
                        name="strada"
                        id="strada"
                        onChange={(e) => setStrada(e.target.value)}
                        required
                        aria-invalid={stradaValid ? "false" : "true"}
                        autoCapitalize="on"
                        autoComplete="off"
                        onFocus={() => setStradaFocus(true)}
                        onBlur={() => setStradaFocus(false)}
                      />
                      {!stradaValid && stradaFocus && (
                        <p className={styles.inputRules}>
                          Va rugam sa introduceti o strada valida!
                        </p>
                      )}
                    </div>
                    {/* Last name form group */}
                    <div className={styles.formGroup}>
                      <label htmlFor="numarStrada" className={styles.label}>
                        Numar Strada*:
                      </label>
                      <input
                        type="text"
                        name="numarStrada"
                        id="numarStrada"
                        onChange={(e) => setNumarStrada(e.target.value)}
                        required
                        aria-invalid={numarStradaValid ? "false" : "true"}
                        autoCapitalize="on"
                        autoComplete="off"
                        onFocus={() => setNumarStradaFocus(true)}
                        onBlur={() => setNumarStradaFocus(false)}
                      />
                      {!numarStradaValid && numarStradaFocus && (
                        <p className={styles.inputRules}>
                          Va rugam sa introduceti un numar de strada valid!
                        </p>
                      )}
                    </div>

                    {/* Email form group */}
                    <div className={styles.formGroup}>
                      <label htmlFor="bloc" className={styles.label}>
                        Bloc:
                      </label>
                      <input
                        type="bloc"
                        name="bloc"
                        id="bloc"
                        onChange={(e) => setBloc(e.target.value)}
                        required
                        autoCapitalize="off"
                        autoComplete="on"
                        onFocus={() => setBlocFocus(true)}
                        onBlur={() => setBlocFocus(false)}
                      />
                      {!blocValid && blocFocus && (
                        <p className={styles.inputRules}>
                          Va rugam sa introduceti un bloc valid!
                        </p>
                      )}
                    </div>

                    {/* Phone form group */}
                    <div className={styles.formGroup}>
                      <label htmlFor="scara" className={styles.label}>
                        Scara:
                      </label>
                      <input
                        type="tel"
                        name="scara"
                        id="scara"
                        onChange={(e) => setScara(e.target.value)}
                        required
                        aria-invalid={scara ? "false" : "true"}
                        onFocus={() => setScaraFocus(true)}
                        onBlur={() => setScaraFocus(false)}
                      />
                      {!scaraValid && scaraFocus && (
                        <p className={styles.inputRules}>
                          Va rugam sa introduceti o scara valida!
                        </p>
                      )}
                    </div>

                    {/* Phone form group */}
                    <div className={styles.formGroup}>
                      <label htmlFor="apartament" className={styles.label}>
                        Apartament:
                      </label>
                      <input
                        type="text"
                        name="apartament"
                        id="apartament"
                        onChange={(e) => setApartament(e.target.value)}
                        required
                        aria-invalid={apartament ? "false" : "true"}
                        onFocus={() => setApartamentFocus(true)}
                        onBlur={() => setApartamentFocus(false)}
                      />
                      {!apartamentValid && apartamentFocus && (
                        <p className={styles.inputRules}>
                          Va rugam introduceti un numar de apartament valid!
                        </p>
                      )}
                    </div>
                  </form>
              </section></>}
                
              </>
            ) : (
              <section className={styles.addAddress}>
                  <h2>
                    Introdu o adresa sau <a href="/login">intra in cont</a>
                  </h2>
                  <form>
                    {/* First name form grouo */}
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName" className={styles.label}>
                        Strada*:
                      </label>
                      <input
                        type="text"
                        name="strada"
                        id="strada"
                        onChange={(e) => setStrada(e.target.value)}
                        required
                        aria-invalid={stradaValid ? "false" : "true"}
                        autoCapitalize="on"
                        autoComplete="off"
                        onFocus={() => setStradaFocus(true)}
                        onBlur={() => setStradaFocus(false)}
                      />
                      {!stradaValid && stradaFocus && (
                        <p className={styles.inputRules}>
                          Va rugam sa introduceti o strada valida!
                        </p>
                      )}
                    </div>
                    {/* Last name form group */}
                    <div className={styles.formGroup}>
                      <label htmlFor="numarStrada" className={styles.label}>
                        Numar Strada*:
                      </label>
                      <input
                        type="text"
                        name="numarStrada"
                        id="numarStrada"
                        onChange={(e) => setNumarStrada(e.target.value)}
                        required
                        aria-invalid={numarStradaValid ? "false" : "true"}
                        autoCapitalize="on"
                        autoComplete="off"
                        onFocus={() => setNumarStradaFocus(true)}
                        onBlur={() => setNumarStradaFocus(false)}
                      />
                      {!numarStradaValid && numarStradaFocus && (
                        <p className={styles.inputRules}>
                          Va rugam sa introduceti un numar de strada valid!
                        </p>
                      )}
                    </div>

                    {/* Email form group */}
                    <div className={styles.formGroup}>
                      <label htmlFor="bloc" className={styles.label}>
                        Bloc:
                      </label>
                      <input
                        type="bloc"
                        name="bloc"
                        id="bloc"
                        onChange={(e) => setBloc(e.target.value)}
                        required
                        autoCapitalize="off"
                        autoComplete="on"
                        onFocus={() => setBlocFocus(true)}
                        onBlur={() => setBlocFocus(false)}
                      />
                      {!blocValid && blocFocus && (
                        <p className={styles.inputRules}>
                          Va rugam sa introduceti un bloc valid!
                        </p>
                      )}
                    </div>

                    {/* Phone form group */}
                    <div className={styles.formGroup}>
                      <label htmlFor="scara" className={styles.label}>
                        Scara:
                      </label>
                      <input
                        type="tel"
                        name="scara"
                        id="scara"
                        onChange={(e) => setScara(e.target.value)}
                        required
                        aria-invalid={scara ? "false" : "true"}
                        onFocus={() => setScaraFocus(true)}
                        onBlur={() => setScaraFocus(false)}
                      />
                      {!scaraValid && scaraFocus && (
                        <p className={styles.inputRules}>
                          Va rugam sa introduceti o scara valida!
                        </p>
                      )}
                    </div>

                    {/* Phone form group */}
                    <div className={styles.formGroup}>
                      <label htmlFor="apartament" className={styles.label}>
                        Apartament:
                      </label>
                      <input
                        type="text"
                        name="apartament"
                        id="apartament"
                        onChange={(e) => setApartament(e.target.value)}
                        required
                        aria-invalid={apartament ? "false" : "true"}
                        onFocus={() => setApartamentFocus(true)}
                        onBlur={() => setApartamentFocus(false)}
                      />
                      {!apartamentValid && apartamentFocus && (
                        <p className={styles.inputRules}>
                          Va rugam introduceti un numar de apartament valid!
                        </p>
                      )}
                    </div>
                  </form>
              </section>
            )}
          </div>
        </div>

        <div className={styles.payment}>
          <h3>Plata</h3>
          <div className={styles.paymentWrapper}>
            <p>Plata se va face cash sau cu cardul la livrare.</p>
          </div>
        </div>

        <div className={styles.sendOrder}>
          <h3>Observatii</h3>
          <form>
            <textarea />
            <input type="submit" value="Trimite comanda" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutComponent;
