import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { PrimaryFeatures } from "@/components/PrimaryFeatures";
import { Reviews } from "@/components/Reviews";
import { SecondaryFeatures } from "@/components/SecondaryFeatures";
import Contact from "@/components/Contact";
import { VideoSection } from "@/components/VideoSection";

export default function Home() {
  return (
    <>
      <Hero />
      <VideoSection />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <div className="bg-[url('/Mentora-Graffiti.png')] bg-center bg-cover bg-no-repeat h-[35vh] sm:h-[45vh] lg:h-[60vh] w-full"></div>
      <Reviews />
      <CallToAction />
      <Pricing />
      <Contact />
      <Faqs />
    </>
  );
}
