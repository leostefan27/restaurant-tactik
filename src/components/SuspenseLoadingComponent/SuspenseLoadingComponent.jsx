import React from 'react'
import styles from './suspenseLoading.module.css'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SuspenseLoadingComponent = () => {
  return (
    <section className={styles.loading}>
        <span className={styles.loadingIcon}><FontAwesomeIcon icon={faSpinner} /></span>
    </section>
  )
}

export default SuspenseLoadingComponent