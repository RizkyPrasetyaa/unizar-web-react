import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { STORIES } from '../../data/content.js'
import Pill from '../ui/Pill.jsx'
import PhotoSlot from '../ui/PhotoSlot.jsx'
import { toHref } from '../../lib/router.js'
import StoryDrawer from './StoryDrawer.jsx'

// StoriesSection — 1 berita besar + 2 berita kecil.
// Klik kartu membuka popup detail berita (StoryDrawer).
export default function StoriesSection() {
  const [detail, setDetail] = useState(null)
  const big = STORIES.find((s) => s.size === 'lg')
  const smalls = STORIES.filter((s) => s.size === 'sm')

  return (
    <section className="sec">
      <div className="wrap">
        <div className="sec-h">
          <div>
            <span className="eyebrow">Kabar &amp; kisah</span>
            <h2>Yang sedang terjadi di kampus</h2>
          </div>
          <a href={toHref('/berita')} className="btn btn-line">
            Semua berita
            <ArrowRight size={18} strokeWidth={1.9} />
          </a>
        </div>

        <div className="stories">
          <button
            type="button"
            onClick={() => setDetail(big)}
            className="story flex flex-col bg-white border border-line rounded-card overflow-hidden text-ink text-left hover:shadow-card transition-shadow card-link cursor-pointer"
          >
            <PhotoSlot
              variant={big.photoVariant || 'default'}
              caption={big.photoCaption}
              className="h-[300px] rounded-none"
              aria-label={big.photoCaption}
            />
            <div className="t p-5 pb-6 flex flex-col gap-2">
              <Pill variant={big.pillVariant}>{big.pill}</Pill>
              <h3 className="text-[22px]">{big.title}</h3>
              <p className="text-muted">{big.excerpt}</p>
              <small className="text-muted">{big.dateLabel}</small>
            </div>
          </button>

          <div className="story-stack">
            {smalls.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setDetail(s)}
                className="story sm flex flex-row bg-white border border-line rounded-card overflow-hidden text-ink text-left hover:shadow-card transition-shadow card-link cursor-pointer"
              >
                <PhotoSlot
                  variant={s.photoVariant || 'default'}
                  caption={s.photoCaption}
                  className="w-[42%] min-h-[150px] rounded-none flex-none"
                  aria-label={s.photoCaption}
                />
                <div className="t p-5 flex flex-col gap-2">
                  <Pill variant={s.pillVariant}>{s.pill}</Pill>
                  <h3 className="text-[17px]">{s.title}</h3>
                  <small className="text-muted">{s.dateLabel}</small>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <StoryDrawer story={detail} onClose={() => setDetail(null)} />
    </section>
  )
}
