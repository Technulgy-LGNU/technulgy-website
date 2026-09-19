import { afterEach, describe, expect, it, vi } from 'vitest'
import { getCollection, getContent, sendContact, httpsUrl } from '@/api/website'
import { renderMarkdown } from '@/lib/markdown'

afterEach(() => vi.unstubAllGlobals())

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('public content API', () => {
  it('collects every page in display order and requests the selected language without credentials or caching', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(json({ items: [{ id: 'one' }], page: 1, pageSize: 1, total: 2 }))
      .mockResolvedValueOnce(json({ items: [{ id: 'two' }], page: 2, pageSize: 1, total: 2 }))
    vi.stubGlobal('fetch', fetch)
    expect(await getCollection('teams', 'de')).toEqual([{ id: 'one' }, { id: 'two' }])
    expect(fetch).toHaveBeenNthCalledWith(
      1,
      '/website/teams?lang=de&page=1',
      expect.objectContaining({ credentials: 'omit', cache: 'no-store' }),
    )
    expect(fetch).toHaveBeenNthCalledWith(2, '/website/teams?lang=de&page=2', expect.anything())
  })

  it('stops inconsistent pagination instead of silently dropping published entries', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json({ items: [], page: 1, total: 2 })))
    await expect(getCollection('teams', 'en')).rejects.toThrow('Invalid API pagination')
  })

  it('preserves a 404 for unpublished article handling', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json({}, 404)))
    await expect(getContent('blog/draft', 'en')).rejects.toMatchObject({ status: 404 })
  })

  it('only accepts a confirmed 202 SMTP handoff', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(json({ sent: true }, 202))
      .mockResolvedValueOnce(json({ sent: true }, 200))
      .mockResolvedValueOnce(json({ sent: false }, 202))
      .mockResolvedValueOnce(json({}, 429))
    vi.stubGlobal('fetch', fetch)
    const message = {
      name: 'Visitor',
      email: 'visitor@example.org',
      subject: 'Robotics',
      message: 'Hello',
      website: '',
    }
    await expect(sendContact(message, 'de')).resolves.toBeUndefined()
    expect(fetch).toHaveBeenCalledWith(
      '/website/contact?lang=de',
      expect.objectContaining({
        method: 'POST',
        credentials: 'omit',
        body: JSON.stringify(message),
      }),
    )
    await expect(sendContact(message, 'de')).rejects.toMatchObject({ status: 200 })
    await expect(sendContact(message, 'de')).rejects.toThrow('not accepted')
    await expect(sendContact(message, 'de')).rejects.toMatchObject({ status: 429 })
  })
})

describe('article content safety', () => {
  it('renders supported Markdown while escaping HTML and disabling embedded images', () => {
    const html = renderMarkdown(
      '**Bold** and *italic*\n\n- item\n\n`code`\n\n<script>alert(1)</script>\n\n![image](https://example.org/tracker.png)',
    )
    expect(html).toContain('<strong>Bold</strong>')
    expect(html).toContain('<em>italic</em>')
    expect(html).toContain('<li>item</li>')
    expect(html).toContain('<code>code</code>')
    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<img')
  })

  it('rejects unsafe Markdown link schemes, including encoded ones', () => {
    for (const link of [
      'javascript:alert(1)',
      'data:text/html;base64,PHNjcmlwdD4=',
      'vbscript:msgbox(1)',
      'jav&#x61;script:alert(1)',
    ]) {
      expect(renderMarkdown(`[click](${link})`)).not.toContain('<a ')
    }
    expect(renderMarkdown('[site](https://example.org)')).toContain('href="https://example.org"')
    expect(httpsUrl('javascript:alert(1)')).toBeUndefined()
    expect(httpsUrl('http://example.org')).toBeUndefined()
    expect(httpsUrl('https://example.org')).toBe('https://example.org/')
  })
})
