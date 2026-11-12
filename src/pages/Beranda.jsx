import Hero from '../components/home/Hero.jsx'
import AudienceBar from '../components/home/AudienceBar.jsx'
import StatsSection from '../components/home/StatsSection.jsx'
import FocusSection from '../components/home/FocusSection.jsx'
import FacultyChips from '../components/home/FacultyChips.jsx'
import StoriesSection from '../components/home/StoriesSection.jsx'
import AgendaSection from '../components/home/AgendaSection.jsx'
import PartnersSection from '../components/home/PartnersSection.jsx'

// Beranda — halaman utama UNIZAR
export default function Beranda() {
  return (
    <div className="page animate-fade">
      <Hero />
      <AudienceBar />
      <StatsSection />
      <FocusSection />
      <FacultyChips />
      <StoriesSection />
      <AgendaSection />
      <PartnersSection />
    </div>
  )
}
