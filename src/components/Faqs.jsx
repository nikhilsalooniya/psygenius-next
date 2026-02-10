import { Container } from '@/components/Container'

const faqs = [
  [
    {
      question: 'Muss ich ein Abo abschließen?',
      answer:
        'Nein. MentoraGenius ist kein Abo. Du zahlst einmalig für die App und kannst zusätzliche Module separat freischalten.',
    },
    {
      question: 'Was ist MentoraGenius?',
      answer:
        'MentoraGenius ist eine KI-gestützte Lernapp für Prüfungen in deinem Studium. Du kannst mit prüfungsnahen Quizfragen lernen, Probeklausuren schreiben und dir Inhalte von der KI erklären lassen. Das Maskottchen Mentori begleitet dich durch die App und erinnert dich täglich daran zu lernen.',
    },
    {
      question: 'Für wen ist MentoraGenius geeignet?',
      answer:
        'Für Studierende im Bachelor- und Masterstudium– besonders zur Klausurvorbereitung. Die Inhalte sind auf typische Uni-Prüfungen abgestimmt.',
    },
    {
      question: "Wie kann ich Feedback geben oder Wünsche äußern?",
      answer:
          'Ideen, Feedback oder Verbesserungsvorschläge kannst du jederzeit ebenfalls über das Feedback-Formular „Kontakt“ in der App einsenden.'
    },
  ],
  [
    {
      question: 'Kann ich mir auch ohne Quiz etwas erklären lassen?',
      answer:
        'Ja. Im KI-Fragen-Antwort-Modus kannst du jederzeit Fragen stellen und dir Begriffe, Theorien oder Zusammenhänge erklären lassen – auch ohne Quiz.',
    },
    {
      question: 'Kann ich gezielt bestimmte Themen oder Kursabschnitte lernen?',
      answer:
        'Ja. Im Quizmodus kannst du gezielt einzelne Themen, Kapitel oder Kursabschnitte auswählen. Die KI passt die Fragen zusätzlich an deine individuellen Schwächen an, damit du genau dort übst, wo du es brauchst.',
    },
    {
      question: 'Wie unterscheiden sich Quizmodus, Tageschallenge und Probeklausuren?',
      answer:
        'Der Quizmodus dient dem gezielten Lernen einzelner Themen. Die KI erkennt deine Schwächen, stellt dir passende Fragen und gibt dir nach jeder Frage direkt Feedback und Erklärungen. Du kannst bestimmte Themen oder Kursabschnitte auswählen.\n' +
          'Die Tageschallenge ist eine kurze tägliche Lerneinheit mit 10 KI-generierten Fragen. Sie hilft dir, regelmäßig zu lernen und zählt, wie viele Tage du in Folge aktiv warst.\n' +
          'In den Probeklausuren bearbeitest du komplette Fragenpakete unter realistischen Bedingungen mit Zeitlimit. Zum Schluss bekommst du eine realistische Klausurnote, wie in einer echten Prüfung.\n',
    },
  ],
  [
    {
      question: 'Kann ich meine Lernzeit planen?',
      answer:
        'Ja. Du kannst Lernzeiten festlegen, deinen Prüfungstermin eintragen und Erinnerungen von Mentori erhalten, um motiviert und strukturiert zu bleiben.',
    },
    {
      question: 'Wie passt sich die KI an meinen Lernstand an?',
      answer:
        'Die KI analysiert deine Antworten, erkennt wiederkehrende Fehler und Lernlücken und stellt dir gezielt neue Fragen zu diesen Themen. So lernst du nicht zufällig, sondern fokussiert und effizient.',
    },
    {
      question: 'Auf welchen Geräten kann ich PsyGenius nutzen?',
      answer:
        'Die App kann direkt über die Website installiert werden und ist nutzbar für IOS und Android',
    },
    {
      question: "Was mache ich bei technischen Problemen?",
      answer:
          'Bei technischen Problemen kannst du in der App ein Ticket über „IT-Support“ erstellen.'
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Häufig gestellte Fragen
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Wenn Sie noch weitere Fragen haben,{' '}
            <a
              href="mailto:info@example.com"
              className="text-gray-900 underline"
            >
              Kontaktieren Sie uns
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg/6 font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
