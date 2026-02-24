import { AnimatePresence, motion } from 'framer-motion'
import { MoonStar, Sparkles } from 'lucide-react'
import type { CountdownState } from '../lib/types'

const FlipNumber = ({ value }: { value: string }) => (
  <AnimatePresence mode="wait">
    <motion.span
      key={value}
      className="block text-4xl font-semibold text-white md:text-6xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {value}
    </motion.span>
  </AnimatePresence>
)

const CountdownCard = ({
  state,
  event,
  sehriTime,
  iftarTime
}: {
  state: CountdownState
  event: 'sehri' | 'iftar'
  sehriTime: string
  iftarTime: string
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(2,11,26,0.6)] backdrop-blur-xl">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="relative flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">Next</p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              {event === 'iftar' ? 'Iftar Countdown' : 'Sehri Countdown'}
            </h2>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
            {event === 'iftar' ? (
              <Sparkles className="h-5 w-5 text-amber-200" />
            ) : (
              <MoonStar className="h-5 w-5 text-sky-200" />
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="rounded-2xl border border-white/10 bg-white/5 py-4">
            <FlipNumber value={state.hours} />
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300/80">Hours</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 py-4">
            <FlipNumber value={state.minutes} />
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300/80">Minutes</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 py-4">
            <FlipNumber value={state.seconds} />
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300/80">Seconds</p>
          </div>
        </div>

        <div className="grid gap-3 text-sm text-slate-200 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200/60">Sehri Ends</p>
            <p className="mt-1 text-lg font-semibold text-white">{sehriTime}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200/60">Iftar Time</p>
            <p className="mt-1 text-lg font-semibold text-white">{iftarTime}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountdownCard
