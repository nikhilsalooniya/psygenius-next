import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { Reviews } from '@/components/Reviews'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import Contact from "@/components/Contact";
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'

export default function Home() {
  return (
    <>
      <Hero />
      <section className="relative overflow-hidden min-h-screen py-20 sm:py-24 lg:py-28 flex items-center">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/Home-Screen.png"
          aria-hidden="true"
        >
          <source src="/mentora-video.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <Container>
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <Logo className="h-8 w-auto invert" />
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              MentoraGenius
            </h2>
            <p className="text-base text-gray-100 sm:text-lg">
              PsyGenius macht den Anfang – weitere Genius-Apps folgen
            </p>
          </div>
        </Container>
      </section>
      <PrimaryFeatures />
      <SecondaryFeatures />
        <div className="bg-[url('/Mentora-Graffiti.png')] bg-center bg-cover bg-no-repeat h-[35vh] sm:h-[45vh] lg:h-[60vh] w-full">
        </div>
      <Reviews />
        <CallToAction />
        <Pricing/>
        <Contact/>
        <Faqs/>
    </>
  )
}
