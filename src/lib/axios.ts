import axios, { type InternalAxiosRequestConfig } from 'axios'
import { checkAuthenticationStatus } from './auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const apiWithAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiWithAuth.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const authenticationStatus = await checkAuthenticationStatus()
  if (authenticationStatus.isAuthenticated && authenticationStatus.tokens) {
    config.headers['Authorization'] = `Bearer ${authenticationStatus.tokens.accessToken}`
  }
  return config
})

export { api, apiWithAuth }
