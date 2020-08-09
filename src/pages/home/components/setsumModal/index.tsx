import React, { useState } from 'react'
import styles from '@/components/modalBox/style.module.scss'

const SetsumModal = () => {
  const [sum, setSum] = useState('') // 设置红包金额

  return (
    <>
      <div className={styles.text}>请输入口令红包金额，并点击确定</div>
      <div className={styles.inputs}>
        <input value={sum} placeholder="红包金额" onChange={e => setSum(e.target.value)} />
      </div>
      <div className={styles.buttons}>确定</div>
    </>
  )
}

export default SetsumModal
