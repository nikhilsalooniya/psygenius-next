import Link from 'next/link'

export const metadata = {
  title: 'Nutzungsbedingungen – PsyGenius',
}

export default function AgbPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <Link href="/" className="text-sm text-violet-600 hover:underline mb-8 inline-block">
        ← Zurück zur Startseite
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-1">Nutzungsbedingungen</h1>


      <div className="space-y-8 text-gray-700">

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">1. Zweck der App</h2>
          <p className="leading-relaxed">
            Die App „PsyGenius" dient der Vorbereitung auf Prüfungen im Bereich Psychologie.<br />
            Die Nutzung der App erfolgt auf eigene Verantwortung der Nutzer:innen.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">2. Nutzungslizenz</h2>
          <p className="leading-relaxed">
            Die App und alle darin enthaltenen Inhalte (Texte, Fragen, Erklärungen, Grafiken, KI-generierte
            Inhalte) sind urheberrechtlich geschützt. Nutzer:innen erhalten eine einfache, nicht übertragbare
            Lizenz zur privaten Nutzung. Eine Weitergabe, Vervielfältigung, Bearbeitung oder kommerzielle
            Nutzung der Inhalte ist nicht gestattet.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">3. Pflichten der Nutzer:innen</h2>
          <p className="leading-relaxed mb-3">Nutzer:innen verpflichten sich insbesondere dazu:</p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed text-sm">
            <li>die App nur bestimmungsgemäß zu nutzen,</li>
            <li>keine Inhalte der App ohne Erlaubnis zu kopieren, zu verbreiten oder öffentlich zugänglich zu machen,</li>
            <li>die App nicht technisch zu manipulieren oder sich unberechtigten Zugriff zu verschaffen,</li>
            <li>keine rechtswidrigen Inhalte über die App zu verbreiten.</li>
          </ul>
          <p className="leading-relaxed mt-3">
            Der Zugang zur App ist personenbezogen. Nutzer:innen sind verpflichtet, ihre Zugangsdaten
            vertraulich zu behandeln und nicht an Dritte weiterzugeben oder mehreren Personen die Nutzung
            eines Accounts zu ermöglichen. Jede Form der gemeinsamen Account-Nutzung („Account-Sharing")
            ist untersagt.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">4. Haftungsausschluss</h2>
          <p className="leading-relaxed">
            Wir übernehmen keine Garantie für Prüfungserfolge, jederzeitige Verfügbarkeit oder
            Fehlerfreiheit der App. Eine Haftung für Schäden, die aus der Nutzung oder Nichtverfügbarkeit
            der App entstehen, ist ausgeschlossen.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">5. Support und Kommunikation</h2>
          <p className="leading-relaxed">
            Technische Supportanfragen müssen über das Ticketsystem innerhalb der App gestellt werden
            (Menüpunkt „Technischer Support"). Nicht-technische Anfragen können über das Kontaktformular
            in der App oder per E-Mail an{' '}
            <a href="mailto:support@mentoragenius.de" className="text-violet-600 hover:underline">
              support@mentoragenius.de
            </a>{' '}
            gesendet werden.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">6. Datensicherung und Eigenverantwortung</h2>
          <p className="leading-relaxed">
            Nutzer:innen sind selbst dafür verantwortlich, ihre Lernfortschritte regelmäßig zu sichern
            (sofern Export- oder Sicherungsfunktionen verfügbar sind).
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">7. Jugendschutz</h2>
          <p className="leading-relaxed">
            Die App richtet sich an volljährige Studierende oder Personen mit Einwilligung ihrer
            Erziehungsberechtigten.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">8. Sanktionen bei Verstößen</h2>
          <p className="leading-relaxed mb-3">
            Bei Verstößen gegen diese Nutzungsbedingungen behalten wir uns das Recht vor, angemessene
            Maßnahmen zu ergreifen. Diese können insbesondere umfassen:
          </p>
          <ul className="list-disc list-inside space-y-1 leading-relaxed text-sm mb-3">
            <li>eine Verwarnung per E-Mail,</li>
            <li>die vorübergehende Sperrung des Nutzerkontos,</li>
            <li>die dauerhafte Sperrung bei wiederholten oder schwerwiegenden Verstößen,</li>
            <li>die außerordentliche Kündigung bestehender Nutzungsverträge,</li>
            <li>sowie die Geltendmachung rechtlicher Ansprüche.</li>
          </ul>
          <p className="leading-relaxed">
            Eine Rückerstattung bereits gezahlter Entgelte erfolgt in diesen Fällen grundsätzlich nicht,
            sofern der Verstoß von den Nutzer:innen zu vertreten ist.
          </p>
          <p className="leading-relaxed mt-2">
            Wir behalten uns vor, Nutzerkonten bei begründetem Verdacht auf missbräuchliche Nutzung
            vorübergehend zu überprüfen und bis zur Klärung einzuschränken.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">9. Anwendbares Recht</h2>
          <p className="leading-relaxed">
            Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für alle Streitigkeiten ist,
            soweit gesetzlich zulässig, der Sitz der Betreiberin.
          </p>
          <p className="leading-relaxed mt-3">
            <strong>Betreiberin:</strong><br />
            Larissa Jellesen<br />
            Leopoldstr. 2-8, 32051 Herford<br />
            E-Mail:{' '}
            <a href="mailto:support@mentoragenius.de" className="text-violet-600 hover:underline">
              support@mentoragenius.de
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">10. Änderungen der Nutzungsbedingungen</h2>
          <p className="leading-relaxed">
            Wir behalten uns vor, diese Nutzungsbedingungen jederzeit zu ändern. Änderungen werden in der
            App bekanntgegeben. Mit fortgesetzter Nutzung nach einer Änderung gelten die neuen Bedingungen
            als akzeptiert.
          </p>
        </section>

      </div>
    </main>
  )
}
