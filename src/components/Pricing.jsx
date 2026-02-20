import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Einführung in die Psychologie',
    id: 'p1',
    href: '#',
    price: { monthly: '€9.99', annually: '€9.99' },
    originalPrice: '€14.99',
    features: [
      'Einmal kaufen, dauerhaft nutzen',
      'Prüfungsnahe Multiple-Choice-Fragen (5 Antwortmöglichkeiten)',
      'Tageschallenge mit 10 adaptiven Fragen',
      'Quizmodus, Tageschallenge & Probeklausuren',
      'KI erkennt deine Lernlücken',
      'Prüfungsnahe Fragen & realistisches Zeitlimit',
      'KI-Erklärungen zu allen Fragen & Begriffen',
    ],
    cta: 'Modul kaufen',
  },
  {
    name: 'Statistik',
    id: 'p2',
    href: '#',
    price: { monthly: '€9.99', annually: '€9.99' },
    originalPrice: '€14.99',
    features: [
      'Einmal kaufen, dauerhaft nutzen',
      'Prüfungsnahe Multiple-Choice-Fragen (5 Antwortmöglichkeiten)',
      'Tageschallenge mit 10 adaptiven Fragen',
      'Quizmodus, Tageschallenge & Probeklausuren',
      'KI erkennt deine Lernlücken',
      'Prüfungsnahe Fragen & realistisches Zeitlimit',
      'KI-Erklärungen zu allen Fragen & Begriffen',
    ],
    cta: 'Modul kaufen',
  },
  {
    name: 'Entwicklungspsychologie',
    id: 'p3',
    href: '#',
    price: { monthly: '€9.99', annually: '€9.99' },
    originalPrice: '€14.99',
    features: [
      'Einmal kaufen, dauerhaft nutzen',
      'Prüfungsnahe Multiple-Choice-Fragen (5 Antwortmöglichkeiten)',
      'Tageschallenge mit 10 adaptiven Fragen',
      'Quizmodus, Tageschallenge & Probeklausuren',
      'KI erkennt deine Lernlücken',
      'Prüfungsnahe Fragen & realistisches Zeitlimit',
      'KI-Erklärungen zu allen Fragen & Begriffen',
    ],
    cta: 'Modul kaufen',
  },
  {
    name: 'Sozialpsychologie',
    id: 'p4',
    href: '#',
    price: { monthly: '€9.99', annually: '€9.99' },
    originalPrice: '€14.99',
    features: [
      'Einmal kaufen, dauerhaft nutzen',
      'Prüfungsnahe Multiple-Choice-Fragen (5 Antwortmöglichkeiten)',
      'Tageschallenge mit 10 adaptiven Fragen',
      'Quizmodus, Tageschallenge & Probeklausuren',
      'KI erkennt deine Lernlücken',
      'Prüfungsnahe Fragen & realistisches Zeitlimit',
      'KI-Erklärungen zu allen Fragen & Begriffen',
    ],
    cta: 'Modul kaufen',
  },
]

export function Pricing() {
  return (
    <section
      id="pricing-section"
      className="relative overflow-hidden bg-slate-50 py-24 sm:py-32"
    >
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-125 w-125 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-100 w-100 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-0 h-75 w-75 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <img
        src="/Mentori-Thumbs-Up.png"
        alt=""
        className="pointer-events-none absolute z-20 top-16 left-6 md:left-10 lg:left-[12%] h-36 md:h-48 lg:h-60 hidden md:block drop-shadow-2xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-purple-500/20 px-4 py-1.5 text-sm font-semibold text-purple-300 ring-1 ring-purple-400/40">
            Preise
          </span>
          <h2 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Preise für Module
          </h2>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-purple-200/70">
          Kein Abo, keine versteckten Kosten. Du zahlst nur für die Module, die du wirklich brauchst – einmal kaufen, dauerhaft nutzen.
        </p>

        {/* Cards */}
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="relative rounded-3xl p-px"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)',
              }}
            >
              <div className="relative h-full rounded-3xl bg-white/5 backdrop-blur-2xl p-8 xl:p-10 flex flex-col">
                {/* Discount badge */}
                <span className="absolute top-6 right-6 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-purple-900/40">
                  33% RABATT
                </span>

                {/* Module name */}
                <h3 className="text-lg font-semibold text-white pr-24">{tier.name}</h3>

                {/* Price block */}
                <div className="mt-6 flex items-baseline gap-x-3">
                  <span className="text-xl font-medium line-through text-purple-300/50">
                    {tier.originalPrice}
                  </span>
                  <span className="text-5xl font-bold tracking-tight text-white">
                    {tier.price.monthly}
                  </span>
                </div>

                {/* Divider */}
                <div className="mt-6 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

                {/* Features */}
                <ul role="list" className="mt-6 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-x-3 text-sm text-purple-100/80">
                      <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-purple-400" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={tier.href}
                  className="mt-8 block w-full rounded-xl bg-linear-to-r from-primary to-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-purple-900/50 transition-all duration-200 hover:from-[#8570d8] hover:to-indigo-500 hover:shadow-purple-700/50"
                >
                  {tier.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
