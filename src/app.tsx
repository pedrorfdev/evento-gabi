import { Details } from "./components/details";
import { DressCode } from "./components/dress-code";
import { Footer } from "./components/footer";
import { Gallery } from "./components/gallery";
import { Gifts } from "./components/gifts";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Map } from "./components/map";
import { Rsvp } from "./components/rsvp";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Details />
        <DressCode />
        <Map />
        <Gifts />
        <Gallery />
        <Rsvp />
      </main>
      <Footer />
    </>
  )
}
