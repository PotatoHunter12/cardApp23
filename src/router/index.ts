import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import ProfileView from '@/views/ProfileView.vue';
import SwaggerUIPage from "@/views/SwaggerUIPage.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/gamesel',
      name: 'gameSelect',
      component: () => import('../views/GameSelect.vue'),
      props: true,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }, // Add route meta to protect this route
    },
    {
      path: '/game',
      name: 'gameTable',
      component: () => import('../views/TarokGameView.vue'),
      props: true,
    },
    // {
    //   path: '/rules',
    //   name: 'tarokRules',
    //   component: () => import('../views/TarokRulesView.vue'),
    // },
    {
      path: '/add',
      name: 'AddGame',
      component: () => import('../views/NewGame.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/rules',
      name: 'PointRules',
      component: () => import('@/views/PointRules.vue') // Adjust the path as needed
    },
    {
      path: "/example",
      name: "Example",
      component: () => import("@/views/Example.vue"),
    },
    {path: "/api-docs",
    name: "SwaggerUI",
    component: SwaggerUIPage,
    }
    
  ],
});

// Navigation guard to check authentication before entering protected routes
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token'); // Check for a stored token

//   if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
//     // Redirect to login if not authenticated
//     next('/login');
//   } else {
//     next(); // Allow access if authenticated or route is not protected
//   }
// });

export default router;
