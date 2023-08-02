import { createRouter, createWebHistory } from 'vue-router'


const routes = [

  {
    path: '/users',
    name: 'users',
    component: () => import( '@/views/Users.vue')
  },

  {
    path: '/users-create',
    name: 'users.create',
    component: () => import('@/views/CreatUser.vue')
  },

  {
    path: '/documents',
    name: 'documents',
    component: () => import( '@/views/Documents.vue')
  },

  {
    path: '/documents-create',
    name: 'documents.create',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
