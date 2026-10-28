import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Card from './Card'

function AnimatedNumber({ value }) {
  if (typeof value !== 'number') {
    return (
      <motion.span
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-zinc-100"
      >
        {value}
      </motion.span>
    )
  }
  return <AnimatedCount value={value} />
}

function AnimatedCount({ value }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const duration = 600
    const start = performance.now()
    const from = 0
    const to = value
    let frame
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - t) ** 3
      setDisplay(Math.round(from + (to - from) * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return (
    <motion.span
      key={String(value)}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-2xl font-bold text-zinc-100"
    >
      {display}
    </motion.span>
  )
}

export default function StatCard({ icon: Icon, label, value, sublabel }) {
  const accent = 'from-orange-500/20 to-orange-600/5 text-orange-400'
  return (
    <Card hover className="relative overflow-hidden">
      <div
        className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${accent} opacity-60 blur-2xl`}
      />
      <div
        className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${accent}`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <AnimatedNumber value={value} />
      <p className="mt-1 text-sm font-medium text-zinc-400">{label}</p>
      {sublabel && <p className="mt-0.5 text-xs text-zinc-600">{sublabel}</p>}
    </Card>
  )
}
