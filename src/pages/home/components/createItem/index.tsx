import React from 'react'
import { Link } from 'react-router-dom'
import { Toast, Modal } from 'antd-mobile'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { returnAddrs } from '@/utils/common'
import styles from './style.module.scss'
import * as imgs from '@/assets/images'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import { abi, cfx } from '@/ventor'
import { number } from 'prop-types'

const alert = Modal.alert

interface IProps {
  data: { [key: string]: any }
  setSum: (address: string) => void
  freshPage: () => void
}
const CreateItem: React.FC<IProps> = ({ data, setSum, freshPage }) => {
  const contract = cfx.Contract({
    abi,
    address: data.address
  })
  const account = cfx.Account(getLocalStorage('privateKey') || '')
  // 删除localstorage中的数据
  const del = () => {
    const sendArr: string[] = JSON.parse(getLocalStorage('sendArr') || '[]')
    const newArr = sendArr.filter(it => it !== data.address)
    setLocalStorage('sendArr', JSON.stringify(newArr))
  }

  // 发出红包
  const send = async () => {
    Toast.loading('发送中...', 1800)
    try {
      await contract
        .send()
        .sendTransaction({ from: account })
        .confirmed()
      freshPage()
      Toast.hide()
    } catch (err) {
      Toast.hide()
      Toast.info('发出红包失败，请稍后重试～')
    }
  }

  // 销毁红包
  const withdraw = async () => {
    Toast.loading('销毁中...', 1800)
    try {
      await contract
        .haiyoushui()
        .sendTransaction({ from: account })
        .confirmed()

      // console.log('销毁成功')
      del()
      freshPage()
      Toast.hide()
    } catch (err) {
      // console.log(err)
      Toast.hide()
      Toast.info('销毁红包失败，请稍后重试～')
    }
  }

  return (
    <div className={styles.CreateItem} key={data.address}>
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
              alert('提示', '红包一旦删除将无法找回，确定删除吗？', [{ text: '取消' }, { text: '确认', onPress: () => del() }])
            }
          />
        </div>
      </div>
      <p className={styles.key}>口令：{data.key}</p>
      <div className={styles.numLine}>
        <div className={styles.item}>
          <p>金额：{data.sum ? <>{data.sum.length > 4 ? Number(data.sum).toFixed(4) : data.sum}FC</> : 0}</p>
          {!data.status && !data.sum ? (
            <div className={styles.setNum} onClick={() => setSum(data.address)}>
              设置金额
            </div>
          ) : null}
        </div>
        <p>数量：{data.num}个</p>
        <p>已领：{data.got}个</p>
      </div>
      <div className={styles.moreLine}>
        <p className={styles.title}>更多：</p>
        <div className={styles.operateBox}>
          {!data.status ? (
            <div className={styles.item} onClick={send}>
              <img src={imgs.postIc} alt="" className={styles.icItem} />
              <p className={styles.icTxt}>发出红包</p>
            </div>
          ) : null}
          <div
            className={styles.item}
            onClick={() =>
              alert('提示', '红包一旦销毁将无法找回，确定销毁吗？（红包销毁后将退回FC到钱包）', [
                { text: '取消' },
                { text: '确认', onPress: () => withdraw() }
              ])
            }
          >
            <img src={imgs.repealIc} alt="" className={styles.icItem} />
            <p className={styles.icTxt}>销毁红包</p>
          </div>
          <Link
            className={styles.item}
            to={{
              pathname: '/history',
              query: {
                address: data.address
              }
            }}
          >
            <img src={imgs.receiveIc} alt="" className={styles.icItem} />
            <p className={styles.icTxt}>领取记录</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CreateItem
