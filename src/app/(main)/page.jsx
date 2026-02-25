import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { PrimaryFeatures } from "@/components/PrimaryFeatures";
import { Reviews } from "@/components/Reviews";
import { SecondaryFeatures } from "@/components/SecondaryFeatures";
import Contact from "@/components/Contact";
import { VideoSection } from "@/components/VideoSection";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.psygenius.mentoragenius.de";

async function getActiveSubjects() {
  try {
    const res = await fetch(`${API_BASE}/api/public/subjects`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const subjects = await getActiveSubjects();

  return (
    <>
      <Hero />
      <VideoSection />
      <PrimaryFeatures />
      <SecondaryFeatures />
      <div className="bg-[url('/Mentora-Graffiti.png')] bg-center bg-cover bg-no-repeat h-[35vh] sm:h-[45vh] lg:h-[60vh] w-full"></div>
      <Reviews />
      <CallToAction />
      <Pricing subjects={subjects} />
      <Contact />
      <Faqs />
    </>
  );
}
