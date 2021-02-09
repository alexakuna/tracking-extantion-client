import Vue from 'vue'
import VueRouter from 'vue-router'
import jwt from 'jsonwebtoken'
import axios from "axios";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: "main"},
    component: () => import('../views/Home')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let expireTime = ''
  let currentTime = ''
  let token = localStorage.getItem('token')
  if(token) {
    token = token.replace('Bearer', '')
    const decoded = jwt.decode(token.trim(), {complete: true})
    expireTime = decoded.payload.exp
    currentTime = Math.floor(Date.now() / 1000)
  }
  if (to.name !== 'login' && currentTime >= expireTime) {
    axios.post('http://localhost:3000/api/auth/logout', {id: localStorage.getItem('seller-id')})
        .then(data => {
          console.log(data)
          localStorage.clear()
        })
        .catch(e => console.log(e))
    next('/login?message=session-expired')
  } else {
    next()
  }
})

export default router
