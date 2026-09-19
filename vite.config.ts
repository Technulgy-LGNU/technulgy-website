import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    VueI18nPlugin({
      include: [fileURLToPath(new URL('./src/locales/**', import.meta.url))],
    }),
    {
      name: 'mark-compiled-locales-as-javascript',
      enforce: 'pre',
      transform(code, id) {
        if (id.includes('/src/locales/') && id.endsWith('.json')) {
          return { code, moduleType: 'js' }
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
