import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const tiers = [
  {
    name: "Einführung in die Psychologie",
    id: "p1",
    href: "#",
    price: "€9.99",
    originalPrice: "€14.99",
    features: [
      "Einmal kaufen, dauerhaft nutzen",
      "Prüfungsnahe Multiple-Choice-Fragen (5 Antwortmöglichkeiten)",
      "Tageschallenge mit 10 adaptiven Fragen",
      "Quizmodus, Tageschallenge & Probeklausuren",
      "KI erkennt deine Lernlücken",
      "Prüfungsnahe Fragen & realistisches Zeitlimit",
      "KI-Erklärungen zu allen Fragen & Begriffen",
    ],
    cta: "Modul kaufen",
  },
  {
    name: "Statistik",
    id: "p2",
    href: "#",
    price: "€9.99",
    originalPrice: "€14.99",
    features: [
      "Einmal kaufen, dauerhaft nutzen",
      "Prüfungsnahe Multiple-Choice-Fragen (5 Antwortmöglichkeiten)",
      "Tageschallenge mit 10 adaptiven Fragen",
      "Quizmodus, Tageschallenge & Probeklausuren",
      "KI erkennt deine Lernlücken",
      "Prüfungsnahe Fragen & realistisches Zeitlimit",
      "KI-Erklärungen zu allen Fragen & Begriffen",
    ],
    cta: "Modul kaufen",
  },
  {
    name: "Entwicklungspsychologie",
    id: "p3",
    href: "#",
    price: "€9.99",
    originalPrice: "€14.99",
    features: [
      "Einmal kaufen, dauerhaft nutzen",
      "Prüfungsnahe Multiple-Choice-Fragen (5 Antwortmöglichkeiten)",
      "Tageschallenge mit 10 adaptiven Fragen",
      "Quizmodus, Tageschallenge & Probeklausuren",
      "KI erkennt deine Lernlücken",
      "Prüfungsnahe Fragen & realistisches Zeitlimit",
      "KI-Erklärungen zu allen Fragen & Begriffen",
    ],
    cta: "Modul kaufen",
  },
  {
    name: "Sozialpsychologie",
    id: "p4",
    href: "#",
    price: "€9.99",
    originalPrice: "€14.99",
    features: [
      "Einmal kaufen, dauerhaft nutzen",
      "Prüfungsnahe Multiple-Choice-Fragen (5 Antwortmöglichkeiten)",
      "Tageschallenge mit 10 adaptiven Fragen",
      "Quizmodus, Tageschallenge & Probeklausuren",
      "KI erkennt deine Lernlücken",
      "Prüfungsnahe Fragen & realistisches Zeitlimit",
      "KI-Erklärungen zu allen Fragen & Begriffen",
    ],
    cta: "Modul kaufen",
  },
];

export function Pricing() {
  return (
    <section
      id="pricing-section"
      className="relative overflow-hidden bg-linear-to-br from-purple-50 via-white to-indigo-50 py-24 sm:py-32"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-purple-300/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-300/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-0 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-violet-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="relative text-center px-10 sm:px-28 md:px-0">
          {/* Mentori Thumbs-Up — left */}
          <div className="pointer-events-none absolute top-[95%] md:top-2/3 -translate-y-1/2 -left-16 md:left-4 lg:left-9 xl:left-12">
            <Image
              src="/Mentori-Thumbs-Up.png"
              alt="Mentori"
              width={300}
              height={300}
              className="w-40 sm:w-20 md:w-44 lg:w-52 xl:w-64 h-auto drop-shadow-xl"
            />
          </div>

          {/* Mentori Peace — right */}
          <div className="pointer-events-none absolute top-[95%] md:top-2/3 -translate-y-1/2 -right-14 md:right-4 lg:right-10 xl:right-16">
            <Image
              src="/Mentori-Peace.png"
              alt="Mentori"
              width={300}
              height={300}
              className="w-40 sm:w-20 md:w-44 lg:w-52 xl:w-64 h-auto drop-shadow-xl"
            />
          </div>

          <span className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-sm font-semibold text-purple-700 ring-1 ring-purple-200">
            Preise
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Preise für Module
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed max-w-sm sm:max-w-xs md:max-w-md mx-auto">
            Kein Abo, keine versteckten Kosten. Du zahlst nur für die Module, die du wirklich
            brauchst – einmal kaufen, dauerhaft nutzen.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mx-auto mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="relative flex flex-col rounded-2xl border border-white/70 bg-white/50 backdrop-blur-xl shadow-xl shadow-purple-100/60 p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-200/60"
            >
              {/* Discount badge */}
              <span className="self-start mb-4 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                33% RABATT
              </span>

              {/* Module name */}
              <h3 className="text-sm font-semibold text-gray-900 leading-snug min-h-10">
                {tier.name}
              </h3>

              {/* Price block */}
              <div className="mt-5 flex items-baseline gap-x-2">
                <span className="text-sm font-medium line-through text-gray-400">
                  {tier.originalPrice}
                </span>
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {tier.price}
                </span>
              </div>

              {/* Divider */}
              <div className="mt-5 h-px bg-linear-to-r from-transparent via-purple-200 to-transparent" />

              {/* Features */}
              <ul role="list" className="mt-5 flex-1 space-y-2.5">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-x-2.5 text-xs text-gray-600 leading-relaxed"
                  >
                    <CheckIcon
                      className="mt-0.5 h-4 w-4 flex-none text-purple-500"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={tier.href}
                className="mt-7 block w-full rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-purple-300/40 transition-all duration-200 hover:from-purple-500 hover:to-indigo-500 hover:shadow-purple-400/50"
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
