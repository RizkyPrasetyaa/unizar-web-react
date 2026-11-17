import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { AGENDA } from '../../data/content.js'
import { toHref } from '../../lib/router.js'
import AgendaDrawer from './AgendaDrawer.jsx'

// AgendaSection — list agenda + CTA PMB 2027.
// Klik baris agenda membuka popup detail agenda (AgendaDrawer).
export default function AgendaSection() {
  const [detail, setDetail] = useState(null)

  return (
    <section className="sec bg-white">
      <div className="wrap split">
        <div>
          <div className="sec-h">
            <div>
              <span className="eyebrow">Agenda</span>
              <h2>Segera di kampus</h2>
            </div>
          </div>
          <ul className="clean list-none p-0 m-0 grid">
            {AGENDA.map((a, i) => (
              <li
                key={i}
                className="grid items-center gap-4 py-3.5 border-b border-line cursor-pointer transition-colors hover:bg-em-50"
                style={{ gridTemplateColumns: '64px minmax(0,1fr)' }}
                onClick={() => setDetail(a)}
              >
                <span className="d bg-em-50 rounded-card text-center py-2 font-extrabold text-em-800 leading-[1.1]">
                  {a.day}
                  <small className="block text-[11px] tracking-[0.08em] text-em-700">
                    {a.month}
                  </small>
                </span>
                <div>
                  <button
                    type="button"
                    className="text-left font-[inherit] bg-transparent border-0 p-0 no-underline text-ink hover:text-em-700 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDetail(a)
                    }}
                  >
                    <b>{a.title}</b>
                  </button>
                  <div className="text-muted text-sm">{a.meta}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="band self-stretch bg-em-800 text-white rounded-panel p-9 flex flex-wrap gap-6 items-center justify-between relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'var(--pattern)', opacity: 0.7 }}
            aria-hidden="true"
          />
          <div className="relative min-w-0 flex-1 basis-[200px]">
            <span className="eyebrow text-gold">PMB 2027</span>
            <h2 className="text-white text-[28px]">Mulai perjalananmu di UNIZAR</h2>
            <p className="text-[#D3EBDF] mt-2">
              Lima jalur masuk, beasiswa KIP-Kuliah dan beasiswa internal, serta pendaftaran
              sepenuhnya daring.
            </p>
          </div>
          <a href={toHref('/pendidikan#penerimaan')} className="btn btn-pri relative shrink-0">
            Lihat jalur masuk
            <ArrowRight size={18} strokeWidth={1.9} />
          </a>
        </div>
      </div>

      <AgendaDrawer agenda={detail} onClose={() => setDetail(null)} />
    </section>
  )
}
