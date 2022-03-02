// src/boot/pinia.ts
import { boot } from 'quasar/wrappers';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { authStore } from 'src/pinia/auth'
import {checkAccessToken} from 'src/services/checkToken'

export default boot(({ app, router }) => {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
  const $authStore = authStore()
  router.beforeEach(async (from, to) => {

      // if not logged in, go on
      if (!$authStore.isLoggedIn ) return true
     const validToken = checkAccessToken()
    if (!validToken) return {name: 'login'}
  })
})
