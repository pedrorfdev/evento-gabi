import { DressCode } from "./components/dress-code";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Map } from "./components/map";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Sprint 3 — Details (personagem + cards) */}
        <div id="detalhes" />

        <DressCode />
        <Map />

        {/* Sprint 3 — Gifts */}
        <div id="presentes" style={{ height: '40px' }} />

        {/* Sprint 3 — Gallery */}
        <div id="galeria" style={{ height: '40px' }} />

        {/* Sprint 3 — RSVP */}
        <div id="confirmar" style={{ height: '40px' }} />
      </main>
      <Footer />
    </>
  )
}