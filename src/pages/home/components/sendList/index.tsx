import React, { useState, useEffect } from 'react'
import { PullToRefresh, ListView } from 'antd-mobile'
import { getLocalStorage } from '@/utils/storage'
import { useToggleState } from '@/utils/hooks'
import Nodata from '@/components/noData'
import CreateItem from '../createItem'
import { cfx, abi, unit } from '@/ventor'

interface IProps {
  openSetSum: (address: string) => void
}
const SendList: React.FC<IProps> = ({ openSetSum }) => {
  const [data, setData] = useState([])
  const [isLoading, setIsloading] = useToggleState(false) // 是否上拉加载更多中
  const [isRefresh, setIsRefresh] = useToggleState(false) // 是否下拉刷新中中
  const [hasMore, setMore] = useToggleState(true)
  const [page, setPage] = useState(0)
  const size = 10

  useEffect(() => {
    onRefresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const separator = (sectionID, rowID) => (
    <div
      key={`${sectionID}-${rowID}`}
      style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED'
      }}
    />
  )

  // 下拉刷新
  const onRefresh = () => {
    setIsRefresh(true)
    setIsloading(true)
    setPage(0)
    getSendList()
  }

  // 上拉加载更多
  const onEndReached = event => {
    if (isLoading && !hasMore) {
      return
    }
    setIsloading(true)
    setPage(page + 1)
    getSendList()
  }

  const getSendList = () => {
    const sendArr: string[] = JSON.parse(getLocalStorage('sendArr') || '[]')
    let curArr = []
    if (sendArr.length - data.length < size) {
      curArr = sendArr.slice(page * size + 1)
    } else {
      curArr = sendArr.slice(page * size + 1, (page + 1) * size + 1)
    }
    if (curArr.length) {
      const sendList = []
      sendArr.map(async (it: string) => {
        const nowContract = cfx.Contract({
          abi,
          address: it
        })
        const info = JSON.parse(JSON.stringify(await nowContract.getWelfareInfo(getLocalStorage('account') || '')))

        sendList.push({
          address: it,
          key: info[0],
          sum: Number(info[3]) ? unit.fromDripToCFX(Number(info[3])) : Number(info[3]),
          num: Number(info[1]),
          got: Number(info[1]) - Number(info[2]),
          status: Number(info[4])
        })
        if (sendList.length === sendArr.length) {
          setData([...data, ...sendList])
          setIsRefresh(false)
          setIsloading(false)
          setMore(sendArr.length > data.length ? true : false)
        }
      })
    }
  }

  return data && data.length ? (
    <ListView
      dataSource={data}
      useBodyScroll={true}
      renderHeader={() => <span>Pull to refresh</span>}
      renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>{isLoading ? 'Loading...' : 'Loaded'}</div>}
      renderRow={rowData => <CreateItem data={rowData} setSum={openSetSum} freshPage={onRefresh} />}
      renderSeparator={separator}
      // @ts-ignore
      pullToRefresh={<PullToRefresh refreshing={isRefresh} onRefresh={onRefresh} />}
      onEndReached={onEndReached}
      pageSize={10}
    />
  ) : (
    <Nodata />
  )
}

export default SendList
