// cn — className merge utility (clsx + tailwind-merge pattern, simplified)
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
