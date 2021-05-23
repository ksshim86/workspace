const routes = [
  {
    path: '/',
    component: () => import('pages/Index.vue')
    // children: [
    //   { path: 'welcome', component: () => import('pages/Welcome.vue') },
    //   { path: 'todo', component: () => import('pages/Welcome.vue') }
    // ]
  },
  { path: '/welcome', component: () => import('pages/Welcome.vue') },
  { path: '/todo', component: () => import('pages/TodoPage.vue'), props: { scrollHeight: 1 } },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
