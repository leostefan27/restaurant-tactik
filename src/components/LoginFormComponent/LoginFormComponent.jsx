import React, { useState } from "react";
import styles from "./loginform.module.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../api";

const LoginFormComponent = () => {
  const [email, setEmail] = useState();
  const [psw, setPsw] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const auth = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.loginUser(email, psw);
  };

  return (
    <section className={styles.loginForm}>
      <div className={styles.container}>
        <h1>Intra in cont</h1>
        <p className={styles.errorMsg}>{errorMsg}</p>
        <form onSubmit={handleSubmit}>
          {/* Email form group */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="on"
              value={email}
            />
          </div>
          {/* Password form group */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPsw(e.target.value)}
              value={psw}
            />
          </div>

          <div className={styles.submitButton}>
            <input type="submit" value="Intra in cont" />
          </div>
        </form>
        <p className={styles.forgotPassword}>
          <a href="/register">Mi-am uitat parola</a>
        </p>
      </div>
    </section>
  );
};

export default LoginFormComponent;
