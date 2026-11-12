import { toHref } from '../../lib/router.js'

// SmartLink — handles internal hash links + external URLs
export default function SmartLink({
  to,
  className,
  children,
  title,
  onClick,
  ariaLabel,
  id,
}) {
  if (to.startsWith('http')) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
        title={title}
        aria-label={ariaLabel}
        id={id}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  if (to === '#') {
    return (
      <a
        href="#"
        className={className}
        title={title}
        aria-label={ariaLabel}
        id={id}
        onClick={(e) => {
          e.preventDefault()
          onClick?.()
        }}
      >
        {children}
      </a>
    )
  }

  return (
    <a
      href={toHref(to)}
      className={className}
      title={title}
      aria-label={ariaLabel}
      id={id}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
