import { afterEach, expect, it, vi } from 'vitest'

const originalUrl = window.location.href

afterEach(() => {
  window.history.replaceState(null, '', originalUrl)
  vi.resetModules()
})

it('upgrades old hash bookmarks before history captures the route and keeps the language query', async () => {
  window.history.replaceState(null, '', '/#/teams?lang=de')
  const { default: router } = await import('@/router')
  expect(window.location.pathname).toBe('/teams')
  expect(window.location.search).toBe('?lang=de')
  expect(router.options.history.location).toBe('/teams?lang=de')
  router.options.history.destroy()
})

it('resolves public article URLs directly', async () => {
  window.history.replaceState(null, '', '/blog/german-open-2026?lang=en')
  const { default: router } = await import('@/router')
  const article = router.resolve(router.options.history.location)
  expect(article.name).toBe('article')
  expect(article.params.slug).toBe('german-open-2026')
  expect(article.query.lang).toBe('en')
  router.options.history.destroy()
})
