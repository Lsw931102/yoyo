import React, { useState } from 'react'
import { Toast } from 'antd-mobile'
import { cfx, abi } from '@/ventor'
import { setLocalStorage, getLocalStorage } from '@/utils/storage'
import styles from '@/components/modalBox/style.module.scss'

interface IProps {
  freshGot: () => void
  close: () => void
}
const GetModal: React.FC<IProps> = ({ freshGot, close }) => {
  const [getKey, setGet] = useState('') // 领取红包口令

  const confirm = async () => {
    Toast.loading('领取中...', 1800)
    try {
      const infoArr = getKey.replace(/#/g, '').split('&')
      // console.log(infoArr, 898989)
      const contract = cfx.Contract({
        abi,
        address: infoArr[0]
      })
      const account = cfx.Account(getLocalStorage('privateKey') || '')
      const res = await contract
        .robWelfare(infoArr[1])
        .sendTransaction({ from: account })
        .confirmed()
      // console.log(res, 90990)
      const gotArr: string[] = JSON.parse(getLocalStorage('gotArr') || '[]')
      const newArr = [infoArr[0], ...gotArr]
      setLocalStorage('gotArr', JSON.stringify(newArr))
      freshGot()
    } catch (err) {
      Toast.info('红包领取失败，请稍后重试～')
    }
    Toast.hide()
    close()
  }

  return (
    <>
      <div className={styles.text}>请在下方输入框中</div>
      <div className={styles.text}>粘贴口令红包链接，并点击确定</div>
      <div className={styles.inputs}>
        <textarea cols={32} value={getKey} placeholder="粘贴红包" onChange={e => setGet(e.target.value)} />
      </div>
      <div className={styles.buttons} onClick={confirm}>
        确定
      </div>
    </>
  )
}

export default GetModal
