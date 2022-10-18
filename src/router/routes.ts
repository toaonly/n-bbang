import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/about',
    component: AboutView,
  },
]

export default routes
