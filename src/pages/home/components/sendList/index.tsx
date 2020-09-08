import React, { useRef, useImperativeHandle } from 'react'
import { getLocalStorage } from '@/utils/storage'
import { ListView } from '@/components'
import CreateItem from '../createItem'
import { cfx, abi, unit } from '@/ventor'

interface IProps {
  openSetSum: (address: string) => void
  cRef: any
}
const SendList: React.FC<IProps> = ({ openSetSum, cRef }) => {
  const childRef = useRef()
  useImperativeHandle(cRef, () => ({
    pageRefresh: () => {
      // @ts-ignore
      childRef.current.onRefresh()
    }
  }))

  const getSendList = async param => {
    const { pageNum, pageSize } = param
    const sendArr: string[] = JSON.parse(getLocalStorage('sendArr') || '[]')
    let curArr = []
    let hasNext = 0
    if (sendArr.slice(pageNum * (pageSize - 1)).length < pageSize) {
      curArr = sendArr
    } else {
      curArr = sendArr.slice(pageNum * (pageSize - 1), pageNum * pageSize)
      hasNext = 1
    }
    if (curArr.length) {
      try {
        const promises = sendArr.map(async (it: string) => {
          const info = await getConInfo(it)
          return info
        })
        const infos = await Promise.all(promises)
        const sendList = []
        infos.map((info, index) => {
          sendList.push({
            address: sendArr[index],
            key: info[0],
            sum: Number(info[3]) ? unit.fromDripToCFX(Number(info[3])) : Number(info[3]),
            num: Number(info[1]),
            got: Number(info[1]) - Number(info[2]),
            status: Number(info[4])
          })
        })
        return {
          list: sendList,
          hasNext
        }
      } catch (err) {
        // console.log(err, 1111)
      }
    } else {
      return {
        list: [],
        hasNext
      }
    }
  }

  const getConInfo = async (item: string) => {
    const nowContract = cfx.Contract({
      abi,
      address: item
    })
    const info = await nowContract.getWelfareInfo(getLocalStorage('account') || '')
    return JSON.parse(JSON.stringify(info))
  }
  const row = rowData => {
    // @ts-ignore
    return <CreateItem data={rowData} setSum={openSetSum} freshPage={childRef.current.onRefresh} />
  }

  return <ListView requestFun={getSendList} renderRow={row} cRef={childRef} />
}

export default SendList
