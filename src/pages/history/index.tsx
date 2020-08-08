import React from 'react'
import { Icon } from 'antd-mobile'
import styles from './style.module.scss'
import '@/utils/common/indetx'
import { returnAddrs } from '@/utils/common/indetx'

const HistoryPage = () => {
  // 模拟数据
  const lists = [
    {
      id: 1,
      addrs: '0x11ed07c41231231555bfcc989',
      price: 146,
      unit: 'FC',
      time: '2020/09/07 22:00'
    },
    {
      id: 2,
      addrs: '0x11ed07c41231231555bfcc989',
      price: 246,
      unit: 'FC',
      time: '2020/09/07 22:00'
    },
    {
      id: 3,
      addrs: '0x11ed07c41231231555bfcc989',
      price: 346,
      unit: 'FC',
      time: '2020/09/07 22:00'
    }
  ]
  // 头部返回板块
  const Headers = () => {
    return (
      <>
        <section className={styles.headers}>
          <Icon type="left" color="#000000" />
          <span>领取记录</span>
          <label />
        </section>
      </>
    )
  }
  const Lists = () => {
    return <section className={styles.lists}>{ReturnListItem(lists[0])}</section>
  }
  const ReturnListItem = item => {
    return (
      <div className={styles.listItem}>
        <div className={styles.listTop}>{returnAddrs(item.addrs)}</div>
        <div className={styles.listBottom}>
          <div className={styles.price}>
            {item.price}
            {item.unit}
          </div>
          <div className={styles.time}>{item.time}</div>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.history}>
      <Headers />
      <Lists />
    </div>
  )
}

export default HistoryPage
