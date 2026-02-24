export const pad = (value: number) => value.toString().padStart(2, '0')

export const formatDate = (date: Date) => {
  return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`
}

export const parseTime = (time: string) => time.split(' ')[0]

export const toDateWithTime = (base: Date, time: string) => {
  const [h, m] = parseTime(time).split(':').map(Number)
  const next = new Date(base)
  next.setHours(h, m, 0, 0)
  return next
}

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
