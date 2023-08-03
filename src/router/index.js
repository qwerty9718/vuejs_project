import { createRouter, createWebHistory } from 'vue-router'


const routes = [

  {
    path: '/users',
    name: 'users',
    component: () => import( '@/views/User/Users.vue')
  },


  {
    path: '/users/:id',
    name: 'users.single',
    component: () => import( '@/views/User/SinglePage.vue')
  },

  {
    path: '/users-create',
    name: 'users.create',
    component: () => import('@/views/User/CreatUser.vue')
  },

  {
    path: '/documents',
    name: 'documents',
    component: () => import( '@/views/Document/Documents.vue')
  },

  {
    path: '/documents/:id',
    name: 'documents.single',
    component: () => import( '@/views/Document/SinglePage')
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
