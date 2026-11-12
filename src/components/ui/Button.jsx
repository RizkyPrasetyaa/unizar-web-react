import { cn } from '../../lib/cn.js'
import { toHref } from '../../lib/router.js'

// Button — varian: pri, dark, ghost, line
// Default tag <a> (untuk navigasi), bisa juga <button>
export default function Button({
  variant = 'pri',
  href,
  asButton = false,
  className,
  children,
  onClick,
  type = 'button',
  title,
  'aria-label': ariaLabel,
}) {
  const variantClass = {
    pri: 'btn-pri',
    dark: 'btn-dark',
    ghost: 'btn-ghost',
    line: 'btn-line',
  }[variant]

  // Render as <button> when no real href or href is "#" placeholder
  if (asButton || !href || href === '#') {
    return (
      <button
        type={type}
        className={cn('btn', variantClass, className)}
        onClick={(e) => {
          e.preventDefault()
          onClick?.()
        }}
        title={title}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    )
  }

  // External link
  if (href.startsWith('http')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cn('btn', variantClass, className)}
        title={title}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  // Internal hash link
  return (
    <a
      href={toHref(href)}
      className={cn('btn', variantClass, className)}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
