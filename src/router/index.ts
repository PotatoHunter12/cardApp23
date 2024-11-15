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
      path: '/game',
      name: 'tarok',
      component: () => import('../views/TarokGameView.vue')
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
