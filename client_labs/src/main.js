// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'
import DashboardPage from './pages/DashboardPage.vue'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
    {path: '/', component: App, name: 'home'},
    {path: '/dashboard', component: DashboardPage, name: 'dashboard'}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router
}).$mount('#app')
