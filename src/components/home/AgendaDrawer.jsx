import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import PhotoSlot from '../ui/PhotoSlot.jsx'
import Button from '../ui/Button.jsx'

// AgendaDrawer — popup detail agenda saat baris agenda pada section
// "Segera di kampus" diklik. Pola sama dengan drawer di halaman
// Pendidikan (kelas .pd).
export default function AgendaDrawer({ agenda, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!agenda) return
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
  }, [agenda, onClose])

  if (!agenda) return null

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="pd" role="dialog" aria-modal="true" aria-label={agenda.title}>
        <div className="pd-head">
          <span className="eyebrow">Agenda</span>
          <h3>{agenda.title}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup agenda"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <PhotoSlot
            caption={agenda.fotoCaption}
            className="h-[170px]"
            aria-label={agenda.fotoCaption}
          />
          <dl className="pd-meta">
            <div>
              <dt>Tanggal</dt>
              <dd>{agenda.tanggal}</dd>
            </div>
            <div>
              <dt>Tempat &amp; waktu</dt>
              <dd>{agenda.meta}</dd>
            </div>
            <div>
              <dt>Penyelenggara</dt>
              <dd>{agenda.penyelenggara}</dd>
            </div>
          </dl>
          <p className="pd-note">{agenda.deskripsiNote}</p>
          <div className="pd-sec">
            <h4>Susunan acara</h4>
            <ul className="clean list-none p-0 m-0">
              {agenda.susunan.map((s, i) => (
                <li key={i} className="pd-row">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="btn-row">
            <Button variant="dark" asButton onClick={() => {}}>
              Daftar hadir
            </Button>
            <Button variant="line" asButton onClick={() => {}}>
              Tambahkan ke kalender
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
