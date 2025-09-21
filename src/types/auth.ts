import type { ApiResponse } from './general'

export type AuthenticationStatus = {
  isAuthenticated: boolean
  user?: User
  tokens?: Tokens
}

export type User = {
  id: string
  username: string
}

export type Tokens = {
  accessToken: string
  refreshToken: string
}

export type TokenMetaData = {
  issuedAt: string
  expiresAt: string
}

export type TokensWithMetaData = {
  accessToken: {
    value: string
    meta: TokenMetaData
  }
  refreshToken: {
    value: string
    meta: TokenMetaData
  }
}

export type VerifyAccessTokenResponse = ApiResponse<{
  user: User
}>

export type RefreshTokenResponse = ApiResponse<{
  user: User
  tokens: TokensWithMetaData
}>

export type LoginResponse = ApiResponse<{
  accessToken: string
  refreshToken: string
}>

export type RegisterResponse = LoginResponse