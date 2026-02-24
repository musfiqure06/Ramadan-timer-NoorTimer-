import { motion } from 'framer-motion'

const ProgressTracker = ({ day }: { day: number }) => {
  const percentage = Math.min(100, (day / 30) * 100)
  const circumference = 2 * Math.PI * 46
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_rgba(2,11,26,0.45)] backdrop-blur-xl">
      <div className="relative h-28 w-28">
        <svg className="h-28 w-28" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8d477" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <p className="text-xl font-semibold">{day}</p>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">of 30</p>
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">Ramadan Progress</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Today is {day} of 30 Ramadan</h3>
        <p className="mt-2 text-sm text-slate-300/80">
          Stay mindful and keep your intentions pure as you journey through the blessed month.
        </p>
        <div className="mt-4 h-2 w-full rounded-full bg-white/10">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-amber-300 via-emerald-400 to-sky-400"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2 }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressTracker
