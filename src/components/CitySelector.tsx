import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CityOption } from '../lib/cities'

const CitySelector = ({
  city,
  cities,
  onChange
}: {
  city: CityOption
  cities: CityOption[]
  onChange: (next: CityOption) => void
}) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement | null>(null)

  const filtered = useMemo(() => {
    if (!query) return cities
    return cities.filter((item) =>
      `${item.name} ${item.country}`.toLowerCase().includes(query.toLowerCase()),
    )
  }, [cities, query])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick)
    }
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="relative z-50" ref={containerRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white shadow-[0_0_30px_rgba(15,23,42,0.35)] backdrop-blur"
      >
        <span className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-amber-200" />
          {city.name}, {city.country}
        </span>
        <span className="text-xs text-amber-200/70">Change</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 z-50 mt-3 w-full min-w-[260px] rounded-2xl border border-white/10 bg-[#0b1425]/95 p-3 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
              <Search className="h-4 w-4 text-amber-200" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search city"
                className="w-full bg-transparent outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="mt-3 max-h-60 space-y-1 overflow-y-auto pr-1">
              {filtered.map((item) => (
                <button
                  key={`${item.name}-${item.country}`}
                  onClick={() => {
                    onChange(item)
                    setOpen(false)
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-100 transition hover:bg-white/10"
                >
                  <span>{item.name}</span>
                  <span className="text-xs text-slate-400">{item.country}</span>
                </button>
              ))}
              {!filtered.length && (
                <p className="py-3 text-center text-xs text-slate-400">No cities found</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CitySelector
