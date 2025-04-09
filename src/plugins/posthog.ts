import posthog from 'posthog-js'
import type { App } from 'vue'

export default {
  install(app: App) {
    app.config.globalProperties.$posthog = posthog.init(
      'phc_T5fNuM7ZpHULfcsSpHruyHOmMWfGrQ2qJG9kIhIbxO1',
      {
        api_host: 'https://eu.i.posthog.com',
      }
    )
  }
}
