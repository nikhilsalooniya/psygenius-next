import Link from 'next/link'

export const metadata = {
  title: 'Datenschutzerklärung – PsyGenius',
}

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <Link href="/" className="text-sm text-violet-600 hover:underline mb-8 inline-block">
        ← Zurück zur Startseite
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Datenschutz auf einen Blick</h2>
          <h3 className="font-semibold text-gray-900 mb-1">Allgemeine Hinweise</h3>
          <p className="leading-relaxed">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
            passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Verantwortliche Stelle</h2>
          <p className="leading-relaxed">
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
          </p>
          <p className="leading-relaxed mt-2">
            <strong>PsyGenius</strong><br />
            Larissa Jellesen<br />
            Leopoldstr. 2-8<br />
            32051 Herford<br />
            E-Mail:{' '}
            <a href="mailto:support@mentoragenius.de" className="text-violet-600 hover:underline">
              support@mentoragenius.de
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Datenerfassung auf dieser Website</h2>
          <h3 className="font-semibold text-gray-900 mb-1">Kontaktformular</h3>
          <p className="leading-relaxed">
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
            inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall
            von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Nutzerkonto und App-Daten</h2>
          <p className="leading-relaxed">
            Bei der Registrierung in der PsyGenius-App werden folgende Daten erhoben: Name, E-Mail-Adresse sowie
            Lern- und Prüfungsfortschritte. Diese Daten werden ausschließlich zur Bereitstellung des Dienstes
            verwendet und nicht an Dritte weitergegeben.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Ihre Rechte</h2>
          <p className="leading-relaxed">
            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen
            Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf
            Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene
            Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Zahlungsabwicklung</h2>
          <p className="leading-relaxed">
            Für die Zahlungsabwicklung setzen wir externe Dienstleister (Razorpay, PayPal) ein. Die Übermittlung
            Ihrer Daten an diese Dienstleister erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Die
            Datenschutzerklärungen der jeweiligen Anbieter gelten ergänzend.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Kontakt</h2>
          <p className="leading-relaxed">
            Bei Fragen zum Datenschutz wenden Sie sich bitte an:{' '}
            <a href="mailto:support@mentoragenius.de" className="text-violet-600 hover:underline">
              support@mentoragenius.de
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}
