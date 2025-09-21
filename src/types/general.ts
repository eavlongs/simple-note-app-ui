export type Prettify<T> = {
  [K in keyof T]: T[K]
}

export type ApiResponse<T = any, U = any> = {
  success: boolean
  message?: string
  data?: T
  error?: U
}
