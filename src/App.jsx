import { useMemo } from 'react'
import Layout from './components/layout/Layout.jsx'
import { useHashRouter } from './lib/router.js'

import Beranda from './pages/Beranda.jsx'
import Profil from './pages/Profil.jsx'
import Fakultas from './pages/Fakultas.jsx'
import FakultasKedokteran from './pages/FakultasKedokteran.jsx'
import FakultasTeknik from './pages/FakultasTeknik.jsx'
import FakultasHukum from './pages/FakultasHukum.jsx'
import FakultasEkonomiBisnis from './pages/FakultasEkonomiBisnis.jsx'
import FakultasPertanian from './pages/FakultasPertanian.jsx'
import FakultasMIPA from './pages/FakultasMIPA.jsx'
import FakultasAgamaIslam from './pages/FakultasAgamaIslam.jsx'
import ProdiPendidikanDokter from './pages/ProdiPendidikanDokter.jsx'
import ProdiProfesiDokter from './pages/ProdiProfesiDokter.jsx'
import ProdiTeknikSipil from './pages/ProdiTeknikSipil.jsx'
import ProdiIlmuKomputer from './pages/ProdiIlmuKomputer.jsx'
import ProdiIlmuHukum from './pages/ProdiIlmuHukum.jsx'
import ProdiAkuntansi from './pages/ProdiAkuntansi.jsx'
import ProdiEkonomiPembangunan from './pages/ProdiEkonomiPembangunan.jsx'
import ProdiAgribisnis from './pages/ProdiAgribisnis.jsx'
import ProdiAgroekoteknologi from './pages/ProdiAgroekoteknologi.jsx'
import ProdiBiologi from './pages/ProdiBiologi.jsx'
import ProdiEkonomiSyariah from './pages/ProdiEkonomiSyariah.jsx'
import ProdiManajemenBisnisSyariah from './pages/ProdiManajemenBisnisSyariah.jsx'
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
  '/fakultas/teknik': FakultasTeknik,
  '/fakultas/hukum': FakultasHukum,
  '/fakultas/ekonomi-bisnis': FakultasEkonomiBisnis,
  '/fakultas/pertanian': FakultasPertanian,
  '/fakultas/mipa': FakultasMIPA,
  '/fakultas/agama-islam': FakultasAgamaIslam,
  '/prodi/pendidikan-dokter': ProdiPendidikanDokter,
  '/prodi/profesi-dokter': ProdiProfesiDokter,
  '/prodi/teknik-sipil': ProdiTeknikSipil,
  '/prodi/ilmu-komputer': ProdiIlmuKomputer,
  '/prodi/ilmu-hukum': ProdiIlmuHukum,
  '/prodi/akuntansi': ProdiAkuntansi,
  '/prodi/ekonomi-pembangunan': ProdiEkonomiPembangunan,
  '/prodi/agribisnis': ProdiAgribisnis,
  '/prodi/agroekoteknologi': ProdiAgroekoteknologi,
  '/prodi/biologi': ProdiBiologi,
  '/prodi/ekonomi-syariah': ProdiEkonomiSyariah,
  '/prodi/manajemen-bisnis-syariah': ProdiManajemenBisnisSyariah,
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
