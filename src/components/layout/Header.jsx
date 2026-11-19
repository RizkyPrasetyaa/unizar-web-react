import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu as MenuIcon, Search } from 'lucide-react'
import { NAV_LEFT, NAV_RIGHT } from '../../data/navigation.js'
import { toHref } from '../../lib/router.js'
import { cn } from '../../lib/cn.js'
import MegaMenu from './MegaMenu.jsx'

// Header utama: split nav kiri | seal | nav kanan
// - Desktop (md+): nav kiri + logo + nav kanan, mega menu on click
// - Mobile (< md): logo + tombol search + tombol menu (buka drawer)
export default function Header({ onOpenDrawer, onOpenSearch, activeNav }) {
  const [openMenu, setOpenMenu] = useState(null)
  const headerRef = useRef(null)

  const closeMega = useCallback(() => setOpenMenu(null), [])
  const toggleMega = useCallback((key) => {
    setOpenMenu((prev) => (prev === key ? null : key))
  }, [])

  const handleLogoClick = (e) => {
    closeMega()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (window.location.hash === '#beranda' || window.location.hash === '' || window.location.hash === '#') {
      e.preventDefault()
    }
  }

  // Click outside header closes mega menu
  useEffect(() => {
    if (!openMenu) return
    const onClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        closeMega()
      }
    }
    const id = requestAnimationFrame(() => {
      document.addEventListener('click', onClick)
    })
    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener('click', onClick)
    }
  }, [openMenu, closeMega])

  // Escape closes mega menu
  useEffect(() => {
    if (!openMenu) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeMega()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openMenu, closeMega])

  const renderNavButton = (m) => (
    <button
      key={m.key}
      type="button"
      data-menu={m.key}
      aria-expanded={openMenu === m.key}
      aria-controls={`mega-${m.key}`}
      onClick={() => toggleMega(m.key)}
      className={cn(
        'border-0 bg-transparent px-3 py-2.5 rounded-card font-bold text-[15px] inline-flex items-center gap-1.5 whitespace-nowrap transition-colors',
        'hover:bg-em-50 hover:text-em-800',
        openMenu === m.key && 'bg-em-50 text-em-800',
        activeNav === m.key && 'text-em-800',
      )}
    >
      <span>{m.label}</span>
      <ChevronDown
        size={14}
        strokeWidth={1.9}
        style={{
          transform: openMenu === m.key ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}
      />
    </button>
  )

  return (
    <header
      ref={headerRef}
      className="bg-white"
    >
      {/* === Desktop layout === */}
      <div
        className="wrap hidden md:grid items-center gap-5 h-[84px]"
        style={{ gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)' }}
      >
        <nav className="nav l flex gap-0.5 justify-end" aria-label="Menu utama">
          {NAV_LEFT.map(renderNavButton)}
        </nav>

        <a
          href={toHref('/beranda')}
          onClick={handleLogoClick}
          className="seal flex flex-col items-center gap-0.5 no-underline cursor-pointer"
          aria-label="Beranda Universitas Islam Al-Azhar"
        >
          <img
            src="/logo.png"
            alt=""
            className="w-[58px] h-[58px] block transition-transform duration-300 hover:rotate-[-6deg] hover:scale-105"
          />
          <span className="text-[10px] font-extrabold tracking-[0.2em] text-em-800">UNIZAR</span>
        </a>

        <nav className="nav r flex gap-0.5" aria-label="Menu utama lanjutan">
          {NAV_RIGHT.map(renderNavButton)}
        </nav>
      </div>

      {/* === Mobile layout === */}
      <div className="wrap md:hidden flex items-center justify-between h-[60px]">
        <button
          type="button"
          onClick={onOpenDrawer}
          className="border-0 bg-transparent p-2 -ml-2 text-em-800"
          aria-label="Buka menu navigasi"
        >
          <MenuIcon size={24} strokeWidth={1.9} />
        </button>

        <a
          href={toHref('/beranda')}
          onClick={handleLogoClick}
          className="flex items-center gap-2 no-underline cursor-pointer"
          aria-label="Beranda"
        >
          <img src="/logo.png" alt="" className="w-9 h-9 block" />
          <span className="text-[15px] font-extrabold tracking-tight text-em-800">UNIZAR</span>
        </a>

        <button
          type="button"
          onClick={onOpenSearch}
          className="border-0 bg-transparent p-2 -mr-2 text-em-800"
          aria-label="Buka pencarian"
        >
          <Search size={22} strokeWidth={1.9} />
        </button>
      </div>

      {/* Garis kuning-merah di bawah bar menu */}
      <div
        className="h-[3px] w-full"
        style={{ background: 'linear-gradient(90deg, #f2c230 0 88%, #c1272d 88% 100%)' }}
      />

      {/* Mega menu (desktop only) */}
      {openMenu && (
        <div className="hidden md:block absolute left-0 right-0 top-full z-50">
          <MegaMenu
            menu={NAV_LEFT.concat(NAV_RIGHT).find((m) => m.key === openMenu)}
            onClose={closeMega}
          />
        </div>
      )}
    </header>
  )
}
