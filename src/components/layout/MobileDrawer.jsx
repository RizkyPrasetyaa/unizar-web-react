import { useEffect, useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { NAV_LEFT, NAV_RIGHT } from '../../data/navigation.js'
import { toHref } from '../../lib/router.js'

// MobileDrawer — slide-in panel dari kiri untuk mobile
// Setiap menu: label (klik → navigasi) + tombol expand (klik → buka sub-link)
export default function MobileDrawer({ open, onClose }) {
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) setExpanded(null)
  }, [open])

  if (!open) return null

  const toggle = (key) => {
    setExpanded(expanded === key ? null : key)
  }

  const renderMenu = (m) => (
    <div key={m.key} className="border-b border-line">
      <div className="flex items-stretch">
        {/* Clickable label — navigates */}
        <a
          href={toHref(m.to)}
          onClick={onClose}
          className="flex-1 py-3.5 pl-1 pr-2 font-extrabold text-[15px] no-underline text-ink"
        >
          {m.label}
        </a>
        {/* Expand toggle button */}
        {m.mega && m.mega.links.length > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              toggle(m.key)
            }}
            aria-expanded={expanded === m.key}
            aria-label={expanded === m.key ? `Tutup sub-menu ${m.label}` : `Buka sub-menu ${m.label}`}
            className="w-12 flex items-center justify-center text-em-700 hover:bg-em-50 transition-colors"
          >
            <ChevronDown
              size={20}
              strokeWidth={1.9}
              style={{
                transform: expanded === m.key ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </button>
        )}
      </div>
      {/* Sub-links */}
      {expanded === m.key && m.mega && (
        <div className="pb-2 bg-em-50">
          <a
            href={toHref(m.to)}
            onClick={onClose}
            className="block py-2.5 pl-4 no-underline text-ink text-[14px] font-bold"
          >
            Lihat semua {m.label}
          </a>
          {m.mega.links.map((l, i) => (
            <a
              key={i}
              href={toHref(l.to)}
              onClick={onClose}
              className="block py-2.5 pl-4 no-underline text-ink text-[14px]"
            >
              {l.title}
            </a>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div
      className="fixed inset-0 z-[85] bg-[rgba(3,41,31,0.5)]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Menu navigasi"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-[min(380px,92vw)] bg-white overflow-auto animate-slide p-3 pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <img src="/logo.png" alt="UNIZAR" className="w-10 h-10" />
          <button
            type="button"
            onClick={onClose}
            className="icon-btn border-0 bg-transparent w-11 h-11 rounded-r grid place-items-center text-em-800 hover:bg-em-50"
            aria-label="Tutup menu"
          >
            <X size={20} strokeWidth={1.9} />
          </button>
        </div>

        {/* Quick access */}
        <div className="grid grid-cols-2 gap-2 my-4">
          {[
            { label: 'PMB 2027', to: '/pendidikan#penerimaan' },
            { label: 'Berita', to: '/berita' },
            { label: 'Layanan', to: '/layanan' },
            { label: 'Masuk', to: '/masuk' },
          ].map((q, i) => (
            <a
              key={i}
              href={toHref(q.to)}
              onClick={onClose}
              className="bg-em-50 rounded-r p-3 font-bold text-sm no-underline text-em-800"
            >
              {q.label}
            </a>
          ))}
        </div>

        {/* All main menus */}
        {[...NAV_LEFT, ...NAV_RIGHT].map(renderMenu)}
      </div>
    </div>
  )
}
