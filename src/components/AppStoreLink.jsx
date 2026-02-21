import Link from 'next/link'
import clsx from 'clsx'
import { APK_DOWNLOAD_URL, PLAY_STORE_URL } from '@/lib/constants'

export function AppStoreLink({ color = 'black' }) {
  const isLight = color !== 'black'

  return (
    <div className="flex flex-wrap gap-3">
      {/* Google Play Store */}
      <Link
        href={PLAY_STORE_URL}
        aria-label="Auf Google Play herunterladen"
        className={clsx(
          'inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors',
          isLight
            ? 'bg-white text-gray-900 hover:bg-gray-50'
            : 'bg-gray-800 text-white hover:bg-gray-900',
        )}
      >
        <GooglePlayIcon className="h-5 w-5 flex-none" />
        Google Play
      </Link>

      {/* Direct APK download */}
      {APK_DOWNLOAD_URL !== '#' && (
        <Link
          href={APK_DOWNLOAD_URL}
          aria-label="APK herunterladen"
          className={clsx(
            'inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition-colors',
            isLight
              ? 'border-white text-white hover:bg-white/10'
              : 'border-gray-800 text-gray-800 hover:bg-gray-100',
          )}
        >
          APK herunterladen
        </Link>
      )}
    </div>
  )
}

function GooglePlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3.18 23.76c.33.18.7.2 1.05.07l11.6-6.7-2.55-2.56-10.1 9.19zM.5 1.4A1.5 1.5 0 0 0 0 2.5v19a1.5 1.5 0 0 0 .5 1.1l.08.07 10.64-10.64v-.25L.58 1.33.5 1.4zM20.3 10.37l-2.96-1.71-2.85 2.85 2.85 2.85 2.98-1.72a1.5 1.5 0 0 0 0-2.27zM4.23.17A1.5 1.5 0 0 0 3.18.24L13.28 10.6l-2.55-2.56L4.23.17z" />
    </svg>
  )
}
