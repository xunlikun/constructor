import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

import { getToken } from '@/utils/auth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login',
      beforeEnter(to,from,next){
        if(getToken()){
          next('/manager')
        }else{
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login'),
      beforeEnter(to,from,next){
        if(getToken()){
          next('/manager')
        }else{
          next()
        }
      }
    },
    {
      path: '/forget',
      name: 'Forget',
      component: () => import('@/views/forget')
    },
    {
      path: '/reset',
      name: 'Reset',
      component: () => import('@/views/reset')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register')
    },
    {
      path:'/companyInfo',
      name:'CompanyInfo',
      component: () => import('@/views/companyInfo')
    },
    {
      path:'/certification',
      name:'Certification',
      component: () => import('@/views/certification')
    },
    {
      path: '/waitingPeriod',
      name: 'WaitingPeriod',
      component: () => import('@/views/waitingPeriod')
    },
    {
      path: '/manager',
      name: 'index',
      component: () => import('@/layout'),
      redirect:'/manager/project',
      beforeEnter(to,from,next){
        if(store.getters.token){
          next()
        }else{
          store.commit('DELETE_TOKEN')
          next('/')
        }
      },
      children:[
        {
          path: '/manager/project',
          name:'Project',
          component: () => import('@/components/manager/project'),
          meta:{keepAlive:true}
        },
        {
          path: '/manager/project/projectDetail',
          name:'ProjectDetail',
          component: () => import('@/components/manager/project/projectDetail'),
          meta:{keepAlive:true}
        },
        {
          path: '/manager/contract',
          name:'Contract',
          component: () => import('@/components/manager/contract'),
          meta:{keepAlive:true}
        },
        {
          path:'/manager/contract/contractDetail',
          name:"ContractDetail",
          component: () => import('@/components/manager/contract/contractDetail'),
          meta:{keepAlive:true}
        },
        {
          path: '/manager/employee',
          name:'Employee',
          component: () => import('@/components/manager/employee'),
          meta:{keepAlive:true}
        }
      ]
    }
  ]
})
