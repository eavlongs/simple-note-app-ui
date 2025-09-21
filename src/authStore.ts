import { reactive } from 'vue'
import type { AuthenticationStatus } from './types/auth'

export const authStatus = reactive<AuthenticationStatus>({
  isAuthenticated: false,
  user: undefined,
  tokens: undefined,
})

export function setAuthStatus(_authStatus: AuthenticationStatus) {
  authStatus.isAuthenticated = _authStatus.isAuthenticated
  authStatus.user = _authStatus.user
  authStatus.tokens = _authStatus.tokens
}
