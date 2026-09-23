export type Language = 'de' | 'en'

export interface WebsiteImage {
  id: string
  url: string
  alt: string
}

export interface Entry {
  id: string
  slug: string
  name: string
  description: string
  images: WebsiteImage[]
  image?: WebsiteImage | null
  url?: string
}

export interface Team extends Entry {
  status: 'active' | 'retired'
  startImage?: WebsiteImage | null
  awards: {
    eventId: string
    event: string
    date: string
    year: string
    league: string
    result: string
  }[]
}

export interface Competition extends Entry {
  date: string
  year: string
  results: { teamId: string; team: string; teamSlug: string; league: string; result: string }[]
}

export interface Article extends Entry {
  publishedAt: string
}

export type ArticleBlock =
  | { id: string; type: 'heading'; level: 2 | 3; text: string }
  | { id: string; type: 'text'; text: string }
  | { id: string; type: 'image' | 'gallery'; images: WebsiteImage[]; text?: string }
  | { id: string; type: 'video'; url: string; text?: string }

export interface ArticleDetail extends Article {
  textFormat: 'markdown'
  blocks: ArticleBlock[]
}

export interface Home {
  language: Language
  images: WebsiteImage[]
  aboutUs: string
  blogs: Article[]
  videos: { title: string; url: string }[]
  contact: { endpoint: string; enabled: boolean }
}

interface Collection<T> {
  language: Language
  items: T[]
  page: number
  pageSize: number
  total: number
}

export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
  website: string
}

export class ApiError extends Error {
  constructor(public status: number) {
    super(`Website API returned ${status}`)
  }
}

// The base is the TAS origin (or an optional reverse-proxy prefix), without /website.
const base = (
  import.meta.env.VITE_TAS_BASE_URL ?? (import.meta.env.PROD ? 'https://tas.technulgy.com' : '')
).replace(/\/+$/, '')

export function websiteUrl(path: string, language: Language, page?: number) {
  const query = new URLSearchParams({ lang: language })
  if (page !== undefined) query.set('page', String(page))
  return `${base}/website/${path}?${query}`
}

export async function getContent<T>(
  path: string,
  language: Language,
  signal?: AbortSignal,
  page?: number,
): Promise<T> {
  const response = await fetch(websiteUrl(path, language, page), {
    signal,
    credentials: 'omit',
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) throw new ApiError(response.status)
  return response.json()
}

export async function getCollection<T>(
  path: string,
  language: Language,
  signal?: AbortSignal,
): Promise<T[]> {
  const items: T[] = []
  for (let page = 1; ; page++) {
    const result = await getContent<Collection<T>>(path, language, signal, page)
    items.push(...result.items)
    if (items.length >= result.total) return items
    // Avoid silently displaying incomplete content if pagination is inconsistent.
    if (!result.items.length || result.page !== page) throw new Error('Invalid API pagination')
  }
}

export async function sendContact(message: ContactMessage, language: Language) {
  const response = await fetch(websiteUrl('contact', language), {
    method: 'POST',
    credentials: 'omit',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(message),
  })
  if (response.status !== 202) throw new ApiError(response.status)
  const result = await response.json()
  if (result.sent !== true) throw new Error('Contact message was not accepted')
}

export function entryImages(entry: Entry): WebsiteImage[] {
  return entry.images?.length ? entry.images : entry.image ? [entry.image] : []
}

export function httpsUrl(value?: string): string | undefined {
  try {
    const url = new URL(value ?? '')
    return url.protocol === 'https:' ? url.href : undefined
  } catch {
    return undefined
  }
}
