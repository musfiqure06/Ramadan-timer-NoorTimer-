import { motion } from 'framer-motion'
import type { RamadanDay } from '../lib/types'
import { formatDate, parseTime } from '../lib/utils'

const RamadanTable = ({ schedule }: { schedule: RamadanDay[] }) => {
  const todayKey = formatDate(new Date())

  return (
    <motion.div
      className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(2,11,26,0.55)] backdrop-blur-xl"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">Ramadan Timetable</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">30 Days Sehri & Iftar</h3>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">City Schedule</span>
      </div>
      <div className="max-h-[420px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-[#0b1425] text-left text-xs uppercase tracking-[0.3em] text-amber-200/70">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Hijri Date</th>
              <th className="px-6 py-4">Sehri End</th>
              <th className="px-6 py-4">Iftar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {schedule.map((day) => {
              const isToday = day.date.gregorian.date === todayKey
              return (
                <tr
                  key={day.date.gregorian.date}
                  className={
                    isToday
                      ? 'bg-gradient-to-r from-amber-500/20 via-emerald-500/10 to-transparent'
                      : 'hover:bg-white/5'
                  }
                >
                  <td className="px-6 py-4 text-slate-100">
                    {day.date.gregorian.date} ({day.date.gregorian.weekday.en})
                  </td>
                  <td className="px-6 py-4 text-slate-200">
                    {day.date.hijri.day} {day.date.hijri.month.en} {day.date.hijri.year}
                  </td>
                  <td className="px-6 py-4 text-sky-200">{parseTime(day.timings.Fajr)}</td>
                  <td className="px-6 py-4 text-amber-200">{parseTime(day.timings.Maghrib)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default RamadanTable
