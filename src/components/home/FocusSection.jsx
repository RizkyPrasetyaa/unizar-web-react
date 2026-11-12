import { ArrowRight } from 'lucide-react'
import { FOCUS_AREAS } from '../../data/content.js'
import Pill from '../ui/Pill.jsx'
import PhotoSlot from '../ui/PhotoSlot.jsx'
import { toHref } from '../../lib/router.js'

// FocusSection — 3 kartu fokus keunggulan UNIZAR
export default function FocusSection() {
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
              href={toHref(f.to)}
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
    </section>
  )
}
