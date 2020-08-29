import React, { useState, useEffect, useImperativeHandle } from 'react'
import { ListView, Icon } from 'antd-mobile'
import PullToRefresh from 'rmc-pull-to-refresh' //antd rmc-pull-to-refresh

import style from './style.module.scss'
import NoData from '../noData'

/**
 * @description: 下拉刷新传参
 * @param {IProps}: IProps
 */
interface IProps {
  requestFun: Function
  requestParams?: Record<string, any>
  renderRow: Function
  renderHead?: Function
  scroHeight?: number
  cRef?: any
}

let initData: any[]
const pageSize = 10 //初始化默认页
let pageNum = 1 //第几页

export default React.memo(({ requestFun, requestParams, renderRow, renderHead, scroHeight, cRef }: IProps) => {
  const dataSourceInit = new ListView.DataSource({
    rowHasChanged: (row1: any, row2: any) => row1 !== row2
  })

  const [dataSource, setDataSource] = useState(dataSourceInit)
  const [refreshing, setRefreshing] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [heightInit] = typeof scroHeight === 'number' ? useState(scroHeight) : useState(document.documentElement.clientHeight)
  const [useBodyScroll] = useState(false)
  const [isNoResult, setIsNoResult] = useState(false)

  useEffect(() => {
    fetchData()
    if (useBodyScroll) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }, [requestParams])

  useImperativeHandle(cRef, () => ({
    listRefresh: () => {
      onRefresh()
    }
  }))

  const fetchData = async (num?: number) => {
    const pageNumVal = typeof num === 'number' ? pageNum : 1
    const paramsVal = Object.assign(
      {
        pageSize,
        // tslint:disable-next-line:trailing-comma
        pageNum: pageNumVal
      },
      // tslint:disable-next-line:trailing-comma
      requestParams
    )
    const resultResponser = await requestFun(paramsVal)
    if (resultResponser) {
      const { list, hasNext } = resultResponser
      pageNum = pageNumVal
      initData = pageNum === 1 ? list : initData.concat(list)
      if (pageNum === 1 && (!list || list.length === 0)) {
        setIsNoResult(true)
      } else {
        setIsNoResult(false)
      }
      setRefreshing(false)
      if (hasNext === 0) {
        setHasMore(false)
        setIsLoading(false)
      }
      setDataSource(dataSource.cloneWithRows(initData))
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    setIsLoading(true)
    fetchData()
  }

  const onEndReached = (event: any) => {
    if (!isLoading && !hasMore) {
      return false
    }
    setIsLoading(true)
    fetchData(++pageNum)
    setIsLoading(false)
  }

  const separator = (sectionID: any, rowID: any) => (
    <div
      key={`${sectionID}-${rowID}`}
      style={{
        backgroundColor: '#F5F5F9',
        height: 15
      }}
    />
  )

  const row = (rowData: any, sectionID: any, rowID: any) => renderRow(rowData, sectionID, rowID)

  const renderHeader = () => {
    if (typeof renderHead === 'function') {
      return renderHead()
    } else {
      return null
    }
  }

  return (
    <>
      {!isNoResult ? (
        <ListView
          className={style.ownHeader}
          key={useBodyScroll ? '0' : '1'}
          dataSource={dataSource}
          renderHeader={renderHeader}
          renderFooter={() => (
            <div style={{ padding: 10, textAlign: 'center', border: 'none' }}>{isLoading ? '加载中..' : '数据已加载全部'}</div>
          )}
          renderRow={row}
          renderSeparator={separator}
          useBodyScroll={useBodyScroll}
          style={
            useBodyScroll
              ? {}
              : {
                  height: heightInit,
                  // border: '1px solid #ddd',
                  margin: '30px 0'
                }
          }
          pullToRefresh={
            <PullToRefresh
              indicator={{
                deactivate: <div></div>,
                activate: <div className={style.freshFont}>松开立即刷新</div>,
                release: (
                  <div className={style.activeStyle}>
                    <Icon type="loading" color="#fed224" />
                  </div>
                ),
                finish: <div className={style.freshFont}></div>
              }}
              refreshing={refreshing}
              onRefresh={onRefresh}
            ></PullToRefresh>
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={10}
        />
      ) : (
        <NoData />
      )}
    </>
  )
})
