import Link from 'next/link'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import { APK_DOWNLOAD_URL, PLAY_STORE_URL } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container>
        {/* Top row: brand + nav + app download */}
        <div className="flex flex-col items-start justify-between gap-y-10 pt-12 pb-8 sm:pt-16 lg:flex-row lg:items-center lg:py-14">
          <div>
            <Logo className="h-10 w-auto" />
            <p className="mt-2 text-sm text-gray-500 max-w-xs">
              KI-gestützte Prüfungsvorbereitung für dein Psychologie-Studium.
            </p>
            <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <NavLinks />
            </nav>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={PLAY_STORE_URL}
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Google Play
            </a>
            {APK_DOWNLOAD_URL !== '#' && (
              <a
                href={APK_DOWNLOAD_URL}
                className="inline-flex items-center justify-center rounded-lg border-2 border-gray-900 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                APK herunterladen
              </a>
            )}
          </div>
        </div>

        {/* Legal links + copyright */}
        <div className="flex flex-col items-center gap-4 border-t border-gray-200 py-8 sm:flex-row sm:justify-between">
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <Link href="/impressum" className="hover:text-gray-900 transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-gray-900 transition-colors">Datenschutzerklärung</Link>
            <Link href="/agb" className="hover:text-gray-900 transition-colors">Nutzungsbedingungen</Link>
            <a href="mailto:support@mentoragenius.de" className="hover:text-gray-900 transition-colors">support@mentoragenius.de</a>
          </nav>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} MentoraGenius · Alle Rechte vorbehalten
          </p>
        </div>
      </Container>
    </footer>
  )
}
