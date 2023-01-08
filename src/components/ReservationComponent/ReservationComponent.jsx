import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./reservation.module.css";
import emailjs from 'emailjs-com'

const NAME_REGEX = /^[a-zA-Z- ]+$/;
const HOUR_REGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
const PERSON_NUMBER_REGEX = /^([0-9]{0,3})/;
const PHONE_REGEX = /^([0-9])\w+/;

const ReservationComponent = () => {
  // DATE
  const [date, setDate] = useState();

  // HOUR
  const [hour, setHour] = useState();
  const [hourValid, setHourValid] = useState(false);
  const [hourFocus, setHourFocus] = useState(false);

  useEffect(() => {
    setHourValid(HOUR_REGEX.test(hour));
  }, [hour]);

  // NUMBER OF PERSONS
  const [personNumber, setPersonNumber] = useState();
  const [personNumberValid, setPersonNumberValid] = useState(false);
  const [personNumberFocus, setPersonNumberFocus] = useState(false);

  useEffect(() => {
    setPersonNumberValid(PERSON_NUMBER_REGEX.test(personNumber));
  }, [personNumber]);

  // NAME
  const [name, setName] = useState();
  const [nameValid, setNameValid] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  useEffect(() => {
    setNameValid(NAME_REGEX.test(name));
  }, [name]);

  // PHONE
  const [phone, setPhone] = useState();
  const [phoneValid, setPhoneValid] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  useEffect(() => {
    setPhoneValid(PHONE_REGEX.test(phone));
  }, [phone]);

  // HOUR
  const [message, setMessage] = useState("");
  const [messageValid, setMessageValid] = useState(false);
  const [messageFocus, setMessageFocus] = useState(false);

  useEffect(() => {
    setMessageValid(message.length < 10000);
  }, [message]);

  const templateParams = {
    name: name,
    phone: phone,
    personNumber: personNumber,
    date: date,
    hour: hour,
    message: message,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send("service_v4acngr", "template_e0jxjf2", templateParams, 'B9nlgZwF8oCx0IyId').then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );

    e.target.reset();
  };

  return (
    <section
      className={styles.reservation}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/backgrounds/reservationShowcase.webp)`,
      }}
    >
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Rezerva o masa</h1>
          {/* Date first group */}
          <div className={styles.formGroup}>
            <label htmlFor="date" className={styles.label}>
              Data*:
            </label>
            <input type="date" name="date" id="date" onChange={(e) => {setDate(e.target.value)}} required />
          </div>
          {/* Hour form group */}
          <div className={styles.formGroup}>
            <label htmlFor="hour" className={styles.label}>
              Ora*:
            </label>
            <input
              type="text"
              name="hour"
              id="hour"
              onChange={(e) => setHour(e.target.value)}
              required
              aria-invalid={hourValid ? "false" : "true"}
              autoComplete="off"
              onFocus={() => setHourFocus(true)}
              onBlur={() => setHourFocus(false)}
            />
            {!hourValid && hourFocus && (
              <p className={styles.inputRules}>
                Formatul acceptat este HH:mm(ex: 12:30)
              </p>
            )}
          </div>

          {/* Number of persons form group */}
          <div className={styles.formGroup}>
            <label htmlFor="personNumber" className={styles.label}>
              Numarul de persoane*:
            </label>
            <input
              type="text"
              name="personNumber"
              id="personNumber"
              onChange={(e) => setPersonNumber(e.target.value)}
              required
              aria-invalid={personNumber ? "false" : "true"}
              onFocus={() => setPersonNumberFocus(true)}
              onBlur={() => setPersonNumberFocus(false)}
            />
            {!personNumberValid && personNumberFocus && (
              <p className={styles.inputRules}>
                Va rugam introduceti un numar valid de persoane(se accepta doar
                cifre!)
              </p>
            )}
          </div>

          {/* Name form group */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Nume*:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              required
              aria-invalid={name ? "false" : "true"}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
            {!nameValid && nameFocus && (
              <p className={styles.inputRules}>
                Va rugam introduceti un nume valid!
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

          {/* Message form group */}
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Informatii aditionale:
            </label>
            <textarea
              type="text"
              name="message"
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={message ? "false" : "true"}
              onFocus={() => setMessageFocus(true)}
              onBlur={() => setMessageFocus(false)}
            />
            {!messageValid && messageFocus && (
              <p className={styles.inputRules}>
                Ati depasit numarul de caractere!
              </p>
            )}
          </div>

          <input
            type="submit"
            className={styles.submitReservation}
            value="Rezerva"
          />
        </form>
      </div>
    </section>
  );
};

export default ReservationComponent;
