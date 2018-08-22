import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Play from './views/Play.vue'
import Customize from './views/Customize.vue'
import Practice from './views/Practice.vue'
import Profile from './views/Profile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/play',
      name: 'play',
      component: Play
    },
    {
      path: '/customize',
      name: 'customize',
      component: Customize
    },
    {
      path: '/practice',
      name: 'practice',
      component: Practice
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
  ]
})
