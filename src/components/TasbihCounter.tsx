import { motion } from 'framer-motion'
import { Minus, Plus, RotateCcw } from 'lucide-react'

const TasbihCounter = ({
  value,
  target,
  onChange,
  onReset,
  onTargetChange
}: {
  value: number
  target: number
  onChange: (next: number) => void
  onReset: () => void
  onTargetChange: (next: number) => void
}) => {
  const progress = Math.min(100, (value / target) * 100)

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(2,11,26,0.55)] backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">Digital Tasbih</p>
        <span className="text-xs text-slate-300/80">Target {target}</span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <motion.p
          key={value}
          className="text-4xl font-semibold text-white"
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {value}
        </motion.p>
        <div className="flex gap-2">
          <button
            onClick={() => onChange(Math.max(0, value - 1))}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={() => onChange(value + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-200/50 bg-amber-400/20 text-amber-200 transition hover:bg-amber-400/30"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={onReset}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-4 h-2 w-full rounded-full bg-white/10">
        <motion.div
          className="h-2 rounded-full bg-gradient-to-r from-amber-300 via-emerald-400 to-sky-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[33, 99, 300].map((preset) => (
          <button
            key={preset}
            onClick={() => onTargetChange(preset)}
            className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.3em] transition ${
              preset === target
                ? 'border-amber-200/70 bg-amber-400/20 text-amber-200'
                : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TasbihCounter
