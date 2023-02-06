import React from "react";
import styles from "./editPersonalInfo.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{1,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_REGEX = /^([0-9])\w+/;

const EditPersonalInfoComponent = (props) => {
  const userData = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState();
  const errorMsgRef = useRef(null);

  const [firstName, setFirstName] = useState(userData.user.firstName);
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  useEffect(() => {
    setFirstNameValid(NAME_REGEX.test(firstName));
  }, [firstName]);

  const [lastName, setLastName] = useState(userData.user.lastName);
  const [lastNameValid, setLastNameValid] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  useEffect(() => {
    setLastNameValid(NAME_REGEX.test(lastName));
  }, [lastName]);

  const [email, setEmail] = useState(userData.user.email);
  const [emailValid, setEmailValid] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  useEffect(() => {
    setEmailValid(EMAIL_REGEX.test(email));
  }, [email]);

  const [phone, setPhone] = useState(userData.user.phone);
  const [phoneValid, setPhoneValid] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  useEffect(() => {
    setPhoneValid(PHONE_REGEX.test(phone));
  }, [phone]);

  const updateInfo = async (e) => {
    e.preventDefault();

    if (firstNameValid && lastNameValid && emailValid && phoneValid) {
      try {
        const update = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
        };
        await userData.editUser(userData.user.id , update);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <section className={styles.editPersonalInfo}>
      <div className={styles.editPersonalInfoModal}>
        <span>
          <FontAwesomeIcon
            icon={faXmark}
            className={styles.closeModal}
            onClick={props.closeModal}
          />
        </span>

        <h2>Editeaza Datele Personale</h2>

        <form onSubmit={updateInfo}>
          {/* First name form grouo */}
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              Prenume:
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Ex: John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              aria-invalid={firstNameValid ? "false" : "true"}
              autoCapitalize="on"
              autoComplete="off"
              onFocus={() => setFirstNameFocus(true)}
              onBlur={() => setFirstNameFocus(false)}
            />
            {!firstNameValid && firstNameFocus && (
              <p className={styles.inputRules}>
                Intre 2 si 24 de caractere. Trebuie sa inceapa cu o litera.
                Caracterele speciale nu sunt acceptate
              </p>
            )}
          </div>
          {/* Last name form group */}
          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.label}>
              Nume:
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Ex: Doe"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
              aria-invalid={lastNameValid ? "false" : "true"}
              autoCapitalize="on"
              autoComplete="off"
              onFocus={() => setLastNameFocus(true)}
              onBlur={() => setLastNameFocus(false)}
            />
            {!lastNameValid && lastNameFocus && (
              <p className={styles.inputRules}>
                Intre 2 si 24 de caractere. Trebuie sa inceapa cu o litera.
                Caracterele speciale nu sunt acceptate
              </p>
            )}
          </div>

          {/* Email form group */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ex: johndoe@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoCapitalize="off"
              autoComplete="on"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            {!emailValid && emailFocus && (
              <p className={styles.inputRules}>
                Va rugam introduceti o adresa de mail valida
              </p>
            )}
          </div>

          {/* Phone form group */}
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Telefon*:
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              aria-invalid={phone ? "false" : "true"}
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
            />
            {!phoneValid && phoneFocus && (
              <p className={styles.inputRules}>
                Va rugam introduceti un numar de telefon valid!
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

export default EditPersonalInfoComponent;
