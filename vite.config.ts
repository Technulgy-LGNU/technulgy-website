import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: {
      proxy: {
        '/website': { target: env.TAS_PROXY_TARGET || 'http://localhost:2005', changeOrigin: true },
      },
    },
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
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
