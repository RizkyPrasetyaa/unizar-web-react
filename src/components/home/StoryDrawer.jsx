import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import PhotoSlot from '../ui/PhotoSlot.jsx'
import Button from '../ui/Button.jsx'
import { toHref } from '../../lib/router.js'

// StoryDrawer — popup detail berita saat kartu pada section "Kabar & Kisah"
// diklik. Pola sama dengan drawer di halaman Pendidikan (kelas .pd).
export default function StoryDrawer({ story, onClose }) {
  const closeRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!story) return
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [story, onClose])

  if (!story) return null

  const bagikan = () => {
    try {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard tidak tersedia di perangkat ini.
    }
  }

  const keBerita = () => {
    window.location.hash = toHref('/berita').replace(/^#/, '')
  }

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="pd" role="dialog" aria-modal="true" aria-label={story.title}>
        <div className="pd-head">
          <span className="eyebrow">{story.pill}</span>
          <h3>{story.title}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup berita"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <PhotoSlot
            variant={story.photoVariant || 'default'}
            caption={story.photoCaption}
            className="h-[170px]"
            aria-label={story.photoCaption}
          />
          <dl className="pd-meta">
            <div>
              <dt>Tanggal</dt>
              <dd>{story.dateLabel}</dd>
            </div>
            <div>
              <dt>Penulis</dt>
              <dd>{story.penulis}</dd>
            </div>
          </dl>
          <p className="pd-bio">{story.excerpt}</p>
          <p className="pd-note">{story.isiNote}</p>
          <div className="btn-row">
            <Button variant="line" asButton onClick={bagikan}>
              {copied ? 'Tautan disalin ✓' : 'Bagikan berita'}
            </Button>
            <Button variant="line" asButton onClick={keBerita}>
              Berita lainnya
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
