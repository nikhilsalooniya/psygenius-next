import Link from 'next/link'

export const metadata = {
  title: 'AGB – PsyGenius',
}

export default function AgbPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <Link href="/" className="text-sm text-violet-600 hover:underline mb-8 inline-block">
        ← Zurück zur Startseite
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">§ 1 Geltungsbereich</h2>
          <p className="leading-relaxed">
            Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen PsyGenius (Larissa Jellesen,
            Leopoldstr. 2-8, 32051 Herford) und dem Nutzer über die Nutzung der PsyGenius-App und der zugehörigen
            digitalen Lernmaterialien.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">§ 2 Vertragsschluss</h2>
          <p className="leading-relaxed">
            Der Vertrag kommt zustande, wenn der Nutzer sich in der App registriert und ein Modul kostenpflichtig
            erwirbt. Mit Abschluss der Zahlung erhält der Nutzer Zugang zum gebuchten digitalen Inhalt.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">§ 3 Digitale Inhalte und Zugang</h2>
          <p className="leading-relaxed">
            PsyGenius stellt dem Nutzer digitale Lerninhalte (Fragen, KI-gestützte Funktionen, Übungen) zur
            Prüfungsvorbereitung bereit. Der Zugang ist personengebunden und nicht übertragbar.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">§ 4 Widerrufsrecht und Ausschluss</h2>
          <p className="leading-relaxed">
            Bei Käufen digitaler Inhalte gilt grundsätzlich ein 14-tägiges Widerrufsrecht. Dieses erlischt gemäß
            § 356 Abs. 5 BGB, sobald der Nutzer ausdrücklich zustimmt, dass mit der Vertragserfüllung sofort
            begonnen wird und er damit auf sein Widerrufsrecht verzichtet. Diese Zustimmung wird beim Kauf
            explizit eingeholt. <strong>Nach erteilter Zustimmung sind Rückerstattungen ausgeschlossen.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">§ 5 Preise und Zahlung</h2>
          <p className="leading-relaxed">
            Alle Preise sind Endpreise inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt über die
            angebotenen Zahlungsdienstleister (Razorpay, PayPal). Der Kaufbetrag wird mit Auftragserteilung fällig.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">§ 6 Nutzungsrechte</h2>
          <p className="leading-relaxed">
            Der Nutzer erhält ein einfaches, nicht übertragbares Recht zur privaten Nutzung der erworbenen
            Inhalte. Eine Weitergabe, Vervielfältigung oder kommerzielle Nutzung ist nicht gestattet.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">§ 7 Haftung</h2>
          <p className="leading-relaxed">
            PsyGenius übernimmt keine Gewähr für Vollständigkeit, Richtigkeit oder Prüfungsrelevanz der
            bereitgestellten Inhalte. Die Nutzung erfolgt auf eigene Verantwortung des Nutzers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">§ 8 Anwendbares Recht</h2>
          <p className="leading-relaxed">
            Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für Kaufleute ist Herford.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">§ 9 Kontakt</h2>
          <p className="leading-relaxed">
            Bei Fragen zu diesen AGB wenden Sie sich bitte an:{' '}
            <a href="mailto:support@mentoragenius.de" className="text-violet-600 hover:underline">
              support@mentoragenius.de
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}
