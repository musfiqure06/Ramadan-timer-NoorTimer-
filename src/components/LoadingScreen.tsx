import { motion } from 'framer-motion'

const LoadingScreen = ({ visible }: { visible: boolean }) => {
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020b1a]/90 backdrop-blur-xl">
      <motion.div
        className="flex flex-col items-center gap-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative h-24 w-24"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 blur-xl opacity-70" />
          <div className="absolute inset-2 rounded-full bg-[#020b1a]" />
          <div className="absolute left-2 top-2 h-16 w-16 rounded-full bg-gradient-to-br from-amber-300 to-yellow-400 shadow-[0_0_25px_rgba(255,208,120,0.7)]" />
        </motion.div>
        <motion.p
          className="text-base font-semibold uppercase tracking-[0.25em] text-amber-200/80"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          NoorTimer is awakening
        </motion.p>
        <motion.div
          className="space-y-2 text-sm text-slate-200/80"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-semibold">Crafted by Musfiqure Rahman</p>
          <p>President, EUB Programming Club</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoadingScreen
