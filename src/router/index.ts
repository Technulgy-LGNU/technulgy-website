import { createRouter, createWebHistory } from 'vue-router'

// Upgrade old bookmarks before the router captures its initial location.
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1))
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.path === from.path) return
    return { top: 0 }
  },
  routes: [
    { path: '/blog', name: 'blog', component: () => import('@/views/BlogView.vue') },
    { path: '/blog/:slug', name: 'article', component: () => import('@/views/ArticleView.vue') },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('@/views/TeamsView.vue'),
    },
    {
      path: '/participation-history',
      name: 'participation history',
      component: () => import('@/views/ParticipationHistoryView.vue'),
    },
    {
      path: '/sponsors',
      name: 'sponsors',
      component: () => import('@/views/SponsorsView.vue'),
    },
    {
      path: '/publications',
      name: 'publications',
      component: () => import('@/views/PublicationsView.vue'),
    },
    {
      path: '/links',
      name: 'links',
      component: () => import('@/views/LinksView.vue'),
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: () => import('@/views/ImpressumView.vue'),
    },
  ],
})

export default router
