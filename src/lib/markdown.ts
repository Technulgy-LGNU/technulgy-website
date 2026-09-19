import MarkdownIt from 'markdown-it'

// Only renderer output is inserted as HTML; content itself never is.
// markdown-it rejects unsafe link schemes and escapes raw HTML.
const markdown = new MarkdownIt({ html: false, linkify: false, typographer: false })
markdown.disable('image')

export function renderMarkdown(text: string) {
  return markdown.render(text)
}
