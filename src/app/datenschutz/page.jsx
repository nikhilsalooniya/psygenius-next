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

      <h1 className="text-3xl font-bold text-gray-900 mb-1">Datenschutzerklärung</h1>

      <div className="space-y-8 text-gray-700">

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">1. Allgemeine Hinweise</h2>
          <p className="leading-relaxed">
            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Ihre Daten werden vertraulich
            und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung
            behandelt.
          </p>
          <p className="leading-relaxed mt-3">
            <strong>Verantwortliche Stelle im Sinne der Datenschutzgesetze ist:</strong><br />
            PsyGenius<br />
            Larissa Jellesen<br />
            Leopoldstr. 2-8, 32051 Herford<br />
            E-Mail:{' '}
            <a href="mailto:support@mentoragenius.de" className="text-violet-600 hover:underline">
              support@mentoragenius.de
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
          <p className="leading-relaxed mb-3">
            Unsere App verarbeitet ausschließlich die für den Betrieb notwendigen personenbezogenen Daten, darunter:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed mb-4">
            <li>Anmeldedaten (z. B. E-Mail-Adresse, Passwort)</li>
            <li>Informationen zu erworbenen Modulen</li>
            <li>Lernfortschritte und Nutzung der App (z. B. Quiz- oder Probeklausurergebnisse)</li>
            <li>Gewählte Lernzeiten (optional)</li>
            <li>Technische Daten (z. B. Gerätetyp, Betriebssystem)</li>
          </ul>
          <p className="leading-relaxed mb-3">
            Zusätzlich erfassen wir anonymisierte Informationen zur statistischen Auswertung, darunter:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed">
            <li>Gewählte Lernmodule</li>
            <li>Universität / Hochschule</li>
            <li>Studienrichtung</li>
            <li>Zeitpunkt der Registrierung (z. B. „Wintersemester 2026")</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">3. Zweck der Verarbeitung</h2>
          <p className="leading-relaxed mb-3">
            Die Verarbeitung Ihrer personenbezogenen Daten erfolgt zu folgenden Zwecken:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed">
            <li>Bereitstellung und Personalisierung der App</li>
            <li>Darstellung von Lernfortschritten und Statistiken</li>
            <li>Optionaler Versand von Lern-Erinnerungen (Push-Benachrichtigungen)</li>
            <li>Abwicklung von Zahlungen über PayPal</li>
            <li>Generierung von KI-basierten Lerninhalten mittels OpenAI-Schnittstelle</li>
            <li>Anonymisierte Auswertung zu internen statistischen Zwecken und zur Verbesserung unseres Angebots</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">4. Rechtsgrundlage der Verarbeitung</h2>
          <p className="leading-relaxed mb-3">
            Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf folgenden Rechtsgrundlagen:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
            <li><strong>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung):</strong> zur Bereitstellung der App und ihrer Funktionen</li>
            <li><strong>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung):</strong> bei Nutzung optionaler Funktionen (z. B. Push-Benachrichtigungen)</li>
            <li><strong>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse):</strong> zur anonymisierten statistischen Auswertung und Verbesserung der App</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">5. Speicherung und Löschung von Daten</h2>
          <p className="leading-relaxed">
            Ihre personenbezogenen Daten werden für die Dauer der aktiven Nutzung der App gespeichert.
            Wird die App deinstalliert oder erfolgt innerhalb von 12 Monaten keine Nutzung mehr, werden
            Ihre personenbezogenen Daten innerhalb von 30 Tagen gelöscht.
          </p>
          <p className="leading-relaxed mt-2">
            Anonymisierte Daten, die keinen Rückschluss auf Ihre Person zulassen, werden dauerhaft
            gespeichert und für statistische Auswertungen genutzt.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">6. Datenverarbeitung und Hosting</h2>
          <p className="leading-relaxed">
            Die App wird auf Servern der <strong>Amazon Web Services (AWS)</strong> in der Region{' '}
            <strong>eu-north-1 (Stockholm, Schweden)</strong> betrieben. Backups werden ausschließlich
            innerhalb derselben Serverregion gespeichert. Damit erfolgt die Datenspeicherung{' '}
            <strong>innerhalb der Europäischen Union</strong>.
          </p>
          <p className="leading-relaxed mt-2">
            Ein Zugriff auf personenbezogene Daten kann im Rahmen von Wartung und technischer Betreuung
            durch beauftragte Entwickler mit Sitz in <strong>Indien</strong> erfolgen. Die Übermittlung
            erfolgt ausschließlich zu diesem Zweck und auf Grundlage der Standardvertragsklauseln der
            EU-Kommission gemäß Art. 46 DSGVO, um ein angemessenes Datenschutzniveau zu gewährleisten.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">7. KI-Verarbeitung (OpenAI)</h2>
          <p className="leading-relaxed">
            Zur Generierung und Erklärung von Lerninhalten verwendet die App Schnittstellen zu{' '}
            <strong>OpenAI (USA)</strong>. Dabei werden ausschließlich anonymisierte oder pseudonymisierte
            Nutzerdaten übermittelt, die keinen direkten Rückschluss auf einzelne Personen zulassen.
            Die Übermittlung erfolgt auf Grundlage der{' '}
            <strong>Standardvertragsklauseln der EU-Kommission gemäß Art. 46 DSGVO</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">8. Zahlungsabwicklung über PayPal</h2>
          <p className="leading-relaxed">
            Zur Abwicklung von Zahlungen nutzen wir den Zahlungsdienstleister{' '}
            <strong>PayPal (Europe) S.à r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg</strong>.
            Im Rahmen der Zahlungsabwicklung werden die hierfür erforderlichen Zahlungsinformationen an
            PayPal übermittelt. Weitere Informationen zur Datenverarbeitung durch PayPal finden Sie in der{' '}
            <a href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
              Datenschutzerklärung von PayPal
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">9. Kontaktformular und Support</h2>
          <p className="leading-relaxed">
            Bei Kontaktaufnahme über das Formular in der App oder per E-Mail an{' '}
            <a href="mailto:support@mentoragenius.de" className="text-violet-600 hover:underline">
              support@mentoragenius.de
            </a>{' '}
            werden die angegebenen Daten zur Bearbeitung der Anfrage gespeichert. Technische Supportanfragen
            werden ausschließlich über das interne Ticketsystem in der App bearbeitet. Alle Daten werden nach
            Abschluss der Bearbeitung gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">10. Keine Nutzung externer Analysetools</h2>
          <p className="leading-relaxed">
            Es werden derzeit <strong>keine externen Analysetools</strong> (z. B. Google Firebase Analytics,
            Crashlytics oder Play Console Analytics) eingesetzt. Sämtliche erhobenen Daten werden
            ausschließlich intern verarbeitet.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">11. Ihre Rechte</h2>
          <p className="leading-relaxed mb-3">Sie haben jederzeit folgende Rechte:</p>
          <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed mb-3">
            <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger oder unvollständiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer gespeicherten Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          </ul>
          <p className="leading-relaxed">
            Zur Wahrnehmung Ihrer Rechte wenden Sie sich bitte an:{' '}
            <a href="mailto:support@mentoragenius.de" className="text-violet-600 hover:underline font-semibold">
              support@mentoragenius.de
            </a>
          </p>
          <p className="leading-relaxed mt-2">
            Sie haben zudem das Recht, sich bei einer Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht
            sind, dass die Verarbeitung Ihrer personenbezogenen Daten nicht rechtmäßig erfolgt.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">12. Änderungen dieser Datenschutzerklärung</h2>
          <p className="leading-relaxed">
            Wir behalten uns vor, diese Datenschutzerklärung jederzeit zu ändern, um sie an neue rechtliche
            Anforderungen oder Änderungen der App anzupassen. Die jeweils aktuelle Version ist in der App
            abrufbar.
          </p>
        </section>

      </div>
    </main>
  )
}
