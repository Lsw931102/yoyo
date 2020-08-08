import React from 'react'
import Router from './router'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import dva from './utils/dva'
import models from './models'

const createHistory = require('history').createBrowserHistory
export const history = createHistory()
export const routerReducer = connectRouter(history)
export const routerMiddlewareForDispatch = routerMiddleware(history)

export const app = dva({
  models,
  initState: {},
  extraReducers: { router: routerReducer },
  onAction: [routerMiddlewareForDispatch]
})

const f: React.FC = app.start(
  <ConnectedRouter history={history}>
    <Router />
  </ConnectedRouter>
)

export default f
