import { IRouteConfig } from '../../typing'
import HistoryPage from '@/pages/history'

const routes: IRouteConfig[] = [
  {
    path: '/history',
    component: HistoryPage,
    exact: true,
    pageTitle: '领取记录',
    useLayout: false
  }
]

export default routes
