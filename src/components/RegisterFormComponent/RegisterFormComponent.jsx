import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./register.module.css";
import AuthContext from '../../contexts/AuthContext';

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{1,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PSW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.?%^]).{7,23}$/;

const RegisterFormComponent = () => {
  const auth = useContext(AuthContext);
  // First name
  // States
  const [firstName, setFirstName] = useState();
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  useEffect(() => {
    setFirstNameValid(NAME_REGEX.test(firstName));
  }, [firstName]);
  // Refs
  const firstNameRef = useRef(null);

  // Last name
  // States
  const [lastName, setLastName] = useState();
  const [lastNameValid, setLastNameValid] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  useEffect(() => {
    setLastNameValid(NAME_REGEX.test(lastName));
  }, [lastName]);
  // Refs
  const lastNameRef = useRef(null);

  //   Email
  // States
  const [email, setEmail] = useState();
  const [emailValid, setEmailValid] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  useEffect(() => {
    setEmailValid(EMAIL_REGEX.test(email));
  }, [email]);
  // Refs
  const emailRef = useRef(null);

  //   Password
  // States
  const [psw, setPsw] = useState();
  const [pswValid, setPswValid] = useState(false);
  const [pswFocus, setPswFocus] = useState(false);

  useEffect(() => {
    setPswValid(PSW_REGEX.test(psw));
  }, [psw]);
  // Refs
  const pswRef = useRef(null);

  //   Confirm password
  // States
  const [confirmPsw, setConfirmPsw] = useState();
  const [confirmPswValid, setConfirmPswValid] = useState(false);
  const [confirmPswFocus, setConfirmPswFocus] = useState(false);

  useEffect(() => {
    setConfirmPswValid(confirmPsw === psw);
  }, [confirmPsw]);

  // Errors
  // States
  const [errorMsg, setErrorMsg] = useState();
  const errorMsgRef = useRef(null);

  // @This function handles the submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = NAME_REGEX.test(firstName);
    const v2 = NAME_REGEX.test(lastName);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = PSW_REGEX.test(psw);

    if (!v1 || !v2 || !v3 || !v4) {
      setErrorMsg("Va rugam completati corect toate campurile");
      return;
    }
    auth.registerUser(firstName, lastName, email, psw);
  };

  return (
    <section className={styles.registerForm}>
      <div className={styles.container}>
        <h1>Creeaza un cont</h1>
        <p className={styles.errorMsg}>{errorMsg}</p>
        <form onSubmit={handleSubmit}>
          {/* First name form grouo */}
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              Nume:
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Ex: John"
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
            <label htmlFor="firstName" className={styles.label}>
              Prenume:
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Ex: Doe"
              onChange={(e) => setLastName(e.target.value)}
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

          {/* Password form group */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Parola
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Parola..."
              onChange={(e) => setPsw(e.target.value)}
              required
              onFocus={() => setPswFocus(true)}
              onBlur={() => setPswFocus(false)}
            />
            {!pswValid && pswFocus && (
              <p className={styles.inputRules}>
                Intre 8 si 24 de caractere. Minim o litera mare, minim un numar,
                minim un caracter special. Caractere speciale acceptate:
                !@#$%.?%^
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirma parola
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirma parola..."
              onChange={(e) => setConfirmPsw(e.target.value)}
              required
              onFocus={() => setConfirmPswFocus(true)}
              onBlur={() => setConfirmPswFocus(false)}
            />
            {!confirmPswValid && confirmPswFocus && (
              <p className={styles.inputRules}>Parolele nu se potrivesc!</p>
            )}
          </div>

          <div className={styles.submitButton}>
            <input
              disabled={
                !firstNameValid || !lastNameValid || !emailValid || !pswValid
              }
              type="submit"
              value="Creeaza cont"
            />
          </div>
        </form>

        <div className={styles.alreadyRegistred}>
          <p>Deja ai un cont?</p>
          <a href="/login">Logheaza-te aici</a>
        </div>
      </div>
    </section>
  );
};

export default RegisterFormComponent;
