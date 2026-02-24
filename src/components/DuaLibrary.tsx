import { motion } from 'framer-motion'
import { BookOpen, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DUAS } from '../lib/duas'

const DuaLibrary = () => {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(() => ['All', ...new Set(DUAS.map((item) => item.category))], [])

  const filtered = useMemo(() => {
    return DUAS.filter((item) => {
      const matchesQuery = `${item.title} ${item.translation}`.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      return matchesQuery && matchesCategory
    })
  }, [activeCategory, query])

  return (
    <motion.div
      className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(2,11,26,0.55)] backdrop-blur-xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">Dua Library</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Ramadan Duas for daily reflection</h3>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs text-slate-200">
          <BookOpen className="h-4 w-4 text-amber-200" />
          Collection
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
              activeCategory === category
                ? 'border-amber-200/70 bg-amber-400/20 text-amber-200'
                : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
        <Search className="h-4 w-4 text-amber-200" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search duas"
          className="w-full bg-transparent outline-none"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {filtered.map((dua) => (
          <div key={dua.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">{dua.category}</p>
            <h4 className="mt-2 text-lg font-semibold text-white">{dua.title}</h4>
            <p className="mt-3 text-right text-xl leading-relaxed text-slate-100">{dua.arabic}</p>
            <p className="mt-3 text-sm text-slate-300 italic">{dua.transliteration}</p>
            <p className="mt-3 text-sm text-slate-200/80">{dua.translation}</p>
          </div>
        ))}
        {!filtered.length && (
          <p className="col-span-full text-center text-sm text-slate-300">No duas match your search.</p>
        )}
      </div>
    </motion.div>
  )
}

export default DuaLibrary
