import './assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

import de from './locales/de.json'
import en from './locales/en.json'

const i18n = createI18n({
  locale: 'de',
  fallbackLocale: 'en',
  legacy: false,
  globalInjection: true,
  messages: {
    de,
    en,
  }
})

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
