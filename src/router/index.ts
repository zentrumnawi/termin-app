import { createRouter, createWebHistory } from 'vue-router'
import TerminHome from '../components/TerminHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/termine',
      name: 'home',
      component: TerminHome,
    },
  ],
})

export default router
