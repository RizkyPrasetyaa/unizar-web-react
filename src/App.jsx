import { useMemo } from 'react'
import Layout from './components/layout/Layout.jsx'
import { useHashRouter } from './lib/router.js'

import Beranda from './pages/Beranda.jsx'
import Profil from './pages/Profil.jsx'
import Fakultas from './pages/Fakultas.jsx'
import FakultasKedokteran from './pages/FakultasKedokteran.jsx'
import ProdiPendidikanDokter from './pages/ProdiPendidikanDokter.jsx'
import Direktori from './pages/Direktori.jsx'
import Pusdatin from './pages/Pusdatin.jsx'
import TataKelola from './pages/TataKelola.jsx'
import Kinerja from './pages/Kinerja.jsx'
import Pendidikan from './pages/Pendidikan.jsx'
import Penelitian from './pages/Penelitian.jsx'
import PublikasiInovasi from './pages/PublikasiInovasi.jsx'
import Pengabdian from './pages/Pengabdian.jsx'
import PenjaminanMutu from './pages/PenjaminanMutu.jsx'
import PetaBukti from './pages/PetaBukti.jsx'
import Layanan from './pages/Layanan.jsx'
import Kerjasama from './pages/Kerjasama.jsx'
import MahasiswaAlumni from './pages/MahasiswaAlumni.jsx'
import Masuk from './pages/Masuk.jsx'
import Berita from './pages/Berita.jsx'
import Dasbor from './pages/Dasbor.jsx'

// Map every route path → page component
const PAGES = {
  '/beranda': Beranda,
  '/': Beranda,
  '/profil': Profil,
  '/fakultas': Fakultas,
  '/fakultas/kedokteran': FakultasKedokteran,
  '/prodi/pendidikan-dokter': ProdiPendidikanDokter,
  '/direktori': Direktori,
  '/pusdatin': Pusdatin,
  '/tata-kelola': TataKelola,
  '/kinerja': Kinerja,
  '/pendidikan': Pendidikan,
  '/penelitian': Penelitian,
  '/publikasi-inovasi': PublikasiInovasi,
  '/pengabdian': Pengabdian,
  '/penjaminan-mutu': PenjaminanMutu,
  '/peta-bukti': PetaBukti,
  '/layanan': Layanan,
  '/kerjasama': Kerjasama,
  '/mahasiswa-alumni': MahasiswaAlumni,
  '/masuk': Masuk,
  '/berita': Berita,
  '/dasbor': Dasbor,
}

// Sub-paths that resolve to parent page
const SUB_PATH_PARENTS = {
  '/profil/angka': '/profil',
  '/profil/sdgs': '/profil',
}

export default function App() {
  const { route } = useHashRouter()

  const PageComponent = useMemo(() => {
    if (PAGES[route.path]) return PAGES[route.path]
    if (SUB_PATH_PARENTS[route.path]) return PAGES[SUB_PATH_PARENTS[route.path]]
    return Beranda
  }, [route.path])

  return (
    <Layout>
      <PageComponent />
    </Layout>
  )
}
