import React from 'react'
import styles from './style.module.scss'

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.topBox}>
        <div className={styles.line1}>
          <div className={styles.left}>
            <p>余额（FC）</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
