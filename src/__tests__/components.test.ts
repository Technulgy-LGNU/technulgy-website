import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { defineComponent, nextTick } from 'vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import ContactForm from '@/components/ContactForm.vue'
import YouTubeVideo from '@/components/YouTubeVideo.vue'
import { useWebsiteContent } from '@/composables/useWebsiteContent'
import en from '@/locales/en.json'
import de from '@/locales/de.json'

const images = [
  { id: 'one', url: 'https://example.org/one.webp', alt: 'First image' },
  { id: 'two', url: 'https://example.org/two.webp', alt: 'Second image' },
]
const i18n = () => createI18n({ legacy: false, locale: 'en', messages: { en, de } })
const wrappers: ReturnType<typeof mount>[] = []
function render(component: Parameters<typeof mount>[0], props = {}) {
  const wrapper = mount(component, { props, global: { plugins: [i18n()] } })
  wrappers.push(wrapper)
  return wrapper
}
beforeEach(() => {
  vi.stubGlobal(
    'matchMedia',
    vi
      .fn()
      .mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
  )
})
afterEach(() => {
  wrappers.forEach((wrapper) => wrapper.unmount())
  wrappers.length = 0
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('galleries', () => {
  it('starts with the selected cover, navigates in both directions and never auto-advances by default', async () => {
    vi.useFakeTimers()
    const wrapper = render(ImageCarousel, { images, startImage: images[1] })
    expect(wrapper.get('img').attributes('src')).toBe(images[1]!.url)
    await vi.advanceTimersByTimeAsync(15000)
    expect(wrapper.get('img').attributes('src')).toBe(images[1]!.url)
    await wrapper.get('[aria-label="Next image"]').trigger('click')
    expect(wrapper.get('img').attributes('src')).toBe(images[0]!.url)
    await wrapper.get('[aria-label="Previous image"]').trigger('click')
    expect(wrapper.get('img').attributes('src')).toBe(images[1]!.url)
    await wrapper.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.get('img').attributes('src')).toBe(images[0]!.url)
    await wrapper.setProps({ images: [images[0]], startImage: null })
    expect(wrapper.find('button').exists()).toBe(false)
    await wrapper.setProps({ images: [] })
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('cycles only when requested and pauses for hover, focus and the pause button', async () => {
    vi.useFakeTimers()
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false)
    const wrapper = render(ImageCarousel, { images, autoplay: true })
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.get('img').attributes('src')).toBe(images[1]!.url)
    await wrapper.trigger('mouseenter')
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.get('img').attributes('src')).toBe(images[1]!.url)
    await wrapper.trigger('mouseleave')
    await wrapper.trigger('focusin')
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.get('img').attributes('src')).toBe(images[1]!.url)
    await wrapper.trigger('focusout')
    await wrapper.get('[aria-label="Pause slideshow"]').trigger('click')
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.get('img').attributes('src')).toBe(images[1]!.url)
    await wrapper.get('[aria-label="Play slideshow"]').trigger('click')
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.get('img').attributes('src')).toBe(images[0]!.url)
  })

  it('respects reduced motion and recovers from an unavailable image by advancing', async () => {
    vi.useFakeTimers()
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as MediaQueryList)
    const wrapper = render(ImageCarousel, { images, autoplay: true })
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.get('img').attributes('src')).toBe(images[0]!.url)
    await wrapper.get('img').trigger('error')
    expect(wrapper.text()).toContain('currently unavailable')
    await wrapper.get('[aria-label="Next image"]').trigger('click')
    expect(wrapper.get('img').attributes('src')).toBe(images[1]!.url)
  })
})

it('discards an old language response even if it completes after the new request', async () => {
  const resolvers: ((response: Response) => void)[] = []
  const fetch = vi.fn(() => new Promise<Response>((resolve) => resolvers.push(resolve)))
  vi.stubGlobal('fetch', fetch)
  const localization = i18n()
  const component = defineComponent({
    setup: () => useWebsiteContent<{ text: string }>('home'),
    template: '<div>{{ data?.text }}</div>',
  })
  const wrapper = mount(component, { global: { plugins: [localization] } })
  wrappers.push(wrapper)
  localization.global.locale.value = 'de'
  await nextTick()
  expect(fetch.mock.calls).toHaveLength(2)
  resolvers[1]!(new Response(JSON.stringify({ text: 'Deutsch' })))
  await flushPromises()
  resolvers[0]!(new Response(JSON.stringify({ text: 'English' })))
  await flushPromises()
  expect(wrapper.text()).toBe('Deutsch')
})

it('submits the contact fields, preserves failed messages and clears only confirmed deliveries', async () => {
  const fetch = vi
    .fn()
    .mockResolvedValueOnce(new Response('{}', { status: 429 }))
    .mockResolvedValueOnce(new Response('{"sent":true}', { status: 202 }))
  vi.stubGlobal('fetch', fetch)
  const wrapper = render(ContactForm, { enabled: true })
  for (const [field, value] of Object.entries({
    name: 'Visitor',
    email: 'visitor@example.org',
    subject: 'Hello',
    message: 'A message',
  })) {
    await wrapper.get(`[name="${field}"]`).setValue(value)
  }
  await wrapper.get('form').trigger('submit')
  await flushPromises()
  expect(wrapper.text()).toContain('Too many attempts')
  expect((wrapper.get('[name="message"]').element as HTMLTextAreaElement).value).toBe('A message')
  await wrapper.get('form').trigger('submit')
  await flushPromises()
  expect(wrapper.text()).toContain('Your message has been sent')
  expect((wrapper.get('[name="message"]').element as HTMLTextAreaElement).value).toBe('')
  await wrapper.setProps({ enabled: false })
  await wrapper.get('form').trigger('submit')
  expect(fetch).toHaveBeenCalledTimes(2)
  expect(wrapper.get('fieldset').attributes('disabled')).toBeDefined()
})

it('loads YouTube only after consent and rejects other video origins', async () => {
  const wrapper = render(YouTubeVideo, {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Robot video',
  })
  expect(wrapper.find('iframe').exists()).toBe(false)
  await wrapper.get('button').trigger('click')
  expect(wrapper.get('iframe').attributes('src')).toBe(
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
  )
  await wrapper.setProps({ url: 'https://evil.example/watch?v=dQw4w9WgXcQ' })
  expect(wrapper.find('iframe').exists()).toBe(false)
})
