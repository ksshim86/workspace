const routes = [
  {
    path: '/',
    component: () => import('../App.vue')
    // children: [
    //   { path: 'welcome', component: () => import('pages/Welcome.vue') },
    //   { path: 'todo', component: () => import('pages/Welcome.vue') }
    // ]
  },
  { path: '/welcome', component: () => import('pages/Welcome.vue') },
  { path: '/dashboard', component: () => import('pages/DashBoard.vue') },
  { path: '/todo', component: () => import('pages/TodoPage.vue') },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
