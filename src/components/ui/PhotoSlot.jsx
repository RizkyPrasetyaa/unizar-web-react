import { cn } from '../../lib/cn.js'

// PhotoSlot — placeholder gradient + pattern emerald untuk foto asli.
// variant: default, warm, red, sky
export default function PhotoSlot({
  variant = 'default',
  caption,
  className,
  style,
  role = 'img',
  'aria-label': ariaLabel,
}) {
  const variantClass = {
    default: '',
    warm: 'warm',
    red: 'red',
    sky: 'sky',
  }[variant]

  return (
    <div
      className={cn('ph', variantClass, className)}
      data-cap={caption || ''}
      role={role}
      aria-label={ariaLabel || caption || 'Tempat foto'}
      style={style}
    />
  )
}
