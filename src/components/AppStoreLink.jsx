import Link from 'next/link'
import clsx from 'clsx'

export function AppStoreLink({ color = 'black', label = 'App herunterladen' }) {
  return (
    <Link
      href="#"
      aria-label="Download on the App Store"
      className={clsx(
        'rounded-lg transition-colors p-2 px-4',
        color === 'black'
          ? 'bg-gray-800 text-white hover:bg-gray-900'
          : 'bg-white text-gray-900 hover:bg-gray-50',
      )}
    >
      {label}
    </Link>
  )
}
