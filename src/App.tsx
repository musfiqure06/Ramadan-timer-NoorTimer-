import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Moon, Sparkles, Sun, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import BackgroundFX from './components/BackgroundFX'
import CitySelector from './components/CitySelector'
import CountdownCard from './components/CountdownCard'
import Footer from './components/Footer'
import InfoCard from './components/InfoCard'
import LoadingScreen from './components/LoadingScreen'
import ProgressTracker from './components/ProgressTracker'
import RamadanTable from './components/RamadanTable'
import TasbihCounter from './components/TasbihCounter'
import DuaLibrary from './components/DuaLibrary'
import { CITIES } from './lib/cities'
import { useCountdown } from './hooks/useCountdown'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useRamadanTimes } from './hooks/useRamadanTimes'
import { parseTime } from './lib/utils'

function App() {
  const [city, setCity] = useLocalStorage('noortimer-city', CITIES[0])
  const [soundEnabled, setSoundEnabled] = useLocalStorage('noortimer-sound', true)
  const [lightMode, setLightMode] = useLocalStorage('noortimer-light', false)
  const [tasbih, setTasbih] = useLocalStorage('noortimer-tasbih', 0)
  const [tasbihTarget, setTasbihTarget] = useLocalStorage('noortimer-tasbih-target', 33)
  const [introVisible, setIntroVisible] = useState(true)

  const { schedule, today, loading, error, hijriLabel, gregorianLabel, progressDay } = useRamadanTimes(city)
  const { state, event, phase, popup } = useCountdown(schedule, soundEnabled)

  useEffect(() => {
    const timer = setTimeout(() => setIntroVisible(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loading) return
    setIntroVisible(true)
    const timer = setTimeout(() => setIntroVisible(false), 1400)
    return () => clearTimeout(timer)
  }, [city.name, loading])

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => undefined)
    }
  }, [])

  useEffect(() => {
    gsap.to('.lantern', {
      y: -18,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.4
    })
  }, [])

  const times = useMemo(() => {
    if (!today) return { sehri: '--:--', iftar: '--:--' }
    return {
      sehri: parseTime(today.timings.Fajr),
      iftar: parseTime(today.timings.Maghrib)
    }
  }, [today])

  const backgroundClass = phase === 'dawn' ? 'theme-dawn' : phase === 'sunset' ? 'theme-sunset' : 'theme-night'

  return (
    <div className={`min-h-screen ${backgroundClass} ${lightMode ? 'light-mode' : ''}`}>
      <LoadingScreen visible={introVisible || loading} />
      <div className="relative overflow-hidden">
        <BackgroundFX />
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 pb-10 pt-10 sm:px-8">
          <header className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">NoorTimer</p>
                <h1 className="mt-2 text-3xl font-semibold text-white md:text-5xl">
                  Illuminate your Ramadan moments with Musfiqure Rahman.
                </h1>
                <p className="mt-3 max-w-xl text-sm text-slate-200/80">
                  Premium Ramadan companion with live Sehri & Iftar countdown, global city schedules, and spiritual
                  focus tools - crafted with elegance and calm.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSoundEnabled((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200 transition hover:bg-white/20"
                >
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  {soundEnabled ? 'Sound On' : 'Sound Off'}
                </button>
                <button
                  onClick={() => setLightMode((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200 transition hover:bg-white/20"
                >
                  {lightMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  {lightMode ? 'Dark Mode' : 'Light Mode'}
                </button>
                <CitySelector city={city} cities={CITIES} onChange={setCity} />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <CountdownCard state={state} event={event} sehriTime={times.sehri} iftarTime={times.iftar} />
              <div className="grid gap-6">
                <div className="glass-panel flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">Today</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{hijriLabel || 'Loading Hijri date...'}</h3>
                    <p className="mt-2 text-sm text-slate-200/70">{gregorianLabel}</p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="lantern h-16 w-16 rounded-full border border-amber-200/40 bg-amber-300/20 shadow-[0_0_30px_rgba(251,191,36,0.55)]" />
                    <div className="lantern h-12 w-12 rounded-full border border-emerald-200/40 bg-emerald-300/20 shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
                  </div>
                </div>
                <ProgressTracker day={progressDay} />
              </div>
            </div>
          </header>

          <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="grid gap-6">
              <InfoCard
                title="Dua of the Day"
                subtitle="Rabbi innī limā anzalta ilayya min khayrin faqīr"
                content="“My Lord, indeed I am, for whatever good You would send down to me, in need.” (Qur'an 28:24)"
              />
              <InfoCard
                title="Quran Ayah"
                subtitle="Surah Al-Baqarah 2:183"
                content="“O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.”"
              />
              <TasbihCounter
                value={tasbih}
                target={tasbihTarget}
                onChange={setTasbih}
                onReset={() => setTasbih(0)}
                onTargetChange={setTasbihTarget}
              />
              <DuaLibrary />
            </div>
            <div className="glass-panel flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">Sehri & Iftar</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Daily reminders & spiritual flow</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Bell className="h-5 w-5 text-amber-200" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-sky-200/70">Sehri End</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{times.sehri}</p>
                  <p className="mt-2 text-xs text-slate-200/70">Stay nourished for a blessed fast.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">Iftar</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{times.iftar}</p>
                  <p className="mt-2 text-xs text-slate-200/70">Break your fast with gratitude.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">Smart Insights</p>
                <p className="mt-2 text-sm text-slate-200/80">
                  NoorTimer sends a gentle reminder 10 minutes before Iftar. Enable notifications to stay in sync with
                  your local Ramadan timetable.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10">
            {error ? (
              <div className="glass-panel text-center text-sm text-amber-200">
                {error}. Please try a different city or refresh the page.
              </div>
            ) : (
              <RamadanTable schedule={schedule} />
            )}
          </section>

          <Footer />
        </div>

        <AnimatePresence>
          {popup && (
            <motion.div
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative rounded-3xl border border-amber-200/50 bg-[#0b1425]/90 px-8 py-6 text-center shadow-[0_0_50px_rgba(251,191,36,0.4)]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="glow-burst" />
                <Sparkles className="mx-auto h-8 w-8 text-amber-200" />
                <h3 className="mt-3 text-2xl font-semibold text-white">{popup}</h3>
                <p className="mt-2 text-sm text-slate-200/80">May your Ramadan be filled with light and peace.</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
