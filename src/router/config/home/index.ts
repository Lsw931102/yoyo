import { IRouteConfig } from '../../typing'
import HomePage from '@/pages/home'

const routes: IRouteConfig[] = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    pageTitle: '首页',
    useLayout: false
  }
]

export default routes
