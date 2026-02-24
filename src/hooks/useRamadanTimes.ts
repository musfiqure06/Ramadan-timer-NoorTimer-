import { useEffect, useMemo, useState } from 'react'
import type { RamadanDay } from '../lib/types'
import { formatDate } from '../lib/utils'
import type { CityOption } from '../lib/cities'

const BASE_URL = import.meta.env.VITE_ALADHAN_BASE_URL || 'https://api.aladhan.com/v1'
const METHOD = 1

const fetchJson = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch prayer times')
  }
  const data = await res.json()
  if (!data?.data) {
    throw new Error('Invalid response from API')
  }
  return data.data
}

export const useRamadanTimes = (city: CityOption) => {
  const [schedule, setSchedule] = useState<RamadanDay[]>([])
  const [today, setToday] = useState<RamadanDay | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hijriLabel, setHijriLabel] = useState('')
  const [gregorianLabel, setGregorianLabel] = useState('')

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const now = new Date()
        const current = formatDate(now)
        const gToH = await fetchJson(`${BASE_URL}/gToH?date=${current}`)
        const hijriYear = gToH?.hijri?.year
        if (!hijriYear) {
          throw new Error('Could not resolve Hijri year')
        }
        if (!active) return
        setHijriLabel(`${gToH.hijri.day} ${gToH.hijri.month.en} ${gToH.hijri.year} AH`)
        setGregorianLabel(`${gToH.gregorian.day} ${gToH.gregorian.month.en} ${gToH.gregorian.year}`)

        const calendar = await fetchJson(
          `${BASE_URL}/hijriCalendarByCity?city=${encodeURIComponent(city.name)}&country=${encodeURIComponent(
            city.country,
          )}&method=${METHOD}&school=1&month=9&year=${hijriYear}`,
        )

        if (!active) return
        const list = (calendar || []) as RamadanDay[]
        setSchedule(list)
        const todayMatch = list.find((day) => day.date.gregorian.date === current)
        setToday(todayMatch || list[0] || null)
      } catch (err) {
        if (!active) return
        setError(err instanceof Error ? err.message : 'Unable to load data')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      active = false
    }
  }, [city])

  const progressDay = useMemo(() => {
    if (!today?.date?.hijri?.day) return 1
    return Number(today.date.hijri.day)
  }, [today])

  return { schedule, today, loading, error, hijriLabel, gregorianLabel, progressDay }
}
