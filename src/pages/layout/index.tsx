import React from 'react'
import { Layout, Spin } from 'antd'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { namespace } from '@/models/global'
import { IRouteConfig } from '../../router/typing'
import { Route, Switch } from 'react-router-dom'
import { omitRouteRenderProperties } from '../../router/utils'
import { IDispatch } from '@/models/connect'
import styles from './style.module.scss'
import Images from '@/assets/images'
import 'antd/dist/antd.css'
const { Header, Sider, Content } = Layout

interface IProps extends IDispatch {
  routes: IRouteConfig[]
  loading?: boolean
  isLogin?: boolean
  userAccount?: string
}

const BasicLayout: React.FC<IProps> = ({ loading, routes }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="site-layout-background" />
      <Content className={styles.content}>
        <div id="pageWrap">
          {loading && (
            <div className={styles.loading}>
              <Spin tip="加载中..." size="large" />
            </div>
          )}
          <Switch>
            {routes.map(route => (
              <Route {...omitRouteRenderProperties(route)} key={route.path} component={route.component} path={route.path} />
            ))}
          </Switch>
        </div>
      </Content>
    </Layout>
  )
}
const mapStateToProps = (models: any) => ({
  ...models[namespace]
})
export default connect(mapStateToProps)(BasicLayout)
