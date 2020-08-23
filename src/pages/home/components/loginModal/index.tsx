import React, { useState } from 'react'
import { cfx } from '@/ventor'
import styles from '@/components/modalBox/style.module.scss'

interface IProps {
  login: (account: string, privateKey: string) => void
}
const LoginModal: React.FC<IProps> = ({ login }) => {
  const [privateKey, setprivate] = useState('') // 领取红包口令

  const confirm = () => {
    const account = cfx.Account(privateKey)
    login(account, privateKey)
  }

  return (
    <>
      <div className={styles.text}>请输入你的私钥</div>
      <div className={styles.inputs}>
        <input value={privateKey} placeholder="请输入私钥" onChange={e => setprivate(e.target.value)} />
      </div>
      <div className={styles.buttons} onClick={confirm}>
        确定
      </div>
    </>
  )
}

export default LoginModal
