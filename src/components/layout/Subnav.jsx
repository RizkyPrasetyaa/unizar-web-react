import { useEffect, useRef, useState } from 'react'

// Subnav — sticky section navigation bar per page
// Auto-highlights current section based on scroll position
export default function Subnav({ items }) {
  const [active, setActive] = useState(0)
  const barRef = useRef(null)

  useEffect(() => {
    if (!items || !items.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return
          const idx = items.findIndex((it) => it.id === en.target.id)
          if (idx >= 0) {
            setActive(idx)
            const btn = barRef.current?.querySelectorAll('button')[idx]
            if (btn && barRef.current) {
              barRef.current.scrollTo({
                left: btn.offsetLeft - 20,
                behavior: 'smooth',
              })
            }
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    items.forEach((it) => {
      const el = document.getElementById(it.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  if (!items || !items.length) return null

  return (
    <div className="subnav">
      <div className="wrap no-scrollbar" ref={barRef}>
        {items.map((it, i) => (
          <button
            key={it.id}
            type="button"
            className={i === active ? 'on' : ''}
            onClick={() => {
              const el = document.getElementById(it.id)
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  )
}
