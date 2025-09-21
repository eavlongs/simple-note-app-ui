import './assets/main.css'

import { createApp, reactive } from 'vue'
import App from './App.vue'
import { AUTH_CONTEXT_KEY } from './lib/keys'
import router from './router'
import type { AuthenticationStatus } from './types/auth'
import { authStatus, setAuthStatus } from './authStore'

const app = createApp(App)

app.provide(AUTH_CONTEXT_KEY, { authStatus, setAuthStatus })

app.use(router).mount('#app')
