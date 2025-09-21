export function useDebounce(cb: Function, delay: number) {
  let timeout: number | undefined

  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => cb(...args), delay)
  }
}

export const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}
