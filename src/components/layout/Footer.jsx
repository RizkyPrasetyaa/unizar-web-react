import { FOOTER_GROUPS } from '../../data/navigation.js'
import { toHref } from '../../lib/router.js'

// Footer — info kampus + group link + bottom bar
export default function Footer() {
  return (
    <footer className="bg-em-950 text-[#BFD9CC] mt-auto">
      <div
        className="h-1 w-full"
        style={{ background: 'linear-gradient(90deg, #f2c230 0 88%, #c1272d 88% 100%)' }}
      />
      <div className="wrap" style={{ paddingTop: '52px', paddingBottom: '28px' }}>
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: '1.4fr repeat(4, minmax(0,1fr))' }}
        >
          {/* Brand block */}
          <div>
            <div className="f-id flex gap-3 items-center mb-3">
              <img src="/logo.png" alt="Logo UNIZAR" className="w-[52px] h-[52px]" />
              <b className="text-white leading-[1.3]">
                Universitas Islam
                <br />
                Al-Azhar
              </b>
            </div>
            <p className="text-sm leading-[1.6]">
              Jl. Unizar No. 20, Turida, Sandubaya, Mataram, NTB 83232
              <br />
              (0370) 6175555 · humas@unizar.ac.id
            </p>
            <p className="text-[13px] mt-2.5">Instagram · YouTube · Facebook · TikTok</p>
          </div>

          {/* Link groups */}
          {FOOTER_GROUPS.map((g, i) => (
            <div key={i}>
              <h4 className="text-white text-sm mb-3 font-bold">{g.title}</h4>
              {g.links.map((l, j) =>
                l.external && l.to.startsWith('http') ? (
                  <a
                    key={j}
                    href={l.to}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="block py-[3px] text-sm text-[#BFD9CC] no-underline hover:text-white hover:underline"
                  >
                    {l.label}
                  </a>
                ) : (
                  <a
                    key={j}
                    href={toHref(l.to)}
                    className="block py-[3px] text-sm text-[#BFD9CC] no-underline hover:text-white hover:underline"
                  >
                    {l.label}
                  </a>
                ),
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="f-bot flex justify-between gap-3 flex-wrap border-t border-[rgba(191,217,204,0.18)] mt-9 pt-[18px] text-[13px]">
          <span>© 2026 Universitas Islam Al-Azhar</span>
          <span className="flex flex-wrap gap-2">
            <a href={toHref('/legal/privasi')} className="text-[#BFD9CC] hover:text-white hover:underline">
              Kebijakan privasi
            </a>
            <span aria-hidden>·</span>
            <a href={toHref('/legal/sangkalan')} className="text-[#BFD9CC] hover:text-white hover:underline">
              Pernyataan sangkalan
            </a>
            <span aria-hidden>·</span>
            <a href={toHref('/legal/aksesibilitas')} className="text-[#BFD9CC] hover:text-white hover:underline">
              Aksesibilitas
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
