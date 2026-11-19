import Hero from '../components/home/Hero.jsx'
import AudienceBar from '../components/home/AudienceBar.jsx'
import StatsSection from '../components/home/StatsSection.jsx'
import FocusSection from '../components/home/FocusSection.jsx'
import AcademicsSection from '../components/home/AcademicsSection.jsx'
import StoriesSection from '../components/home/StoriesSection.jsx'
import AgendaSection from '../components/home/AgendaSection.jsx'
import PartnersSection from '../components/home/PartnersSection.jsx'

// Beranda — halaman utama UNIZAR
export default function Beranda() {
  return (
    <div className="page page-home animate-fade">
      <Hero />
      <AudienceBar />
      <StatsSection />
      <FocusSection />
      <AcademicsSection />
      <StoriesSection />
      <AgendaSection />
      <PartnersSection />
    </div>
  )
}
