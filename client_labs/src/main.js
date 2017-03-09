// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'
import DashboardPage from './pages/DashboardPage.vue'
import LoginPage from './pages/LoginPage.vue'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.component('app', App)

const routes = [
    {path: '/', component: LoginPage, name: 'home'},
    {path: '/dashboard', component: DashboardPage, name: 'dashboard', meta: { requiresAuth: true }}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser && authUser.access_token) {
      next()
    } else {
      next({name: 'home'})
    }
  }
  next()
})

new Vue({
  router
}).$mount('#app')
