import React from 'react'
import styles from './style.module.scss'
import { Icon } from 'antd-mobile'
import cs from 'classnames'

const ShowModal = ({ id }) => {
  return (
    <section className={styles.modalBox}>
      {id === 1 ? <ModalForCreate /> : id === 2 ? <ModalForPaste /> : <ModalForEnterAmount />}
      <div className={styles.bc} />
    </section>
  )
}

// 创建口令红包
const ModalForCreate = () => {
  const command = ''
  const num = ''
  return (
    <section className={styles.modalSection}>
      <Icon type="cross" size="sm" />
      <div className={styles.text}>您将创建一个口令红包</div>
      <div className={styles.text}>请输入红包口令及数量，并点击创建</div>
      <div className={styles.inputs}>
        <input value={command} placeholder="请输入口令" />
        <input value={num} placeholder="请输入数量" />
      </div>
      <div className={styles.buttons}>创建</div>
    </section>
  )
}

// 粘贴红包
const ModalForPaste = () => {
  const command = ''
  return (
    <section className={cs(styles.modalSection, styles.modalSection2)}>
      <Icon type="cross" size="sm" />
      <div className={styles.text}>请在下方输入框中</div>
      <div className={styles.text}>粘贴口令红包链接，并点击确定</div>
      <div className={styles.inputs}>
        <input value={command} placeholder="粘贴红包" />
      </div>
      <div className={styles.buttons}>确定</div>
    </section>
  )
}

// 输入红包金额
const ModalForEnterAmount = () => {
  const num = ''
  return (
    <section className={cs(styles.modalSection, styles.modalSection3)}>
      <Icon type="cross" size="sm" />
      <div className={styles.text}>请输入口令红包金额，并点击确定</div>
      <div className={styles.inputs}>
        <input value={num} placeholder="红包金额" />
      </div>
      <div className={styles.buttons}>确定</div>
    </section>
  )
}

export default ShowModal
