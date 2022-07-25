import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import { authService } from '@/services/auth.service'

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
      component: () => import('./views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/RegisterView.vue'),
    },
    {
      path: '/add-todo',
      name: 'todo.create',
      component: () => import('./views/AddTodo.vue'),
    },
    {
      path: '/edit-todo/:id',
      name: 'todo.edit',
      component: () => import('./views/EditTodo.vue'),
    },
    {
      path: '/profile',
      name: 'profile.edit',
      component: () => import('./views/ProfileVue.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const publicRoutes = ['register', 'login']

  if (!publicRoutes.find((route) => route === to.name)) {
    authService.getCurrentUser().then((user) => {
      if (user == null) return next('/login')
      next()
    })
  } else {
    next()
  }
})

export default router
