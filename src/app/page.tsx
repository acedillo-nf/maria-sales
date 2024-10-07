'use client'
import NavBar from '@/components/navbar'
import Footer from '@/components/Footer'
import NuestrosServicios from '@/components/NuestrosServicios'
import { AIFeatures } from '@/components/feautures'
import Values from '@/components/valor'
import PricingCards from '@/components/pricing-cards'
import Hero from '@/components/hero'
import Integrations from '@/components/integraciones'


export default function Home() {
 
  return (
    <main>
      <NavBar />
      <section>
        <Hero/>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 mt-28">
        <AIFeatures/>
      </section>
      <section id="pricing-section">
        <PricingCards/>
      </section>
     <Values/>
     <section id="integration-section">
      <Integrations/>
     </section>
       <NuestrosServicios/>
    <Footer/>
    </main>
  );
}
