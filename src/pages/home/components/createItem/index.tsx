import React from 'react'
import styles from './style.module.scss'

interface IProps {
  data: { [key: string]: any }
}
const CreateItem: React.FC<IProps> = ({ data }) => {
  return (
    <div className={styles.CreateItem}>
      <div className={styles.addLine}>
        <p className={styles.address}>{data.address}</p>
        <div className={styles.operateBox}>
          <img src={require('../../../../assets/images/avatar.jpg')} alt="" className={styles.icItem} />
          <img src={require('../../../../assets/images/avatar.jpg')} alt="" className={styles.icItem} />
        </div>
      </div>
      <p className={styles.key}>口令：{data.key}</p>
      <div className={styles.numLine}>
        <div className={styles.item}>
          <p>领取：{data.sum}FC</p>
          <p className={styles.setNum}>设置金额</p>
        </div>
        <p>数量：{data.num}个</p>
        <p>已领：{data.got}个</p>
      </div>
      <div className={styles.moreLine}>
        <p className={styles.title}>更多：</p>
        <div className={styles.operateBox}>
          <div className={styles.item}>
            <img src={require('../../../../assets/images/avatar.jpg')} alt="" className={styles.icItem} />
            <p className={styles.icTxt}>发出红包</p>
          </div>
          <div className={styles.item}>
            <img src={require('../../../../assets/images/avatar.jpg')} alt="" className={styles.icItem} />
            <p className={styles.icTxt}>撤回红包</p>
          </div>
          <div className={styles.item}>
            <img src={require('../../../../assets/images/avatar.jpg')} alt="" className={styles.icItem} />
            <p className={styles.icTxt}>领取记录</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateItem
