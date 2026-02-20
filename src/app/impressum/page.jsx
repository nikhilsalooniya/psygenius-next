import Link from 'next/link'

export const metadata = {
  title: 'Impressum – PsyGenius',
}

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <Link href="/" className="text-sm text-violet-600 hover:underline mb-8 inline-block">
        ← Zurück zur Startseite
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Impressum</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Angaben gemäß § 5 TMG</h2>
          <p className="leading-relaxed">
            <strong>PsyGenius</strong><br />
            Larissa Jellesen<br />
            Leopoldstr. 2-8<br />
            32051 Herford
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Kontakt</h2>
          <p>
            E-Mail:{' '}
            <a href="mailto:support@mentoragenius.de" className="text-violet-600 hover:underline">
              support@mentoragenius.de
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Haftungsausschluss</h2>
          <p className="leading-relaxed">
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Streitschlichtung</h2>
          <p className="leading-relaxed">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
              https://ec.europa.eu/consumers/odr/
            </a>.
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>
      </div>
    </main>
  )
}
