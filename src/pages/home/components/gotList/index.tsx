import React, { useRef, useImperativeHandle } from 'react'
import { getLocalStorage } from '@/utils/storage'
import { ListView } from '@/components'
import GetItem from '../getItem'
import { cfx, abi, unit } from '@/ventor'

interface IProps {
  cRef: any
}
const SendList: React.FC<IProps> = ({ cRef }) => {
  const childRef = useRef()
  useImperativeHandle(cRef, () => ({
    pageRefresh: () => {
      // @ts-ignore
      childRef.current.onRefresh()
    }
  }))

  const getSendList = async param => {
    const { pageNum, pageSize } = param
    const gotArr: string[] = JSON.parse(getLocalStorage('gotArr') || '[]')
    let curArr = []
    let hasNext = 0
    if (gotArr.slice(pageNum * (pageSize - 1)).length < pageSize) {
      curArr = gotArr
    } else {
      curArr = gotArr.slice(pageNum * (pageSize - 1), pageNum * pageSize)
      hasNext = 1
    }
    if (curArr.length) {
      try {
        const promises = gotArr.map(async (it: string) => {
          const info = await getConInfo(it)
          return info
        })
        const infos = await Promise.all(promises)
        // console.log(infos, 45454)
        const gotList = []
        infos.map((info, index) => {
          gotList.push({
            address: gotArr[index],
            key: info[0],
            sum: Number(info[3]) ? unit.fromDripToCFX(Number(info[3])) : Number(info[3]),
            num: Number(info[1]),
            got: Number(info[1]) - Number(info[2]),
            status: Number(info[4])
          })
        })
        // console.log(gotList, 66666)
        return {
          list: gotList,
          hasNext
        }
      } catch (err) {
        // console.log(err, 1111)
      }
    } else {
      return null
    }
  }

  const getConInfo = async (item: string) => {
    const nowContract = cfx.Contract({
      abi,
      address: item
    })
    // console.log(nowContract, 333)
    const info = await nowContract.getWelfareInfo(getLocalStorage('account') || '')
    // console.log(info, JSON.parse(JSON.stringify(info)), 9999)
    return JSON.parse(JSON.stringify(info))
  }
  const row = rowData => {
    // @ts-ignore
    return <GetItem data={rowData} freshPage={childRef.current.onRefresh} />
  }

  return <ListView requestFun={getSendList} renderRow={row} cRef={childRef} />
}

export default SendList
