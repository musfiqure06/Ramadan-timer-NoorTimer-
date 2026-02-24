import { motion } from 'framer-motion'

const stars = Array.from({ length: 24 })

const BackgroundFX = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_55%)]" />
      <div className="absolute inset-0 opacity-60">
        {stars.map((_, index) => (
          <span
            key={index}
            className="star"
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 53) % 100}%`,
              animationDelay: `${index * 0.5}s`
            }}
          />
        ))}
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-56 bg-mosque"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export default BackgroundFX
