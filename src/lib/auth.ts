import type {
  AuthenticationStatus,
  RefreshTokenResponse,
  User,
  VerifyAccessTokenResponse,
} from '@/types/auth'
import { api } from './axios'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './keys'

const UNAUTHENTICATED_STATUS: AuthenticationStatus = {
  isAuthenticated: false,
  user: undefined,
  tokens: undefined,
}

export async function checkAuthenticationStatus(): Promise<AuthenticationStatus> {
  const accessToken = getAccessToken()

  if (!accessToken) {
    const response = await refreshSession()

    return formatResponseAfterRefreshSession(response)
  }

  const user = await getUserFromToken(accessToken)
  if (!user) {
    const response = await refreshSession()

    return formatResponseAfterRefreshSession(response)
  }

  return {
    isAuthenticated: true,
    user,
    tokens: {
      accessToken,
      refreshToken: getRefreshToken() || '',
    },
  }
}

function formatResponseAfterRefreshSession(
  response: Awaited<ReturnType<typeof refreshSession>>,
): AuthenticationStatus {
  if (!response) {
    return UNAUTHENTICATED_STATUS
  }

  return {
    isAuthenticated: true,
    user: response.user,
    tokens: {
      accessToken: response.tokens.accessToken.value,
      refreshToken: response.tokens.refreshToken.value,
    },
  }
}

export async function getUserFromToken(accessToken: string): Promise<User | null> {
  try {
    const response = await api.get<VerifyAccessTokenResponse>('/auth/verify-access-token', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (response.data.success && response.data.data && response.data.data.user) {
      const user = response.data.data.user

      return user
    }

    throw new Error('Expected user data in response')
  } catch (e: any) {
    console.error(e)
    return null
  }
}

export async function refreshSession(): Promise<NonNullable<RefreshTokenResponse['data']> | null> {
  const refreshToken = getRefreshToken()

  if (!refreshToken) {
    return null
  }

  try {
    const response = await api.post<RefreshTokenResponse>('/auth/refresh-session', {
      refreshToken: refreshToken,
    })

    if (response.data.success && response.data.data && response.data.data.user) {
      const user = response.data.data.user
      localStorage.setItem(ACCESS_TOKEN_KEY, response.data.data.tokens.accessToken.value)
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data.data.tokens.refreshToken.value)

      return {
        user: user,
        tokens: response.data.data.tokens,
      }
    }

    throw new Error('Expected user data in response')
  } catch (e: any) {
    logOut()
    console.error(e)
    return null
  }
}

export function saveSession(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function logOut() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}
