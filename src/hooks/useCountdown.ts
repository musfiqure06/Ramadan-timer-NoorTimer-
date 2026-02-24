import { useEffect, useMemo, useRef, useState } from 'react'
import type { CountdownPhase, CountdownState, RamadanDay } from '../lib/types'
import { formatDate, pad, toDateWithTime } from '../lib/utils'

const DEFAULT_STATE: CountdownState = {
  hours: '00',
  minutes: '00',
  seconds: '00',
  totalMs: 0,
  targetTime: null
}

export type CountdownEvent = 'sehri' | 'iftar'

export const useCountdown = (
  schedule: RamadanDay[],
  soundEnabled: boolean,
  onTrigger?: (event: CountdownEvent) => void,
) => {
  const [state, setState] = useState<CountdownState>(DEFAULT_STATE)
  const [event, setEvent] = useState<CountdownEvent>('iftar')
  const [phase, setPhase] = useState<CountdownPhase>('sunset')
  const [popup, setPopup] = useState<string | null>(null)
  const notificationRef = useRef<string | null>(null)
  const triggerRef = useRef<number | null>(null)

  const audio = useMemo(() => new Audio('/audio/adhan.wav'), [])

  useEffect(() => {
    audio.volume = 0.6
  }, [audio])

  useEffect(() => {
    if (!schedule.length) return

    let timeout: number | undefined

    const tick = () => {
      const now = new Date()
      const today = schedule.find((day) => day.date.gregorian.date === formatDate(now)) || schedule[0]
      if (!today) return
      const tomorrowDate = new Date(now)
      tomorrowDate.setDate(now.getDate() + 1)
      const tomorrow = schedule.find((day) => day.date.gregorian.date === formatDate(tomorrowDate)) || today

      const sehriTime = toDateWithTime(now, today.timings.Fajr)
      const iftarTime = toDateWithTime(now, today.timings.Maghrib)
      const nextSehriTime = toDateWithTime(tomorrowDate, tomorrow.timings.Fajr)

      let target = iftarTime
      let nextEvent: CountdownEvent = 'iftar'
      let nextPhase: CountdownPhase = 'sunset'

      if (now < sehriTime) {
        target = sehriTime
        nextEvent = 'sehri'
        nextPhase = 'dawn'
      } else if (now < iftarTime) {
        target = iftarTime
        nextEvent = 'iftar'
        nextPhase = 'sunset'
      } else {
        target = nextSehriTime
        nextEvent = 'sehri'
        nextPhase = 'night'
      }

      const diff = target.getTime() - now.getTime()
      if (diff <= 0) {
        if (triggerRef.current !== target.getTime()) {
          triggerRef.current = target.getTime()
          setPopup(nextEvent === 'iftar' ? 'Time for Iftar' : 'Time for Sehri')
          if (soundEnabled) {
            audio.currentTime = 0
            audio.play().catch(() => undefined)
          }
          onTrigger?.(nextEvent)
          if (timeout) window.clearTimeout(timeout)
          timeout = window.setTimeout(() => setPopup(null), 7000)
        }
      }

      if (nextEvent === 'iftar') {
        const notificationKey = `${formatDate(now)}-iftar`
        if (diff <= 10 * 60 * 1000 && diff > 0 && notificationRef.current !== notificationKey) {
          notificationRef.current = notificationKey
          if (Notification?.permission === 'granted') {
            new Notification('NoorTimer', {
              body: '10 minutes left for Iftar. Get ready to break your fast.',
              icon: '/icons/icon-192.png'
            })
          }
        }
      }

      setPhase(nextPhase)
      setEvent(nextEvent)

      const totalSeconds = Math.max(diff, 0) / 1000
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = Math.floor(totalSeconds % 60)
      setState({
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
        totalMs: diff,
        targetTime: target
      })
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => {
      clearInterval(interval)
      if (timeout) window.clearTimeout(timeout)
    }
  }, [audio, onTrigger, schedule, soundEnabled])

  return { state, event, phase, popup }
}
