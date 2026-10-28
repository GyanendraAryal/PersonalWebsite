const variants = {
  primary:
    'bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/20',
  secondary:
    'bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-100 border border-white/10',
  danger:
    'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20',
  ghost: 'hover:bg-white/5 text-zinc-300',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-xl',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-6 py-2.5 text-sm rounded-2xl',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  children,
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
