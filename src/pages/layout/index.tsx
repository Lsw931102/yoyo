import React from 'react'
import { connect } from 'react-redux'
import { namespace } from '@/models/global'
import { IRouteConfig } from '../../router/typing'
import { Route, Switch } from 'react-router-dom'
import { omitRouteRenderProperties } from '../../router/utils'
import { IDispatch } from '@/models/connect'

interface IProps extends IDispatch {
  routes: IRouteConfig[]
  loading?: boolean
  isLogin?: boolean
  userAccount?: string
}

const BasicLayout: React.FC<IProps> = ({ loading, routes }) => {
  return (
    <Switch style={{ minHeight: '100vh' }}>
      {routes.map(route => (
        <Route {...omitRouteRenderProperties(route)} key={route.path} component={route.component} path={route.path} />
      ))}
    </Switch>
  )
}
const mapStateToProps = (models: any) => ({
  ...models[namespace]
})
export default connect(mapStateToProps)(BasicLayout)
