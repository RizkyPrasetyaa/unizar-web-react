import { cn } from '../../lib/cn.js'

// Pill — small label badge
// variant: default (emerald), gold, red
export default function Pill({ variant = 'default', className, children }) {
  const variantClass = {
    default: '',
    gold: 'gold',
    red: 'red',
  }[variant]

  return <span className={cn('pill', variantClass, className)}>{children}</span>
}
