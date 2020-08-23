import React, { useEffect, useState } from 'react'
import { Icon } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import styles from './style.module.scss'
import { abi, cfx } from '@/ventor'
import Nodata from '@/components/noData'

const HistoryPage = () => {
  const history = useHistory()
  const [list, setList] = useState([])

  useEffect(() => {
    getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getList = async () => {
    const contract = cfx.Contract({
      abi,
      address: history.location.query.address
    })
    const list: [] = await contract.getAccountList()
    list.length && setList(list)
  }
  // 头部返回板块
  const Headers = () => {
    return (
      <div className={styles.headers}>
        <Icon type="left" color="#000000" onClick={() => history.goBack()} />
        <span>领取记录</span>
        <label />
      </div>
    )
  }
  const Lists = () => {
    return (
      <section className={styles.lists}>
        {list.map((it, index) => (
          <div className={styles.listItem} key={`history${index}`}>
            <div className={styles.listTop}>{it}</div>
          </div>
        ))}
      </section>
    )
  }
  return (
    <div className={styles.history}>
      <Headers />
      {list.length ? <Lists /> : <Nodata />}
    </div>
  )
}

export default HistoryPage
