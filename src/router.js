import Vue from 'vue'
import Router from 'vue-router'

import LoginRoute from './views/login/route'
import InformationRoute from './views/info/route'
import FanCtrRoute from './views/fan/route'
import RedfishRoute from './views/redfish/route'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },

    ...LoginRoute,
    ...InformationRoute,
    ...FanCtrRoute,
    ...RedfishRoute
  ]
})
