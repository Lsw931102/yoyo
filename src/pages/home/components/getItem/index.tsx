import React from 'react'
import styles from './style.module.scss'

interface IProps {
  data: { [key: string]: any }
}
const GetItem: React.FC<IProps> = ({ data }) => {
  return (
    <div className={styles.GetItem}>
      <div className={styles.addLine}>
        <p className={styles.address}>{data.address}</p>
        <div className={styles.operateBox}>
          <img src={require('../../../../assets/images/avatar.jpg')} alt="" className={styles.icItem} />
          <img src={require('../../../../assets/images/avatar.jpg')} alt="" className={styles.icItem} />
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
