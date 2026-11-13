import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { SEARCH_INDEX } from '../../data/content.js'
import { toHref } from '../../lib/router.js'

// SearchOverlay — overlay pencarian site-wide
function normalize(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
    if (!open) {
      setQ('')
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const results = useMemo(() => {
    if (!q.trim()) return SEARCH_INDEX
    const nq = normalize(q)
    return SEARCH_INDEX.filter((r) => normalize(r.t + ' ' + r.g).includes(nq)).slice(0, 14)
  }, [q])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] bg-[rgba(3,41,31,0.55)] flex justify-center items-start p-16 md:p-20 pt-20 md:pt-20"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian"
    >
      <div
        className="w-[min(720px,100%)] bg-white rounded-panel overflow-hidden shadow-search"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (results[0]) {
              window.location.hash = toHref(results[0].to).slice(1)
              onClose()
            }
          }}
          className="flex items-center gap-3 p-4 px-5 border-b border-line"
        >
          <Search size={22} strokeWidth={1.9} className="text-em-800" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari prodi, layanan, dokumen, atau orang…"
            className="flex-1 border-0 outline-none text-lg min-w-0 bg-transparent"
            aria-label="Kata kunci pencarian"
          />
          <button
            type="button"
            onClick={onClose}
            className="border-0 bg-transparent w-11 h-11 rounded-card grid place-items-center text-em-800 hover:bg-em-50"
            aria-label="Tutup pencarian"
          >
            <X size={18} strokeWidth={1.9} />
          </button>
        </form>
        <ul className="max-h-[60vh] overflow-auto">
          {!results.length && (
            <li className="hint p-3.5 px-5 text-muted text-sm">
              Tidak ada hasil untuk &ldquo;{q}&rdquo;. Coba kata lain, misalnya
              &ldquo;beasiswa&rdquo;, &ldquo;SPMI&rdquo;, atau &ldquo;Ind. 28&rdquo;.
            </li>
          )}
          {results.map((r, i) => (
            <li key={i}>
              <a
                href={toHref(r.to)}
                onClick={onClose}
                className="w-full flex justify-between gap-3 p-3 px-5 text-left text-ink border-b border-em-50 hover:bg-em-50 transition-colors"
              >
                <span>{r.t}</span>
                <small className="text-muted whitespace-nowrap">{r.g}</small>
              </a>
            </li>
          ))}
        </ul>
        <div className="hint p-3.5 px-5 text-muted text-sm">
          Tekan <kbd className="px-1.5 py-0.5 border border-line rounded-card">/</kbd> untuk mencari,{' '}
          <kbd className="px-1.5 py-0.5 border border-line rounded-card">Esc</kbd> untuk menutup.
        </div>
      </div>
    </div>
  )
}
