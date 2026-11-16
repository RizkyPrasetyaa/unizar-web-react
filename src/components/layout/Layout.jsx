import { useCallback, useEffect, useState } from 'react'
import UtilityBar from './UtilityBar.jsx'
import Header from './Header.jsx'
import QuickRail from './QuickRail.jsx'
import Footer from './Footer.jsx'
import MobileDrawer from './MobileDrawer.jsx'
import SearchOverlay from './SearchOverlay.jsx'
import { useHashRouter, pageKeyFromPath } from '../../lib/router.js'

export default function Layout({ children }) {
  const { route } = useHashRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Determine active top-level nav key
  const topKey = route.path.split('/')[1] || 'beranda'
  const activeNavMap = {
    profil: 'profil',
    fakultas: 'fakultas',
    prodi: 'fakultas',
    direktori: 'direktori',
    pusdatin: 'direktori',
    'tata-kelola': 'tata-kelola',
    pendidikan: 'pendidikan',
    penelitian: 'penelitian',
    'publikasi-inovasi': 'penelitian',
    pengabdian: 'pengabdian',
    'penjaminan-mutu': 'penjaminan-mutu',
    'peta-bukti': 'penjaminan-mutu',
  }
  const activeNav = activeNavMap[topKey]

  // Close overlays on route change
  useEffect(() => {
    setDrawerOpen(false)
    setSearchOpen(false)
  }, [route.path, route.section])

  // Update document title
  useEffect(() => {
    const pageName = pageKeyFromPath(route.path)
    const titles = {
      beranda: 'Beranda',
      profil: 'Profil',
      'profil-angka': 'UNIZAR dalam Angka',
      'profil-sdgs': 'UNIZAR untuk SDGs',
      fakultas: 'Fakultas',
      'fakultas-kedokteran': 'Fakultas Kedokteran',
      'prodi-pendidikan-dokter': 'Pendidikan Dokter',
      direktori: 'Direktori',
      pusdatin: 'Pusat Data & Informasi',
      'tata-kelola': 'Tata Kelola',
      kinerja: 'Portal Kinerja & Risiko',
      pendidikan: 'Pendidikan',
      penelitian: 'Penelitian',
      'publikasi-inovasi': 'Publikasi & Inovasi',
      pengabdian: 'Pengabdian',
      'penjaminan-mutu': 'Penjaminan Mutu',
      'peta-bukti': 'Peta Bukti BAN-PT',
      layanan: 'Layanan',
      kerjasama: 'Kerjasama & Internasional',
      'mahasiswa-alumni': 'Mahasiswa & Alumni',
      masuk: 'Masuk',
      berita: 'Berita & Agenda',
      dasbor: 'Dasbor',
    }
    document.title = `${titles[pageName] || 'Beranda'} | Universitas Islam Al-Azhar`
  }, [route.path])

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const openSearch = useCallback(() => {
    setDrawerOpen(false)
    setSearchOpen(true)
  }, [])

  // "/" shortcut to open search
  useEffect(() => {
    const onKey = (e) => {
      if (
        e.key === '/' &&
        !/input|textarea|select/i.test((document.activeElement?.tagName || '').toLowerCase())
      ) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="skip">
        Lewati ke konten
      </a>

      {/* Stack atas sticky — utility bar + header tetap tampil saat discroll */}
      <div className="sticky top-0 z-50">
        <UtilityBar onOpenSearch={openSearch} />
        <Header onOpenDrawer={openDrawer} onOpenSearch={openSearch} activeNav={activeNav} />
      </div>
      <QuickRail />

      <main id="main" className="flex-1 min-h-[60vh]">
        {children}
      </main>

      <Footer />

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
