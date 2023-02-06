import React, { useEffect, useState, useRef } from "react";
import styles from "./addAddress.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ADDRESS_REGEX = /^[a-zA-Z0-9-]{0,35}$/;

const AddAddressComponent = (props) => {
  const [errorMsg, setErrorMsg] = useState();
  const errorMsgRef = useRef(null);

  const [strada, setStrada] = useState(null);
  const [stradaValid, setStradaValid] = useState(null);
  const [stradaFocus, setStradaFocus] = useState(false);
  useEffect(() => {
    setStradaValid(ADDRESS_REGEX.test(strada));
  }, [strada]);

  const [numarStrada, setNumarStrada] = useState(null);
  const [numarStradaValid, setNumarStradaValid] = useState(null);
  const [numarStradaFocus, setNumarStradaFocus] = useState(false);
  useEffect(() => {
    setNumarStradaValid(ADDRESS_REGEX.test(numarStrada));
  }, [numarStrada]);

  const [bloc, setBloc] = useState(null);
  const [blocValid, setBlocValid] = useState(null);
  const [blocFocus, setBlocFocus] = useState(false);
  useEffect(() => {
    setBlocValid(ADDRESS_REGEX.test(bloc));
  }, [bloc]);

  const [scara, setScara] = useState(null);
  const [scaraValid, setScaraValid] = useState(null);
  const [scaraFocus, setScaraFocus] = useState(false);
  useEffect(() => {
    setScaraValid(ADDRESS_REGEX.test(scara));
  }, [scara]);

  const [apartament, setApartament] = useState(null);
  const [apartamentValid, setApartamentValid] = useState(null);
  const [apartamentFocus, setApartamentFocus] = useState(false);
  useEffect(() => {
    setApartamentValid(ADDRESS_REGEX.test(apartament));
  }, [apartament]);

  return (
    <section className={styles.addAddress}>
      <div className={styles.addAddressModal}>
        <span>
          <FontAwesomeIcon
            icon={faXmark}
            className={styles.closeModal}
            onClick={props.closeModal}
          />
        </span>

        <h2>Adauga o adresa noua</h2>

        <form onSubmit={props.addAddress}>
          {/* First name form grouo */}
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              Strada*:
            </label>
            <input
              type="text"
              name="strada"
              id="strada"
              value={strada}
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
              value={numarStrada}
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
              value={bloc}
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
              value={scara}
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
              value={apartament}
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

          <div className={styles.submitButton}>
            <input type="submit" value="Salveaza" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddAddressComponent;
