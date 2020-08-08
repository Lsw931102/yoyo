import React, { useState } from 'react'
import cs from 'classnames'
import { Tabs } from 'antd-mobile'
import styles from './style.module.scss'
import { CreateItem, GetItem } from './components'

interface Tab {
  title: string
  sub: string
}
const HomePage = () => {
  const [isLogin] = useState(true)
  const [tabVal, setTabVal] = useState('1')

  const tabChange = (tab: Tab) => {
    setTabVal(tab.sub)
  }

  const tabs: Tab[] = [
    { title: '我创建的', sub: '1' },
    { title: '我领取的', sub: '2' }
  ]

  const lists = [
    {
      address: '0x11ed07c7070701555bfcc989',
      key: 'e43424',
      sum: 10,
      num: 20,
      got: 15
    },
    {
      address: '0x11ed07c7070701555bfcc989',
      key: 'e43424',
      sum: 10,
      num: 20,
      got: 15
    },
    {
      address: '0x11ed07c7070701555bfcc989',
      key: 'e43424',
      sum: 10,
      num: 20,
      got: 15
    },
    {
      address: '0x11ed07c7070701555bfcc989',
      key: 'e43424',
      sum: 10,
      num: 20,
      got: 15
    },
    {
      address: '0x11ed07c7070701555bfcc989',
      key: 'e43424',
      sum: 10,
      num: 20,
      got: 15
    },
    {
      address: '0x11ed07c7070701555bfcc989',
      key: 'e43424',
      sum: 10,
      num: 20,
      got: 15
    },
    {
      address: '0x11ed07c7070701555bfcc989',
      key: 'e43424',
      sum: 10,
      num: 20,
      got: 15
    }
  ]

  return (
    <div className={styles.homePage}>
      <div className={styles.topBox}>
        <div className={styles.line1}>
          <div className={styles.left}>
            <p className={styles.rest}>余额（FC）</p>
            <img src={require('../../assets/images/avatar.jpg')} alt="" className={styles.eyeIc} />
          </div>
          <div className={styles.right}>
            <img src={require('../../assets/images/avatar.jpg')} alt="" className={styles.cornIc} />
          </div>
        </div>
        <p className={styles.banlance}>{isLogin ? 2000 : '-'}</p>
        <div className={styles.line2}>
          <p className={styles.address}>{isLogin ? '0x11ed07c4…1555bfcc989' : ''}</p>
          {isLogin ? (
            <div className={styles.operateBox}>
              <div className={styles.item}>
                <img src={require('../../assets/images/avatar.jpg')} alt="" className={styles.ic} />
                <p className={styles.txt}>复制</p>
              </div>
              <div className={styles.item}>
                <img src={require('../../assets/images/avatar.jpg')} alt="" className={styles.ic} />
                <p className={styles.txt}>切换</p>
              </div>
            </div>
          ) : (
            <div className={styles.operateBox}>
              <div className={styles.item}>
                <img src={require('../../assets/images/avatar.jpg')} alt="" className={styles.ic} />
                <p className={styles.txt}>请登录</p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.line3}>
          <div className={styles.item}>
            <img src={require('../../assets/images/avatar.jpg')} alt="" className={styles.ic} />
            <div className={styles.right}>
              <p className={styles.txt1}>创建</p>
              <p className={styles.txt2}>口令红包</p>
            </div>
          </div>
          <div className={cs(styles.item, styles.item1)}>
            <img src={require('../../assets/images/avatar.jpg')} alt="" className={styles.ic} />
            <div className={styles.right}>
              <p className={styles.txt1}>领取</p>
              <p className={styles.txt2}>口令红包</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tabs}>
        <Tabs
          tabs={tabs}
          initialPage={tabVal}
          onChange={(tab: any) => {
            tabChange(tab)
          }}
        >
          <div className={styles.tabItem}>
            {lists.map((item, index) => (
              <CreateItem data={item} key={`create${index}`} />
            ))}
          </div>
          <div className={styles.tabItem}>
            {lists.map((item, index) => (
              <GetItem data={item} key={`get${index}`} />
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default HomePage
