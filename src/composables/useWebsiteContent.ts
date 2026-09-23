import {
  computed,
  onScopeDispose,
  ref,
  shallowRef,
  toValue,
  watch,
  type MaybeRefOrGetter,
} from 'vue'
import { useI18n } from 'vue-i18n'
import { ApiError, getCollection, getContent, type Language } from '@/api/website'

export function useWebsiteContent<T>(path: MaybeRefOrGetter<string>, collection = false) {
  const { locale } = useI18n()
  const language = computed<Language>(() => (locale.value === 'de' ? 'de' : 'en'))
  const data = shallowRef<T | null>(null)
  const loading = ref(true)
  const error = ref<'notFound' | 'loadError' | null>(null)
  let activeRequest: AbortController | undefined

  async function reload() {
    activeRequest?.abort()
    const controller = new AbortController()
    activeRequest = controller
    data.value = null
    error.value = null
    loading.value = true
    try {
      const value = collection
        ? await getCollection(toValue(path), language.value, controller.signal)
        : await getContent(toValue(path), language.value, controller.signal)
      if (!controller.signal.aborted) data.value = value as T
    } catch (reason) {
      if (!controller.signal.aborted) {
        error.value = reason instanceof ApiError && reason.status === 404 ? 'notFound' : 'loadError'
      }
    } finally {
      if (!controller.signal.aborted) loading.value = false
    }
  }

  watch([() => toValue(path), language], reload, { immediate: true })
  onScopeDispose(() => activeRequest?.abort())
  return { data, loading, error, reload }
}
