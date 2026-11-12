import { cn } from '../../lib/cn.js'
import { toHref } from '../../lib/router.js'

// Card — generic surface card
// Bisa dipakai sebagai <a> (link) atau <div>
export default function Card({
  to,
  href,
  flat = false,
  className,
  style,
  id,
  children,
  onClick,
  title,
}) {
  const classes = cn('card', flat && 'flat', (to || href) && 'card-link', className)

  if (href || (to && to.startsWith('http'))) {
    return (
      <a
        id={id}
        href={href || to}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
        style={style}
        title={title}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  // Placeholder "#" renders as div to avoid nested <a> tags
  if (to && to !== '#') {
    return (
      <a
        id={id}
        href={toHref(to)}
        className={classes}
        style={style}
        title={title}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <div id={id} className={classes} style={style} onClick={onClick}>
      {children}
    </div>
  )
}
