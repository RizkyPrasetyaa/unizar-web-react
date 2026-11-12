import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Download, X } from 'lucide-react'
import { FOCUS_AREAS } from '../../data/content.js'
import Pill from '../ui/Pill.jsx'
import PhotoSlot from '../ui/PhotoSlot.jsx'
import { toHref } from '../../lib/router.js'

// FocusSection — 3 kartu fokus keunggulan UNIZAR.
// Klik kartu membuka panel detail di samping; panel hanya berisi
// satu tombol download SK Rektor tentang Diferensiasi Misi.
export default function FocusSection() {
  const [active, setActive] = useState(null)
  const closeRef = useRef(null)

  // Esc menutup panel + kunci scroll body selama panel terbuka
  useEffect(() => {
    if (!active) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Keunggulan</span>
            <h2>Tiga fokus yang membedakan UNIZAR</h2>
            <p>Tiga komitmen yang menjiwai pendidikan, riset, dan pengabdian di UNIZAR.</p>
          </div>
          <a href={toHref('/profil#tentang')} className="btn btn-line">
            Baca diferensiasi misi
            <ArrowRight size={18} strokeWidth={1.9} />
          </a>
        </div>

        <div className="focus grid grid-cols-3 gap-5">
          {FOCUS_AREAS.map((f) => (
            <a
              key={f.key}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setActive(f)
              }}
              aria-haspopup="dialog"
              className="card p-0 overflow-hidden card-link"
            >
              <PhotoSlot
                variant={f.photoVariant}
                caption={f.photoCaption}
                className="h-[170px] rounded-none"
                aria-label={f.photoCaption}
              />
              <div className="body p-5 pb-6 flex flex-col gap-2">
                <Pill variant={f.pillVariant}>{f.pill}</Pill>
                <h3 className="text-xl">{f.title}</h3>
                <p className="text-muted text-[15px]">{f.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {active && (
        <div className="pop-root">
          <div className="pop-backdrop" onClick={() => setActive(null)} />
          <aside className="pop" role="dialog" aria-modal="true" aria-label={active.title}>
            <header className="pop-hd">
              <span className="eyebrow">Fokus keunggulan</span>
              <h3>{active.title}</h3>
              <button
                ref={closeRef}
                type="button"
                className="pop-x"
                onClick={() => setActive(null)}
                aria-label="Tutup panel detail"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </header>

            <div className="pop-bd">
              <PhotoSlot
                variant={active.photoVariant}
                caption={active.photoCaption.replace(/^Foto: /, '')}
                className="h-[210px] rounded-none"
                aria-label={active.photoCaption}
              />

              <dl className="pop-meta">
                {active.detail.meta.map(([label, value]) => (
                  <div key={label} className="contents">
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              {active.detail.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}

              <div className="pop-list">
                <b>Wujud nyata</b>
                <ul className="clean">
                  {active.detail.wujudNyata.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <footer className="pop-ft">
              {active.action.kind === 'download' ? (
                <a
                  href={active.action.href}
                  download
                  className="btn btn-dark w-full justify-center"
                >
                  <Download size={18} strokeWidth={2} />
                  {active.action.label}
                </a>
              ) : (
                <a
                  href={toHref(active.action.to)}
                  onClick={() => setActive(null)}
                  className="btn btn-dark w-full justify-center"
                >
                  {active.action.label}
                  <ArrowRight size={18} strokeWidth={1.9} />
                </a>
              )}
            </footer>
          </aside>
        </div>
      )}
    </section>
  )
}
