import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
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
    }
  ],
})

export default router
