import { AppStoreLink } from "@/components/AppStoreLink";
import { CircleBackground } from "@/components/CircleBackground";
import { Container } from "@/components/Container";

export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-gray-900 py-20 sm:py-48 bg-[url('/ai-bg-image.png')] bg-center bg-cover"
    >
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md text-center sm:text-center lg:max-w-2xl">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl lg:whitespace-nowrap">
            PsyGenius macht den Anfang
          </h2>
          <p className="mt-4 text-lg font-semibold text-white">
            weitere MentoraGenius-Apps folgen
          </p>
          <p className="mt-4 text-lg text-gray-300">
            Starte heute mit smarterem Lernen – mit klausurnahen Quizzen,
            verständlichen Erklärungen und Mentori an deiner Seite.
          </p>
          <div className="mt-8 flex justify-center">
            <AppStoreLink color="white" label="Jetzt ausprobieren" />
          </div>
        </div>
      </Container>
    </section>
  );
}
