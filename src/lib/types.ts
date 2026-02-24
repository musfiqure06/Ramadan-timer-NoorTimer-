export type RamadanDay = {
  date: {
    gregorian: {
      date: string
      day: string
      month: { en: string; number: number }
      year: string
      weekday: { en: string }
    }
    hijri: {
      date: string
      day: string
      month: { en: string; number: number }
      year: string
      weekday: { en: string }
    }
  }
  timings: Record<string, string>
}

export type CountdownPhase = 'dawn' | 'sunset' | 'night'

export type CountdownState = {
  hours: string
  minutes: string
  seconds: string
  totalMs: number
  targetTime: Date | null
}
