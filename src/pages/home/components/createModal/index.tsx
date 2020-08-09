import React, { useState } from 'react'
import styles from '@/components/modalBox/style.module.scss'

const CreateModal = () => {
  const [getKey, setGet] = useState('') // 领取红包口令

  return (
    <>
      <div className={styles.text}>请在下方输入框中</div>
      <div className={styles.text}>粘贴口令红包链接，并点击确定</div>
      <div className={styles.inputs}>
        <input value={getKey} placeholder="粘贴红包" onChange={e => setGet(e.target.value)} />
      </div>
      <div className={styles.buttons}>确定</div>
    </>
  )
}

export default CreateModal
