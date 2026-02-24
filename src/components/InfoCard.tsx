import { motion } from 'framer-motion'

const InfoCard = ({ title, subtitle, content }: { title: string; subtitle: string; content: string }) => {
  return (
    <motion.div
      className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(2,11,26,0.45)] backdrop-blur-xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">{title}</p>
      <h3 className="mt-3 text-xl font-semibold text-white">{subtitle}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-200/80">{content}</p>
      <button className="mt-4 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200 hover:bg-white/20">
        API Ready
      </button>
    </motion.div>
  )
}

export default InfoCard
