import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import PhotoSlot from '../ui/PhotoSlot.jsx'
import Button from '../ui/Button.jsx'
import { toHref } from '../../lib/router.js'

// PartnerDrawer — popup detail mitra saat kartu logo pada section
// "Bekerja bersama" diklik. Pola sama dengan drawer berita/agenda
// dan drawer di halaman Pendidikan (kelas .pd).
export default function PartnerDrawer({ mitra, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!mitra) return
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
  }, [mitra, onClose])

  if (!mitra) return null

  const keKerjasama = () => {
    window.location.hash = toHref('/kerjasama').replace(/^#/, '')
  }

  return (
    <>
      <div className="pd-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="pd" role="dialog" aria-modal="true" aria-label={mitra.nama}>
        <div className="pd-head">
          <span className="eyebrow">Kerja sama · {mitra.kelompok}</span>
          <h3>{mitra.nama}</h3>
          <button
            ref={closeRef}
            type="button"
            className="pd-close"
            onClick={onClose}
            aria-label="Tutup detail mitra"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="pd-body">
          <PhotoSlot
            caption="Foto: kegiatan bersama mitra"
            className="h-[170px]"
            aria-label="Foto: kegiatan bersama mitra"
          />
          <dl className="pd-meta">
            <div>
              <dt>Bidang</dt>
              <dd>{mitra.bidang}</dd>
            </div>
            <div>
              <dt>Jenis naskah</dt>
              <dd>{mitra.jenisNaskah}</dd>
            </div>
            <div>
              <dt>Masa berlaku</dt>
              <dd>{mitra.masaBerlaku}</dd>
            </div>
            <div>
              <dt>Status realisasi</dt>
              <dd>{mitra.statusRealisasi}</dd>
            </div>
          </dl>
          <p className="pd-note">{mitra.lingkupNote}</p>
          <div className="pd-sec">
            <h4>Kegiatan yang terealisasi</h4>
            <ul className="clean list-none p-0 m-0">
              {mitra.kegiatan.map((k, i) => (
                <li key={i} className="pd-row">
                  {k}
                </li>
              ))}
            </ul>
          </div>
          <div className="btn-row">
            <Button variant="dark" asButton onClick={() => {}}>
              Naskah kerja sama
            </Button>
            <Button variant="line" asButton onClick={keKerjasama}>
              Ajukan kerja sama baru
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
