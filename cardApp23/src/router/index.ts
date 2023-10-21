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
      path: '/tarok',
      name: 'tarok',
      component: () => import('../views/TarokGameView.vue')
    },
    {
      path: '/tarok/rules',
      name: 'tarokRules',
      component: () => import('../views/TarokRulesView.vue')
    },
    {
      path: '/fr-tarok',
      name: 'fr-tarok',
      component: () => import('../views/FrTarokGameView.vue')
    },
    {
      path: '/fr-tarok/rules',
      name: 'fr-tarokRules',
      component: () => import('../views/FrTarokRulesView.vue')
    },
    {
      path: '/poker',
      name: 'poker',
      component: () => import('../views/PokerGameView.vue')
    },
    {
      path: '/poker/rules',
      name: 'pokerRules',
      component: () => import('../views/PokerRulesView.vue')
    },
    {
      path: '/rummy',
      name: 'rummy',
      component: () => import('../views/RummyGameView.vue')
    },
    {
      path: '/rummy/rules',
      name: 'rummyRules',
      component: () => import('../views/RummyRulesView.vue')
    },
    {
      path: '/lustik',
      name: 'lustik',
      component: () => import('../views/LustikGameView.vue')
    },
    {
      path: '/lustik/rules',
      name: 'lustikRules',
      component: () => import('../views/LustikRulesView.vue')
    }
  ]
})

export default router
