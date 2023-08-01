import { createRouter, createWebHistory } from 'vue-router'


const routes = [

  {
    path: '/users',
    name: 'users',
    component: () => import( '@/views/Users.vue')
  },

  {
    path: '/documents',
    name: 'documents',
    component: () => import( '@/views/Documents.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
