import React, { useState } from 'react'
import { Toast } from 'antd-mobile'
import { fcCon, unit, cfx } from '@/ventor'
import { useToggleState } from '@/utils/hooks'
import { getLocalStorage } from '@/utils/storage'
import styles from '@/components/modalBox/style.module.scss'

interface IProps {
  address: string
  freshPage: () => void
  close: () => void
}
const SetsumModal: React.FC<IProps> = ({ address, freshPage, close }) => {
  const [sum, setSum] = useState('') // 设置红包金额
  const [btnStatus, setBtn] = useToggleState(false) // true为发送中

  const confirm = async () => {
    if (btnStatus) return
    setBtn(true)
    if (!sum) {
      Toast.info('请输入正确的金额！')
      return
    }
    try {
      const account = cfx.Account(getLocalStorage('privateKey') || '')
      await fcCon
        .transfer(address, unit.fromCFXToDrip(sum))
        .sendTransaction({ from: account })
        .confirmed()

      freshPage()
    } catch (err) {
      Toast.info('设置金额失败， 请稍后重试～')
    }
    setBtn(false)
    close()
  }

  return (
    <>
      <div className={styles.text}>请输入口令红包金额，并点击确定</div>
      <div className={styles.inputs}>
        <input value={sum} placeholder="红包金额" type="number" onChange={e => setSum(e.target.value)} />
      </div>
      <div
        className={styles.buttons}
        style={{ background: btnStatus ? '#d8d8d8' : '#1d72ff' }}
        onClick={btnStatus ? null : confirm}
      >
        {btnStatus ? '设置中...' : '确定'}
      </div>
      {btnStatus ? <p className={styles.tips}>红包金额设置预计一分钟，请耐心等待～</p> : null}
    </>
  )
}

export default SetsumModal
