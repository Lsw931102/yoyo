import React, { useState } from 'react'
import { Toast } from 'antd-mobile'
import { useToggleState } from '@/utils/hooks'
import { cfx, contract, address } from '@/ventor'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import styles from '@/components/modalBox/style.module.scss'

interface IProps {
  close: () => void
  freshPage: () => void
}
const CreateModal: React.FC<IProps> = ({ close, freshPage }) => {
  const [key, setGet] = useState('') // 红包口令
  const [num, setNum] = useState('') // 红包数量
  const [btnStatus, setBtn] = useToggleState(false) // true为发送中
  const confirm = async () => {
    if (btnStatus) return
    setBtn(true)
    const reg = new RegExp('^([1-9]|[1-9]\\d|100)$')
    if (!reg.test(num)) {
      Toast.info('请输入正确的红包数量！')
      return
    }
    if (key.indexOf('&') > -1 || key.indexOf('#') > -1) {
      Toast.info('口令不能输入&和#哦～')
      return
    }
    try {
      const account = cfx.Account(getLocalStorage('privateKey') || '')
      const receipt = await contract
        .constructor(key, num, address)
        .sendTransaction({ from: account })
        .confirmed()
      setBtn(false)
      const sendArr: string[] = JSON.parse(getLocalStorage('sendArr') || '[]')
      const newArr = [receipt.contractCreated, ...sendArr]
      setLocalStorage('sendArr', JSON.stringify(newArr))
      freshPage()
    } catch (err) {
      // console.log(err, 777)
      Toast.info('红包创建失败，请稍后重试～')
    }
    close()
  }

  return (
    <>
      <div className={styles.text}>请在下方输入框中</div>
      <div className={styles.text}>输入红包口令及数量，并点击确定</div>
      <div className={styles.inputs}>
        <input value={key} placeholder="请输入口令" onChange={e => setGet(e.target.value)} />
        <input
          value={num}
          placeholder="请输入数量，最大100"
          type="number"
          max={100}
          min={1}
          onChange={e => setNum(e.target.value)}
        />
      </div>
      <div
        className={styles.buttons}
        style={{ background: btnStatus ? '#d8d8d8' : '#1d72ff' }}
        onClick={btnStatus ? null : confirm}
      >
        {btnStatus ? '发送中...' : '确定'}
      </div>
      {btnStatus ? <p className={styles.tips}>红包创建预计一分钟，请耐心等待～</p> : null}
    </>
  )
}

export default CreateModal
