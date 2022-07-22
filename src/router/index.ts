import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '../stores/user.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const publicRoutes = ['register', 'login']
  if (!publicRoutes.find((route) => route === to.name)) {
    if (userStore.user == null) {
      return next('/login')
    }
  }
  next()
})

export default router
