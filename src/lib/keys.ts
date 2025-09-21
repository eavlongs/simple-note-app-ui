import type { AuthenticationStatus } from '@/types/auth'
import type { InjectionKey, Reactive } from 'vue'

export const AUTH_CONTEXT_KEY: InjectionKey<{
  authStatus: Reactive<AuthenticationStatus>
  setAuthStatus: (authStatus: AuthenticationStatus) => void
}> = Symbol('auth_context')
export const ACCESS_TOKEN_KEY = 'access_token'
export const REFRESH_TOKEN_KEY = 'refresh_token'
