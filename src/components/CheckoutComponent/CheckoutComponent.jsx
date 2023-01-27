import React from 'react'
import styles from './checkout.module.css'
import api from '../../api'

const CheckoutComponent = (props) => {
  return (
    <section className={styles.checkout}>
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Finalizeaza comanda</h1>
            </div>
            <div className={styles.content}>
                <div className={styles.products}>

                </div>
                <div className={styles.address}>

                </div>
                <div className={styles.sendOrder}>
                  <p><span>Pretul final</span><span>{}</span></p>
                  <button>Trimite comanda</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CheckoutComponent