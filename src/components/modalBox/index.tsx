import React from 'react'
import styles from './style.module.scss'
import { Icon } from 'antd-mobile'

interface IProps {
  isShow: boolean
  close: () => void
}

const ShowModal: React.FC<IProps> = ({ children, isShow, close }) => {
  return isShow ? (
    <section className={styles.modalBox}>
      <div className={styles.modalSection}>
        <Icon type="cross" size="sm" onClick={close} />
        {children}
      </div>
      <div className={styles.bc} />
    </section>
  ) : null
}

export default ShowModal
