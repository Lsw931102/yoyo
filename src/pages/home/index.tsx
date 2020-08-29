import React, { useState, useEffect, useRef } from 'react'
import { useToggleState } from '@/utils/hooks'
import cs from 'classnames'
import { Tabs, Toast, Modal } from 'antd-mobile'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styles from './style.module.scss'
import { CreateModal, GetModal, SetnumModal, LoginModal, SendList, GotList } from './components'
import ShowModal from '@/components/modalBox'
import * as imgs from '@/assets/images'
import { returnAddrs } from '@/utils/common'
import { setLocalStorage, getLocalStorage } from '@/utils/storage'
import { fcCon, unit } from '@/ventor'

const alert = Modal.alert
interface Tab {
  title: string
  sub: string
}
const HomePage = () => {
  const [isLogin, setLogin] = useToggleState(getLocalStorage('account') ? true : false)
  const [loginShow, setLoginShow] = useToggleState(false)
  const [tabVal, setTabVal] = useState('1')
  const [createModal, setCreate] = useToggleState(false)
  const [getModal, setGet] = useToggleState(false)
  const [setsumModal, setSum] = useToggleState(false)
  const [restShow, setRest] = useToggleState(false)
  const [userBanlance, setBanlance] = useState('')
  const [gotList, setGotList] = useState([])
  const [curAddress, setCurAddress] = useState('') // 当前点击的项

  const sendRef = useRef()
  const gotRef = useRef()

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const init = () => {
    getuserBanlance()
  }

  const login = (account: string, privateKey: string) => {
    setLogin(true)
    localStorage.clear()
    setLocalStorage('account', account)
    setLocalStorage('privateKey', privateKey)
    setLoginShow()
  }

  const tabChange = (tab: Tab) => {
    setTabVal(tab.sub)
  }

  const openSetSum = curAddress => {
    setSum()
    setCurAddress(curAddress)
  }

  const getuserBanlance = async () => {
    if (getLocalStorage('account')) {
      const val = await fcCon.balanceOf(getLocalStorage('account') || '')
      setBanlance(unit.fromDripToCFX(val))
    }
  }

  const refreshSend = () => {
    // @ts-ignore
    sendRef.current.pageRefresh()
  }

  const refreshGot = () => {
    // @ts-ignore
    gotRef.current.pageRefresh()
  }

  const tabs: Tab[] = [
    { title: '我创建的', sub: '1' },
    { title: '我领取的', sub: '2' }
  ]

  return (
    <div className={styles.homePage}>
      <div className={styles.topBox}>
        <div className={styles.line1}>
          <div className={styles.left}>
            <p className={styles.rest}>余额（FC）</p>
            {isLogin ? (
              <img src={restShow ? imgs.eyeOpen : imgs.eyeClose} alt="" className={styles.eyeIc} onClick={() => setRest()} />
            ) : null}
          </div>
          <div className={styles.right}>
            <img src={imgs.fcIc} alt="" className={styles.cornIc} />
          </div>
        </div>
        <p className={styles.banlance}>{isLogin && restShow ? Number(userBanlance).toFixed(4) : '****'}</p>
        <div className={styles.line2}>
          <p className={styles.address}>{isLogin ? returnAddrs(getLocalStorage('account') || '') : ''}</p>
          {isLogin ? (
            <div className={styles.operateBox}>
              <CopyToClipboard text={getLocalStorage('account') || ''} onCopy={() => Toast.success('复制成功')}>
                <div className={styles.item}>
                  <img src={imgs.copyWhite} alt="" className={styles.ic} />
                  <p className={styles.txt}>复制</p>
                </div>
              </CopyToClipboard>
              <div
                className={styles.item}
                onClick={() =>
                  alert('提示', '切换后账户历史记录信息将清空，确认切换账号吗？', [
                    { text: '取消' },
                    { text: '确认', onPress: () => setLoginShow(true) }
                  ])
                }
              >
                <img src={imgs.exchange} alt="" className={styles.ic} />
                <p className={styles.txt}>切换</p>
              </div>
            </div>
          ) : (
            <div className={styles.operateBox}>
              <div className={styles.item} onClick={() => setLoginShow()}>
                <p className={styles.txt}>请点击登录</p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.line3}>
          <div className={styles.item} onClick={() => setCreate()}>
            <img src={imgs.createIc} alt="" className={styles.ic} />
            <div className={styles.right}>
              <p className={styles.txt1}>创建</p>
              <p className={styles.txt2}>口令红包</p>
            </div>
          </div>
          <div className={cs(styles.item, styles.item1)} onClick={() => setGet()}>
            <img src={imgs.getIc} alt="" className={styles.ic} />
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
            <SendList openSetSum={openSetSum} cRef={sendRef} />
          </div>
          <div className={styles.tabItem}>
            <GotList cRef={gotRef} />
          </div>
        </Tabs>
      </div>
      <ShowModal isShow={createModal} close={() => setCreate(false)}>
        <CreateModal freshPage={refreshSend} close={() => setCreate(false)} />
      </ShowModal>
      <ShowModal isShow={getModal} close={() => setGet(false)}>
        <GetModal freshGot={refreshGot} close={() => setGet(false)} />
      </ShowModal>
      <ShowModal isShow={setsumModal} close={() => setSum(false)}>
        <SetnumModal address={curAddress} freshPage={refreshSend} close={() => setSum(false)} />
      </ShowModal>
      <ShowModal isShow={loginShow} close={() => setLoginShow(false)}>
        <LoginModal login={login} />
      </ShowModal>
    </div>
  )
}

export default HomePage
