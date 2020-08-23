import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Toast, Modal } from 'antd-mobile'
import styles from './style.module.scss'
import * as imgs from '@/assets/images'
import { returnAddrs } from '@/utils/common'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'

const alert = Modal.alert

interface IProps {
  data: { [key: string]: any }
  refreshPage: () => void
}
const GetItem: React.FC<IProps> = ({ data, refreshPage }) => {
  // 删除localstorage中的数据
  const del = () => {
    const sendArr: string[] = JSON.parse(getLocalStorage('gotArr') || '[]')
    const newArr = sendArr.filter(it => it !== data.address)
    setLocalStorage('gotArr', JSON.stringify(newArr))
    refreshPage()
  }

  return (
    <div className={styles.GetItem}>
      <div className={styles.addLine}>
        <p className={styles.address}>{returnAddrs(data.address)}</p>
        <div className={styles.operateBox}>
          <CopyToClipboard text={`####${data.address}&${data.key}####`} onCopy={() => Toast.success('复制成功')}>
            <img src={imgs.copyBlack} alt="" className={styles.icItem} />
          </CopyToClipboard>
          <img
            src={imgs.del}
            alt=""
            className={styles.icItem}
            onClick={() =>
              alert('提示', '记录一旦删除将无法找回，确定删除吗？', [{ text: '取消' }, { text: '确认', onPress: () => del() }])
            }
          />
        </div>
      </div>
      <p className={styles.key}>口令：{data.key}</p>
      <div className={styles.numLine}>
        <p>领取：{data.sum}FC</p>
        <p>数量：{data.num}个</p>
        <p>已领：{data.got}个</p>
      </div>
    </div>
  )
}

export default GetItem
