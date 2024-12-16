import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gamesel',
      name: 'gameSelect',
      component: () => import('../views/GameSelect.vue'),
      props: true
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/game',
      name: 'gameTable',
      component: () => import('../views/TarokGameView.vue'),
      props: true
    },
    {
      path: '/rules',
      name: 'tarokRules',
      component: () => import('../views/TarokRulesView.vue')
    },
    {
      path: '/add',
      name: 'AddElement',
      component: () => import('../views/AddElement.vue')
    },
    
  ]
})

export default router
