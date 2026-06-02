const categoryColors = {
  hero: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
  work: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  about: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  other: 'bg-zinc-500/15 text-zinc-300 border-zinc-500/25',
}

export default function Badge({ children, category, className = '' }) {
  const color = category ? categoryColors[category] || categoryColors.other : 'bg-white/5 text-zinc-300 border-white/10'
  return (
    <span
      className={[
        'inline-flex items-center rounded-lg border px-2 py-0.5 text-xs font-medium capitalize',
        color,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
