import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  hover = false,
  glass = true,
  ...props
}) {
  return (
    <motion.div
      initial={false}
      whileHover={hover ? { y: -2, boxShadow: '0 12px 40px rgba(0,0,0,0.45)' } : undefined}
      className={[
        'rounded-3xl p-6 transition-shadow duration-300',
        glass ? 'admin-glass' : 'bg-zinc-900 border border-white/5',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </motion.div>
  )
}
